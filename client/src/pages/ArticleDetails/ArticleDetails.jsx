import React, { useState, useEffect } from 'react';
import { db } from '../../FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar/navbar';
import { Container, Typography, Card, CardContent, CircularProgress, Avatar, Box } from '@mui/material';
import { styled } from '@mui/system';

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const articleDoc = doc(db, 'articles', id);
                const articleSnapshot = await getDoc(articleDoc);
                if (articleSnapshot.exists()) {
                    setArticle(articleSnapshot.data());
                }
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    const Image = styled('img')({
        width: '50%', // Adjust the width to make the image smaller
        height: 'auto',
        borderRadius: '8px',
        marginTop: '20px'
    });

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
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                        <CircularProgress />
                    </Box>
                ) : (
                    article && (
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>{article.title}</Typography>
                                <UserInfo>
                                    <Avatar src={article.userInfo.userProfilePicture} alt={article.userInfo.displayName} />
                                    <UserName variant='body2'>{article.userInfo.displayName}</UserName>
                                </UserInfo>
                                <Typography variant="body1" paragraph>{article.description}</Typography>
                                <Image src={article.imageURL} alt={article.title} />
                            </CardContent>
                        </Card>
                    )
                )}
            </Container>
        </div>
    );
};

export default ArticleDetails;
