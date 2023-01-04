import * as React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { createStyles, makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
// import SearchIcon from '@mui/icons-material/Search';

import { useAuth } from "../hooks/useAuth";
import { SearchProvider } from "../hooks/useSearch";

// const styles = createStyles({
//     button: {
//         // main styles,
//         "&:focus": {
//             color: "red"
//         }
//     }
// });

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            button: {
                // main styles,
                "&:focus": {
                    color: "red"
                }
            }
        },
    }),
);

const theme = createTheme();

function AppBar({ pages }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const classes = useStyles();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
		const pathname = window.location.pathname
		// console.log("Current path", pathname);
		// console.log("Clicked path", path);
    if (pathname.includes(path)) {
			navigate(0);
    }
		else{
			navigate(path);
		}
  };

    return (
        <SearchProvider>
            <div style={{ paddingTop: "8vh" }}>
							<MuiAppBar position="fixed" className="not-scrolled" >
									<Container maxWidth="xl">
											<Toolbar disableGutters>
													<div>
															Web Final Project
													</div>

													<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
															<IconButton
																	size="large"
																	aria-label="account of current user"
																	aria-controls="menu-appbar"
																	aria-haspopup="true"
																	onClick={handleOpenNavMenu}
																	color="inherit"
															>
																	<MenuIcon />
															</IconButton>
															<Menu
																	id="menu-appbar"
																	anchorEl={anchorElNav}
																	anchorOrigin={{
																			vertical: "bottom",
																			horizontal: "left"
																	}}
																	keepMounted
																	transformOrigin={{
																			vertical: "top",
																			horizontal: "left"
																	}}
																	open={Boolean(anchorElNav)}
																	onClose={handleCloseNavMenu}
																	sx={{
																			display: { xs: "block", md: "none" }
																	}}
															>
																	{pages?.map((page) => (
																			<MenuItem
																					key={page.label}
																					onClick={() => handleCloseNavMenu(page.path)}
																			>
																					<Typography textAlign="center">{page.label}</Typography>
																			</MenuItem>
																	))}
																	{!!user && (
																			<MenuItem key={"logout"} onClick={logout}>
																					<Typography textAlign="center">Logout</Typography>
																			</MenuItem>
																	)}
															</Menu>
													</Box>
													{/* <Typography
															variant="h6"
															noWrap
															component="div"
															sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
													>
															Some Title
													</Typography> */}
													<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
															{pages?.map((page) => (
																	<Button
																			variant="outlined"
																			key={page.label}
																			onClick={() => handleCloseNavMenu(page.path)}
																			// style={styles}
																			sx={{ my: 2, color: "white", display: "block" }}
																	>
																			{page.label}
																	</Button>
															))}
															{!!user && (
																	<Button
																			variant="outlined"
																			key={"logout"}
																			onClick={logout}
																			// style={styles}
																			sx={{ my: 2, color: "white", display: "block" }}
																	>
																			{"logout"}
																	</Button>
															)}
													</Box>
											</Toolbar>
									</Container>
							</MuiAppBar>
						</div>
        </SearchProvider>
    );
};

export default AppBar;
