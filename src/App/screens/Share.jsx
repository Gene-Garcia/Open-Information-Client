import React from "react";

// MUI
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import ShareIcon from "@material-ui/icons/Share";
import PublishIcon from "@material-ui/icons/Publish";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  formRoot: {
    width: "70%",
  },
  input: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  inputWithCaption: {
    display: "block",
    marginTop: 20,
  },
});

function Share() {
  const classes = useStyles();

  return (
    <Box component="div" mt={5} mb={8}>
      <Container>
        <Typography
          variant="h3"
          component="h1"
          color="textSecondary"
          gutterBottom
        >
          share you
        </Typography>

        <Fab size="small">
          <ShareIcon color="primary" />
        </Fab>

        <Box mt={4} className={classes.formRoot}>
          <TextField
            className={classes.input}
            label="Title"
            required
            fullWidth
          />

          <TextField
            className={classes.inputWithCaption}
            label="Keywords"
            required
            fullWidth
          />
          <Typography variant="subtitle2" color="textSecondary">
            Seperate each keywords with a coma (,)
          </Typography>

          <TextField
            className={classes.input}
            label="Description"
            variant="outlined"
            multiline
            rows={5}
            required
            fullWidth
          />

          <Button
            color="primary"
            size="medium"
            variant="contained"
            endIcon={<PublishIcon />}
          >
            Publish
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Share;
