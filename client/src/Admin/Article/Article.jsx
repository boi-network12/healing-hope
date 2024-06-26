import React, { useState } from 'react';
import { useAuth } from '../../context/authContaxt';
import { useAlert } from '../../context/AlertContext';
import { storage, db } from '../../FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc, collection } from "firebase/firestore";
import Navbar from '../../components/Navbar/navbar';
import { 
  Container, 
  TextField, 
  Button, 
  CircularProgress, 
  Typography, 
  Box 
} from '@mui/material';

const Article = () => {
    const { currentUser } = useAuth();
    const sendAlert = useAlert();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !image) {
            sendAlert('error', 'All fields are required');
            return;
        }

        setUploading(true);
        try {
            const imageRef = ref(storage, `articles/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);

            const articleRef = doc(collection(db, 'articles'));
            await setDoc(articleRef, {
                title,
                description,
                imageURL,
                userInfo: {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                },
                createdAt: new Date().toISOString()
            });

            setTitle('');
            setDescription('');
            setImage(null);
            sendAlert("success", "Article posted successfully");
        } catch (error) {
            console.error('Error posting article:', error);
            sendAlert("error", "Error posting article");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="sm">
                <Typography variant="h4" gutterBottom>
                    Post a New Article
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box mb={2}>
                        <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>
                    <Box mb={2}>
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                        >
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                            />
                        </Button>
                        {image && <Typography>{image.name}</Typography>}
                    </Box>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={uploading}
                        startIcon={uploading && <CircularProgress size={20} />}
                    >
                        {uploading ? 'Posting...' : 'Post Article'}
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export default Article;
