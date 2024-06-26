import React, { useState } from 'react';
import { db, storage } from '../../FirebaseConfig';
import { TextField, Button, Typography, Container, createTheme, CssBaseline, ThemeProvider, Box, Avatar } from '@mui/material';
import { useAuth } from '../../context/authContaxt';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useAlert } from '../../context/AlertContext';
import Navbar from '../../components/Navbar/navbar';

const theme = createTheme();

const PostCareer = () => {
  const [postName, setPostName] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [postImg, setPostImg] = useState(null);
  const [postImgPreview, setPostImgPreview] = useState(null);
  const [careerAmount, setCareerAmount] = useState('');
  const { currentUser } = useAuth();
  const sendAlert = useAlert();

  const handleImgChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setPostImg(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImgPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // upload image
    let imgUrl = '';
    if (postImg) {
      const imgRef = ref(storage, `postImages/${currentUser.uid}`);
      await uploadBytes(imgRef, postImg);
      imgUrl = await getDownloadURL(imgRef);
    }

    // save job post details to firestore
    await addDoc(collection(db, 'jobPosts'), {
      postName,
      postDescription,
      postImg: imgUrl,
      careerAmount: parseFloat(careerAmount),
      createdAt: new Date()
    });

    sendAlert("success", "Job posted!");

    // clear form fields after submission
    setPostName('');
    setPostDescription('');
    setPostImg(null);
    setPostImgPreview(null);
    setCareerAmount('');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Post a Job Career
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Job Name"
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Job Description"
            value={postDescription}
            onChange={(e) => setPostDescription(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
          />
          {postImgPreview && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar src={postImgPreview} alt="Job Image" sx={{ width: 100, height: 100 }} />
            </Box>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImgChange}
            style={{ margin: '10px 0' }}
          />
          <TextField
            label="Career Amount"
            value={careerAmount}
            onChange={(e) => setCareerAmount(e.target.value)}
            fullWidth
            margin="normal"
            required
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: '20px' }}
          >
            Post Job
          </Button>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default PostCareer;
