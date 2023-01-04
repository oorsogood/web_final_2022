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

import { useAuth } from "../hooks/useAuth";
import { SearchProvider } from "../hooks/useSearch";

function AppBar({ pages }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    const pathname = window.location.pathname;
    if (path !== "/") {
      navigate(pathname.includes(path) ? 0 : path);
    } else if (pathname === "/") {
      navigate(0);
    } else {
      navigate(path);
    }
  };

  return (
    <SearchProvider>
      <div style={{ paddingTop: "8vh" }}>
        <MuiAppBar position="fixed" style={{ background: "#ce775c" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "flex", md: "none" },
                }}
              >
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
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
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
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  marginLeft: "2vw",
                }}
              >
                {pages?.map((page) => (
                  <Button
                    variant="outlined"
                    key={page.label}
                    onClick={() => handleCloseNavMenu(page.path)}
                    sx={{
                      color: "white",
                      ":hover": {
                        bgcolor: "#8b5959",
                        color: "white",
                        border: "0",
                      },
                      border: "0",
                    }}
                  >
                    {page.label}
                  </Button>
                ))}
                {!!user && (
                  <Button
                    variant="outlined"
                    key={"logout"}
                    onClick={logout}
                    sx={{
                      color: "white",
                      ":hover": {
                        bgcolor: "#8b5959",
                        color: "white",
                        border: "0",
                      },
                      border: "0",
                      position: "absolute",
                      right: "0",
                    }}
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
}

export default AppBar;
