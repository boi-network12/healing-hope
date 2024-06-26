import React, { useEffect, useState } from 'react';
import "./ApplicationReview.css";
import Navbar from '../../components/Navbar/navbar';
import { Container, Grid, Card, CardContent, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const theme = createTheme();

const ApplicationReview = () => {
    const [applications, setApplications] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedAppId, setSelectedAppId] = useState(null);

    useEffect(() => {
        const fetchApplication = async () => {
            const applicationsCollection = collection(db, 'applications');
            const applicationSnapshot = await getDocs(applicationsCollection);
            const applicationList = applicationSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setApplications(applicationList);
        };

        fetchApplication();
    }, []);

    const handleMenuOpen = (event, appId) => {
        setAnchorEl(event.currentTarget);
        setSelectedAppId(appId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedAppId(null);
    };

    const handleDelete = async () => {
        if (selectedAppId) {
            await deleteDoc(doc(db, 'applications', selectedAppId));
            setApplications(applications.filter(application => application.id !== selectedAppId));
            handleMenuClose();
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Submitted Applications
                </Typography>
                <Grid container spacing={4} gap={2} sx={{mt: 3}}>
                    {applications.map((application) => (
                        <Card key={application.id} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {application.name}
                                    <IconButton
                                        aria-label="more"
                                        aria-controls="long-menu"
                                        aria-haspopup="true"
                                        onClick={(e) => handleMenuOpen(e, application.id)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="long-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl) && selectedAppId === application.id}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                                    </Menu>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Email: {application.email}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Username: {application.username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    CV: <a href={application.cvUrl} target="_blank" rel="noopener noreferrer">Download CV</a>
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Applied for: {application.postName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Main user email: {application.userEmail}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
};

export default ApplicationReview;
