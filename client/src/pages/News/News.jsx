import React, { useEffect, useState } from 'react';
import { db } from '../../FirebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Navbar from '../../components/Navbar/navbar';
import { Container, Typography, Card, CardContent, Box, CircularProgress, Grid, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAuth } from "firebase/auth";

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const currentUser = auth.currentUser;

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const articlesCollection = collection(db, 'articles');
                const articlesSnapshot = await getDocs(articlesCollection);
                const articlesList = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setArticles(articlesList);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const handleMenuOpen = (event, article) => {
        setAnchorEl(event.currentTarget);
        setSelectedArticle(article);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedArticle(null);
    };

    const handleDelete = async (articleId) => {
        try {
            await deleteDoc(doc(db, 'articles', articleId));
            setArticles(articles.filter(article => article.id !== articleId));
        } catch (error) {
            console.error('Error deleting article:', error);
        } finally {
            handleMenuClose();
        }
    };

    const handleShare = async (article) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: article.title,
                    text: article.description,
                    url: window.location.origin + `/article-display/${article.id}`,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Sharing is not supported in this browser.');
        }
    };

    const truncateDescription = (description) => {
        if (description.length > 14) {
            return description.slice(0, 14) + '...';
        }
        return description;
    };

    const Image = styled('img')({
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
    });

    const StyledCard = styled(Card)(({ theme }) => ({
        marginBottom: '20px',
        cursor: 'pointer',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
        },
    }));

    const StyledCardContent = styled(CardContent)(({ theme }) => ({
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
        },
    }));

    const UserInfo = styled(Box)(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    }));

    const UserName = styled(Typography)(({ theme }) => ({
        marginLeft: theme.spacing(2),
        fontWeight: 'bold',
    }));

    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom>
                    Latest News
                </Typography>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Grid container spacing={2}>
                        {articles.map((article) => (
                            <Grid item key={article.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <StyledCard>
                                    <StyledCardContent>
                                        <UserInfo>
                                            <Avatar src={article.userInfo.userProfilePicture} alt={article.userInfo.displayName} />
                                            <UserName variant='body2'>{article.userInfo.displayName}</UserName>
                                            <IconButton onClick={(event) => handleMenuOpen(event, article)}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={Boolean(anchorEl)}
                                                onClose={handleMenuClose}
                                            >
                                                <MenuItem onClick={() => { handleShare(article); handleMenuClose(); }}>Share</MenuItem>
                                                {currentUser?.uid === selectedArticle?.userInfo?.uid && (
                                                    <MenuItem onClick={() => handleDelete(selectedArticle.id)}>Delete</MenuItem>
                                                )}
                                            </Menu>
                                        </UserInfo>
                                        <Image src={article.imageURL} alt={article.title}  onClick={() => navigate(`/article-display/${article.id}`)}/>
                                        <Typography variant="h5">{article.title}</Typography>
                                        <Typography variant="body2">{truncateDescription(article.description)}</Typography>
                                        {article.description.length > 14 && (
                                            <Box mt={2}>
                                                <Typography variant="contained" color="primary" >
                                                    See More...
                                                </Typography>
                                            </Box>
                                        )}
                                    </StyledCardContent>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </div>
    );
};

export default News;
