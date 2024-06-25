import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import { useAlert } from '../../context/AlertContext';
import { useAuth } from '../../context/authContaxt';
import { useNavigate } from 'react-router-dom';


const theme = createTheme();

function App() {
  const [countries, setCountries] = useState([]);
  const { register, googleSignUp } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    number: '',
    country: '', 
    regNo: '',
    email: '',
    password: ''
  });
  const showAlert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all') // Example API endpoint for fetching countries
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCountries(data); // Assuming the response is an array of country objects
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(formData.email, formData.password, {
        fullName: formData.fullName,
        username: formData.username,
        number: formData.number,
        country: formData.country,
        regNo: formData.regNo
      });
      navigate('/');
      showAlert("success", "sign up successful!");
    } catch (error) {
      showAlert("error", "Failed to register. Please try again later.");
      console.error('Registration error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleGoogleSignUp = async () => {
    try {
      await googleSignUp();
      navigate("/")
      showAlert("success", "Signed up with Google successfully!");
    } catch (error) {
      showAlert("error", "Failed to sign up with Google. Please try again later.");
        console.error('Google sign-up error:', error);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
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
              autoFocus
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="number"
              label="Phone Number"
              name="number"
              autoComplete="tel"
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="country"
              select
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              {countries.map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
            </TextField>
            <TextField
              margin="normal"
              fullWidth
              id="regNo"
              label="Registration Number"
              name="regNo"
              autoComplete="off"
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
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="body2" align="center">
                Or register with
              </Typography>
              <Grid container justifyContent="center" spacing={2} sx={{ mt: 1 }}>
                <Grid item>
                  <IconButton onClick={handleGoogleSignUp}>
                    <GoogleIcon />
                  </IconButton>
                </Grid>
                
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
