import React, { useState } from "react";

// Router
import { Link } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

// Styles
const useStyles = makeStyles((theme) => ({
  appBarRoot: {
    flexGrow: 1,
  },
  appBar: {
    padding: theme.spacing(2, 3),

    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
  },
  brand: {
    flexGrow: "2",

    display: "flex",
    alignContent: "center",
    justifyContent: "flex-start",
  },
  linkGroup: {
    flexGrow: "1",

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  linkGroupMobile: {
    flexGrow: "1",

    display: "none",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignContent: "center",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
    },
  },
  buttonLink: {
    margin: theme.spacing(0, 1),
  },
}));

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(null);

  // Styles
  const classes = useStyles();

  function handleMobileMenuClick(e) {
    setMobileMenu(e.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMenu(null);
  }

  return (
    <div className={classes.appBarRoot}>
      <AppBar
        component="div"
        className={classes.appBar}
        color="primary"
        position="fixed"
      >
        <div className={classes.brand}>
          <Typography variant="h6" component="span">
            Open Information
          </Typography>
        </div>

        <div className={classes.linkGroup}>
          <Button
            color="inherit"
            component={Link}
            to="/read"
            size="small"
            className={classes.buttonLink}
          >
            read
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/share"
            size="small"
            className={classes.buttonLink}
          >
            share
          </Button>
        </div>

        <div className={classes.linkGroupMobile}>
          <Button
            size="small"
            color="inherit"
            onClick={handleMobileMenuClick}
            className={classes.buttonLink}
          >
            <MenuIcon />
          </Button>

          <Menu
            id="mobile-menu"
            anchorEl={mobileMenu}
            keepMounted
            open={Boolean(mobileMenu)}
            onClose={handleMobileMenuClose}
          >
            <MenuItem
              component={Link}
              to="/read"
              onClick={handleMobileMenuClose}
            >
              Read
            </MenuItem>
            <MenuItem
              component={Link}
              to="/share"
              onClick={handleMobileMenuClose}
            >
              Share
            </MenuItem>
          </Menu>
        </div>
      </AppBar>
    </div>
  );
}

export default Navbar;
