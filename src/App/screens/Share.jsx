import React, { useState } from "react";

// router
import { Redirect } from "react-router-dom";

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

// Axios
import axios from "../../shared/APIServer";

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
  const [data, setData] = useState({
    title: "",
    keywords: "",
    description: "",
  });

  const [errs, setErrs] = useState({
    title: false,
    keywords: false,
    description: false,
  });

  const classes = useStyles();

  function onTextFieldChange({ target: { value, name } }) {
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // so that on every time the use enters a value, it will reset the error
    // OMG I implemented the better validation, a combination
    setErrs((prev) => {
      return {
        ...prev,
        [name]: value === "" && !prev[name],
      };
    });
  }

  const handleErrors = async () => {
    for (const [k, v] of Object.entries(data)) {
      setErrs((prev) => {
        return {
          ...prev,
          [k]: v === "",
        };
      });
    }

    return; //important
  };

  function clearFields() {
    setData({
      title: "",
      keywords: "",
      description: "",
    });
  }

  function onPublish(e) {
    e.preventDefault();

    // check for empty fields
    handleErrors().then(() => {
      if (errs.title && errs.keywords && errs.description) {
      } else {
        axios.post("/information/", data).then((response) => {
          clearFields();
          alert("post success");
        });
      }
    });
  }

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
            value={data.title}
            name="title"
            onChange={onTextFieldChange}
            className={classes.input}
            label="Title"
            required
            fullWidth
            error={errs.title}
          />

          <TextField
            value={data.keywords}
            name="keywords"
            onChange={onTextFieldChange}
            className={classes.inputWithCaption}
            label="Keywords"
            required
            fullWidth
            error={errs.keywords}
          />
          <Typography variant="subtitle2" color="textSecondary">
            Seperate each keywords with a coma (,)
          </Typography>

          <TextField
            value={data.description}
            name="description"
            onChange={onTextFieldChange}
            className={classes.input}
            label="Description"
            variant="outlined"
            multiline
            rows={5}
            required
            fullWidth
            error={errs.description}
          />

          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={onPublish}
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
