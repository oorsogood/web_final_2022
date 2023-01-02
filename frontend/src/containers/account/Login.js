import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import axios from "../../api";

const LoginPage = () => {
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const result = await axios.post('./api/auth/signin', {
            "username": data.get("username"),
            "password": data.get("password")
        });
        console.log(result.data["message"]);
        login({
            username: data.get("username")
        });
    };

    return (
        <div>
            <h1>Log In</h1>
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login In
                </Button>
                <Grid container>
                    <Grid item>
                        <RouterLink to="/signup">
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </RouterLink>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default LoginPage;