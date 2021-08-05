import React from "react";

// Router
import { Link } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
  },
  buttonLink: {
    marginRight: theme.spacing(2),
  },
}));

function Navbar() {
  // Styles
  const classes = useStyles();

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
            variant="outlined"
            component={Link}
            to="/read"
            size="small"
            className={classes.buttonLink}
          >
            Read
          </Button>

          <Button
            color="inherit"
            variant="outlined"
            component={Link}
            to="/share"
            size="small"
            className={classes.buttonLink}
          >
            share
          </Button>
        </div>
      </AppBar>
    </div>
  );
}

export default Navbar;
