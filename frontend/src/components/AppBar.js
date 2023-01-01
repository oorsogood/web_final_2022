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
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
// import SearchIcon from '@mui/icons-material/Search';

import { useAuth } from "../hooks/useAuth";
import { SearchProvider } from "../hooks/useSearch";
import AccountIcon from "../images/account.png";
import SavedPostIcon from "../images/savedPost.png";
import MyPostIcon from "../images/myPost.png";
import LogoutIcon from "../images/logout.png";
import HomeIcon from "../images/home.png";
import WriteIcon from "../images/writing.png";
import CP3Icon from "../images/cp3.jpg";
import Search from "../containers/search/Search";

const useStyles = makeStyles(() => ({
    cp3Icon: {
        width: "35px",
        height: "35px",
    },
    myAccountIcon: {
        width: "30px",
        height: "30px",
        marginLeft: "-3px",
        marginRight: "10px",
    },
    myPostIcon: {
        width: "30px",
        height: "30px",
        marginRight: "7px",
    },
    saveIcon: {
        width: "30px",
        height: "30px",
        marginLeft: "-5px",
        marginRight: "12px",
    },
    logoutIcon: {
        width: "30px",
        height: "30px",
        marginRight: "8px",
    },
    homeIcon: {
        width: "25px",
        height: "25px",
        marginRight: "5px",
    },
    searchBar: {
        marginTop: "5px",
    },
    writeIcon: {
        width: "25px",
        height: "25px",
        marginRight: "5px",
    },
}));


function AppBar({ pages }) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const collapseItems = ["myaccount", "myposts", "savedposts", "logout"];
    const classes = useStyles();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        setAnchorElNav(null);
        if (path) {
            navigate(path);
        }
    };

    // const Search = styled('div')(({ theme }) => ({
    //     position: 'relative',
    //     borderRadius: theme.shape.borderRadius,
    //     backgroundColor: alpha(theme.palette.common.white, 0.15),
    //     '&:hover': {
    //         backgroundColor: alpha(theme.palette.common.white, 0.25),
    //     },
    //     marginLeft: 0,
    //     width: '100%',
    //     [theme.breakpoints.up('sm')]: {
    //         marginLeft: theme.spacing(1),
    //         width: 'auto',
    //     },
    // }));

    // const SearchIconWrapper = styled('div')(({ theme }) => ({
    //     padding: theme.spacing(0, 2),
    //     height: '100%',
    //     position: 'absolute',
    //     pointerEvents: 'none',
    //     display: 'flex',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    // }));

    // const StyledInputBase = styled(InputBase)(({ theme }) => ({
    //     color: 'inherit',
    //     '& .MuiInputBase-input': {
    //         padding: theme.spacing(1, 1, 1, 0),
    //         // vertical padding + font size from searchIcon
    //         paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //         transition: theme.transitions.create('width'),
    //         width: '100%',
    //         [theme.breakpoints.up('sm')]: {
    //             width: '12ch',
    //             '&:focus': {
    //                 width: '20ch',
    //             },
    //         },
    //     },
    // }));

    return (
        <SearchProvider>
            <MuiAppBar position="static">
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
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                        >
                            Some Title
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {pages?.map((page) => (
                                <Button
                                    key={page.label}
                                    onClick={() => handleCloseNavMenu(page.path)}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {page.label}
                                </Button>
                            ))}
                            {!!user && (
                                <Button
                                    key={"logout"}
                                    onClick={logout}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    {"logout"}
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </SearchProvider>
    );
};

export default AppBar;
