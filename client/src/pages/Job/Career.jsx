import React, { useState, useEffect } from 'react';
import { db, storage } from '../../FirebaseConfig';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Navbar from '../../components/Navbar/navbar';
import { Container, Grid, Card, CardContent, Typography, CardMedia, CardActions, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fade } from 'react-awesome-reveal';
import { useAlert } from '../../context/AlertContext';
import { useForm, Controller } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const theme = createTheme();

const Career = () => {
  const [jobPosts, setJobPosts] = useState([]);
  const [open, setOPen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const sendAlert = useAlert();
  const { control, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchJobPosts = async () => {
      const jobPostsCollection = collection(db, 'jobPosts');
      const jobPostsSnapshot = await getDocs(jobPostsCollection);
      const jobPostsList = jobPostsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobPosts(jobPostsList);
    };

    fetchJobPosts();
  }, []);

  const handleClickOpen = (post) => {
    setSelectedPost(post);
    setOPen(true);
  };

  const handleClose = () => {
    setOPen(false);
    reset();
  }

  const onSubmit = async (data) => {
    try {
      let cvUrl = '';
  
      if (data.cv[0]) {
        const cvFile = data.cv[0];
        const cvRef = ref(storage, `cvs/${cvFile.name}`);
        console.log("Uploading file to:", cvRef.fullPath);
        await uploadBytes(cvRef, cvFile);
        console.log("File uploaded successfully.");
        cvUrl = await getDownloadURL(cvRef);
        console.log("File URL:", cvUrl);
      }
  
      const applicationData = {
        name: data.name,
        email: data.email,
        cvUrl,
        postId: selectedPost.id,
      };
  
      await addDoc(collection(db, 'applications'), applicationData);
      sendAlert("success", "Application submitted successfully!");
      handleClose();
    } catch (error) {
      console.error("Error adding document: ", error.message, error.code, error);
      sendAlert("error", `Failed to submit application: ${error.message}`);
    }
  }
  
  

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Jobs
        </Typography>
        <Grid container spacing={4}>
          {jobPosts.map((post, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Fade triggerOnce>
                <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {post.postImg && (
                    <CardMedia
                      component="img"
                      height="70%"
                      image={post.postImg}
                      alt="Job Image"
                    />
                  )}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {post.postName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.postDescription}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 0.5 }}>
                      ${post.careerAmount}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => handleClickOpen(post)}>
                      Apply
                    </Button>
                  </CardActions>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Apply for {selectedPost?.postName}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                control={control}
                name='name'
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    variant='outlined'
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    variant="outlined"
                  />
                )}
              />
              <Controller
                name="cv"
                control={control}
                render={({ field }) => (
                  <TextField
                    margin="dense"
                    label="Upload CV"
                    type="file"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ accept: '.pdf,.doc,.docx' }}
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                )}
              />
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider>
  );
};

export default Career;
