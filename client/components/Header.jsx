"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { getLocalStorageKeyValue } from "@/lib/localStorageService";
import { Badge } from "@mui/material";

function Header() {
  const user = getLocalStorageKeyValue("user");
  console.log(user.user?.followers, "user");

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="flex justify-between">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CGM Auth App
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CGM Auth App
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip>
              <IconButton sx={{ p: 0 }}>
                <Badge
                  badgeContent={user.user?.followers.toString()}
                  color="error"
                >
                  <PersonIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
