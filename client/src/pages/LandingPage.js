import * as React from 'react';
import { Typography, Button, Box, Grid, Container, } from '@mui/material';
import ProductHeroLayout from './LadingPageLayout';
import LoginPage from './LoginPage';
import backgroundImage from '../assets/images/header/index';
import book from '../assets/images/icons/book.png';
import bulb from '../assets/images/icons/innovation.png';
import grad from '../assets/images/icons/education.png';


const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
  };


export default function ProductHero() {

const backgroundImg = backgroundImage[Math.floor(Math.random() * backgroundImage.length)]

    return (
        <>
            <ProductHeroLayout
                sxBackground={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundColor: '#7fc7d9',
                    backgroundPosition: 'center',
                }}
            >
                <img
                    style={{ display: 'none' }}
                    src={backgroundImage}
                    alt="increase priority"
                />
                <Typography color="inherit" align="center" variant="h2" marked="center">
                    Knowledge Hub
                </Typography>
                <Typography
                    color="inherit"
                    align="center"
                    variant="h5"
                    sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
                >
                    Create interactive course materials and share with your students.
                </Typography>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    component="a"
                    href="/register"
                >
                    Register
                </Button>
                <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
                    Discover the experience
                </Typography>
            </ProductHeroLayout>

            <Box
                component="section"
                sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'grey.300' }}
            >
                <Container sx={{ mt: 20, mb: 15, display: 'flex', position: 'relative' }}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box
                                    component="img"
                                    src={book}
                                    alt="book"
                                    sx={{ height: 55 }}
                                />
                                <Typography variant="h4" color='primary.dark' sx={{ my: 5 }}>
                                    Interactive Experience
                                </Typography>
                                <Typography variant="h5" fontStyle={'italic'} color={'darkslateblue'}>
                                    {
                                    'Create interactive course materials and share with your students.'
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box
                                    component="img"
                                    src={bulb}
                                    alt="bulb"
                                    sx={{ height: 55 }}
                                />
                                <Typography variant="h4" color='primary.dark' sx={{ my: 5 }}>
                                    Easy to Use
                                </Typography>
                                <Typography variant="h5" fontStyle={'italic'} color={'darkslateblue'}>
                                    {
                                        'Manage your courses, create assignments and quizzes, participate in interactive discussions, perform assessments, collaborate with your peers, and more!'
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={item}>
                                <Box
                                    component="img"
                                    src={grad}
                                    alt="graduation hat"
                                    sx={{ height: 55 }}
                                />
                                <Typography variant="h4" color='primary.dark' sx={{ my: 5 }}>
                                    Centralized Learning
                                </Typography>
                                <Typography variant="h5" fontStyle={'italic'} color={'darkslateblue'}>
                                    {
                                    'Access all your courses, students and more from one easy to use platform.'
                                    }
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>



            <LoginPage />
        </>
    );
}