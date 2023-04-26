import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
// hooks
import { ADD_USER } from '../../../utils/mutations';
import Auth from '../auth';

// ----------------------------------------------------------------------

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [userFormData, setUserFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({ variables: { ...userFormData } });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  // If the user is already logged in, redirect them to the dashboard
  const isLoggedIn = () => {
    if (Auth.loggedIn()) {
      navigate("/dashboard", { replace: true });
    };
  };

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <>
      <Stack spacing={5}>
        <TextField 
          name="firstName" 
          label="First Name" 
          type="text"
          onChange={handleInputChange}
          value={userFormData.firstName}
          required
          />
        <TextField 
          name="lastName" 
          label="Last Name" 
          type='text'
          onChange={handleInputChange}
          value={userFormData.lastName}
          required
        />
        <TextField 
          name="email" 
          label="Email address" 
          type="email"
          onChange={handleInputChange}
          value={userFormData.email}
          required  
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleInputChange}
          value={userFormData.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ my: 2 }} onClick={handleClick}>
        Sign Up
      </LoadingButton>
    </>
  );
}