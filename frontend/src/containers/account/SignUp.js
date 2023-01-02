import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "../../api";

const SignUpPage = () => {
    const { signup } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        if (data.get("confirmpassword") !== data.get("password")){
            return;
        }
        console.log("signup");

        const result = await axios.post('./api/auth/signup', {
            "username": data.get("username"),
            "password": data.get("password"),
            "email": data.get("email"),
            "role": ["user"]
        });
        
        if (result !== "success"){
            return;
        }

        signup();
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item>
                        <RouterLink to="/forgetpassword">
                            <Link href="#" variant="body2">
                                {"Forget password?"}
                            </Link>
                        </RouterLink>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default SignUpPage;