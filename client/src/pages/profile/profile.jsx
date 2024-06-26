import React, { useState } from 'react';
import { useAuth, changePassword } from '../../context/authContaxt';
import Navbar from '../../components/Navbar/navbar';
import {
  Avatar, Button, CssBaseline, TextField, Box, Typography, Container, IconButton, CircularProgress,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions
} from '@mui/material';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../FirebaseConfig';
import { useAlert } from '../../context/AlertContext';
import { doc, updateDoc } from 'firebase/firestore';
import { getPlaceholderImage } from '../../utils/utils';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { checkActionCode, confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth';

const theme = createTheme();

const Profile = () => {
  const {currentUser} = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: currentUser?.fullName || '',
    username: currentUser?.username || '',
    phoneNumber: currentUser?.phoneNumber || '',
    country: currentUser?.country || '',
    regNo: currentUser?.regNo || '',
    email: currentUser?.email || '',
    photoURL: currentUser?.photoURL || '',
    oldPassword: '',
    newPassword: ''
  });
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [resetCodeSent, setResetCodeSent] = useState(false);
    const [resetCode, setResetCode] = useState('');
  const sendAlert = useAlert();
  const photoURLImage = currentUser && formData.photoURL ? formData.photoURL : getPlaceholderImage(currentUser ? formData.fullName || formData.username || formData.email : "");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if(!file) return;

    const storageRef = ref(storage, `profilePictures/${currentUser.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setLoading(true);
    sendAlert("success", "Loading...");
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error('upload error: ', error)
        sendAlert("error", "Error uploading Image")
        setLoading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(doc(db, 'users', currentUser.uid), {
          photoURL: downloadURL
        });
        setFormData((prevData) => ({
          ...prevData, 
          photoURL: downloadURL
        }));
        setLoading(false)
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), formData);
      console.log('Profile updated successfully')
      sendAlert("success", "Profile Updated Successfully");
    } catch (error) {
      console.error('Error updating profile: ', error);
      sendAlert("error", "Error updating profile")
    }
  }

  const handleChangePassword = async () => {
    const { oldPassword, newPassword } = formData;
    if (!oldPassword || !newPassword) {
      sendAlert("success", "Please fill out both password fields");
      return;
    }
    setLoading(true);
    sendAlert("success", "Loading...");
    try {
      await changePassword(oldPassword, newPassword);
      sendAlert("success", "Password changed successfully");
    } catch (error) {
      console.error('Error changing password: ', error);
      sendAlert("error", "Error changing password");
    } finally {
      setLoading(false);
    }
  }

  const handleForgetPassword = async () => {
    try {
      // Ensure formData.email contains the correct user email address
      await sendPasswordResetEmail(formData.email);
      setResetCodeSent(true);
      sendAlert("success", "Password reset email sent. Check your email for instructions.");
    } catch (error) {
      console.error('Error sending password reset email: ', error);
      let errorMessage = 'Error sending password reset email. Please try again later.';
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found. Please check the email address.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email format. Please enter a valid email address.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      }
      sendAlert("error", errorMessage);
    }
  }
  
  
  
  
  

  const handleResetPassword = async () => {
    // Implement logic for resetting password with code
     const { resetCode, newPassword } = formData;

     try {
      // Check if reset code is provided
      if (!resetCode) {
        sendAlert("error", "Please enter the reset code.");
        return;
      }
  
      setLoading(true);
      sendAlert("success", "Loading...");
  
      // Implement the logic to verify the reset code and update the password
      // Here's a basic structure using Firebase Authentication API
      const actionCodeInfo = await checkActionCode(resetCode); // Replace with your own logic to verify the code
  
      // Use actionCodeInfo to verify the code validity
      // For example, if actionCodeInfo is valid, update the password
      await confirmPasswordReset(actionCodeInfo.email, newPassword);

      sendAlert("success", "Password reset successfully.");
    setForgotPasswordOpen(false); // Close the dialog after successful password reset
    setResetCode(''); // Clear reset code from state
  } catch (error) {
    console.error('Error resetting password: ', error);
    let errorMessage = 'Error resetting password. Please try again later.';
    if (error.code === 'auth/expired-action-code') {
      errorMessage = 'The password reset link has expired. Please request a new one.';
    } else if (error.code === 'auth/invalid-action-code') {
      errorMessage = 'Invalid reset code. Please check the code and try again.';
    }
    sendAlert("error", errorMessage);
  } finally {
    setLoading(false);
  }
}

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar/>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Dialog open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)}>
             {!resetCode ? (
              <React.Fragment>
                 <DialogTitle>Forgot Password</DialogTitle>
                 <DialogContent>
                   <DialogContentText>
                    Enter your email to receive a password reset Link.
                   </DialogContentText>
                  <TextField
                      autoFocus
                      margin="dense"
                      id="email"
                      label="Email Address"
                      type="email"
                      fullWidth
                      value={currentUser.email}
                      disabled
                  />
                 </DialogContent>
                 <DialogActions>
                  <Button onClick={() => setForgotPasswordOpen(false)} color="primary">
                    cancel
                  </Button>
                  <Button onClick={handleChangePassword} color="primary">
                    Send Email
                  </Button>
                 </DialogActions>
              </React.Fragment>
             ) : (
              <React.Fragment>
                                <DialogTitle>Reset Password</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Enter the 6-digit code sent to your email and your new password.
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="resetCode"
                                        label="Reset Code"
                                        type="text"
                                        fullWidth
                                        value={resetCode}
                                        onChange={(e) => setResetCode(e.target.value)}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="newPassword"
                                        label="New Password"
                                        type="password"
                                        fullWidth
                                        value={formData.newPassword}
                                        onChange={handleInputChange}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setForgotPasswordOpen(false)} >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleResetPassword} color="primary">
                                        Reset Password
                                    </Button>
                                </DialogActions>
                            </React.Fragment>
             )}
          </Dialog>
          <Avatar sx={{ m: 1, width: 100, height: 100 }} src={photoURLImage}>
            {loading && <CircularProgress/>}
          </Avatar>
          <IconButton color="primary" component="label">
            <input hidden accept="image/*" type="file" onChange={handleFileChange} />
            <PhotoCamera />
          </IconButton>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              autoComplete="tel"
              value={formData.phoneNumber}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="regNo"
              label="Registration Number"
              name="regNo"
              autoComplete="off"
              value={formData.regNo}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="oldPassword"
              label="Old Password"
              type="password"
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleInputChange}
            />
            <span style={{
              color: "red",
              fontSize: "12px",
              cursor: "pointer"
            }}
            onClick={handleResetPassword}
            >Reset password?</span>
            <TextField
              margin="normal"
              required
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
            />
            <span style={{
              color: "red",
              fontSize: "12px",
              cursor: "pointer"
            }}
            onClick={handleForgetPassword}
            >Forgot your Password?</span>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save Changes
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </Box>
          {resetCodeSent && (
              <div>
                <p>Password reset email sent.</p>
              </div>
            )}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Profile;
