import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import bgimg from "../../images/bp1.jpg";

import { useAuth } from "../../hooks/useAuth";
import axios from "../../api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const gridstyle = {
  display: "center",
  flexDirection: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  opacity: "0.9",
};

const theme = createTheme({
  button: {
    "&:focus": {
      color: "black",
    },
  },
  palette: {
    dark: {
      main: "#202020",
      contrastText: "#fff",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const SignUpPage = () => {
  const { signup } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("error");
  const [mes, setMessage] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("password") !== data.get("confirmpassword")) {
      setSeverity("error");
      setMessage("Password Incompatible!");
      setOpen(true);
      await delay(1500);
      setOpen(false);
      return;
    }

    const result = await axios
      .post("./api/auth/signup", {
        username: data.get("username"),
        password: data.get("password"),
        role: ["user"],
      })
      .then(async (res) => {
        console.log(res.data["message"]);
        setSeverity("success");
        setMessage("Success! Please Login.");
        setOpen(true);
        await delay(800);
        setOpen(false);
        signup();
      })
      .catch(async (err) => {
        setSeverity("error");
        console.log(err.response);
        setMessage(err.response.data["message"]);
        setOpen(true);
        await delay(1500);
        setOpen(false);
        return;
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{
          backgroundImage: `url(${bgimg})`,
          backgroundSize: "cover",
          height: "92vh",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundPosition: "center",
        }}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={gridstyle}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              sx={{ opacity: 1.0, fontWeight: "bold" }}
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(event) => setUsername(event.target.value)}
                helperText="Please enter user name."
                color="grey"
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
                onChange={(event) => setPassword(event.target.value)}
                helperText="Please enter password."
                color="grey"
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
                onChange={(event) => setConfirmPassword(event.target.value)}
                helperText="Please confirm password."
                color="grey"
              />
              <Button
                type="submit"
                className="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, opacity: 1.5 }}
                disabled={
                  password === "" || username === "" || confirmpassword === ""
                }
                color="dark"
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Alert severity={severity} sx={style}>
            <AlertTitle>{severity}</AlertTitle>
            <strong>{mes}</strong>
          </Alert>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default SignUpPage;
