import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import coffeeimg from '../../images/coffeebean.png';

import { useAuth } from "../../hooks/useAuth";
import axios from "../../api";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignUpPage = () => {
    const { signup } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (data.get("password") !== data.get("confirmpassword")) {
            return;
        }

        const result = await axios.post('./api/auth/signup', {
            "username": data.get("username"),
            "password": data.get("password"),
            "email": data.get("email"),
            "role": ["user"]
        });
        console.log(result.data["message"]);
        signup();
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '91vh' }} alignItems="center" justifyContent="center">
                <CssBaseline />
                {/* <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${coffeeimg})`,
                        backgroundSize: "cover",
                        height: "91vh",
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundPosition: 'center',
                    }}
                /> */}
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{
                        display: 'center',
                        flexDirection: 'center',
                    }}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar> */}
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="User Name"
                                name="username"
                                autoComplete="username"
                                autoFocus
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
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmpassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmpassword"
                                autoComplete="current-password"
                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <RouterLink to="/signup">
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </RouterLink>
                                </Grid>
                            </Grid> */}
                            {/* <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignUpPage;