import React, { useState } from "react";

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
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Axios
import axios from "../../shared/APIServer";

// Form validator
import { useForm } from "./useForm";

const useStyles = makeStyles((theme) => ({
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
}));

function Share() {
  // For post status and status message
  const [postStatus, setPostStatus] = useState({
    isFinished: false,
    severity: "",
    message: "",
  });
  // passing this as parameter to useForm, where the validation will be handled
  async function share() {
    setOnRequest(true);

    // handle axios
    await axios
      .post("/information/", values)
      .then((response) => {
        if (response.status === 201) {
          successShare(values.title);
        } else {
          failedShare("server");
        }
      })
      .catch((err) => {
        console.log(err);
        failedShare("client");
      });
  }

  // Functions for success and fail
  function successShare(title) {
    setOnRequest(false);
    setPostStatus({
      isFinished: true,
      severity: "success",
      message: "Successfully shared information about " + title,
    });
  }

  function failedShare(blame) {
    setOnRequest(false);
    setPostStatus({
      isFinished: true,
      severity: "error",
      message: `Something went wrong in sharing information. Please try again.`,
    });
  }

  // The function that will AGGRESIVELY check field validattion
  // the parameter will accept an object so that we can check individuall or by group
  const validate = (fieldData, setErrors) => {
    // Funny enough, we are able to access 'errors' even though it is declared later
    // maybe because it is a state
    let tempErrs = { ...errors };

    if ("title" in fieldData) {
      tempErrs["title"] =
        fieldData["title"] === "" || fieldData["title"] === null
          ? "Title is required"
          : "";
    }

    if ("description" in fieldData) {
      tempErrs["description"] =
        fieldData["description"] === "" || fieldData["description"] === null
          ? "Description is required"
          : "";
    }

    if ("keywords" in fieldData) {
      tempErrs["keywords"] =
        fieldData["keywords"] === "" || fieldData["keywords"] === null
          ? "Keyword(s) is/are required"
          : "";
    }

    // update state errors
    setErrors({ ...tempErrs });
  };

  const initial = { title: "", keywords: "", description: "" };
  const { values, errors, handleInput, handleFormSubmit } = useForm(
    { ...initial },
    { ...initial },
    validate,
    share
  );

  // state variable to identify if there is a current request to axios
  const [isOnRequest, setOnRequest] = useState(false);

  // styles
  const classes = useStyles();

  return (
    <Box component="div">
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

        <Box mt={4}>
          <Collapse in={postStatus.isFinished}>
            <Alert
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setPostStatus((prev) => ({
                      ...prev,
                      isFinished: false,
                    }));
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity={postStatus.isFinished ? postStatus.severity : "error"}
            >
              {postStatus.message}
            </Alert>
          </Collapse>
        </Box>

        <Box mt={2} className={classes.formRoot}>
          <TextField
            value={values.title}
            name="title"
            onChange={handleInput}
            className={classes.input}
            label="Title"
            required
            fullWidth
            error={Boolean(errors.title)}
          />

          <TextField
            value={values.keywords}
            name="keywords"
            onChange={handleInput}
            className={classes.inputWithCaption}
            label="Keywords"
            required
            fullWidth
            error={Boolean(errors.keywords)}
          />
          <Typography variant="subtitle2" color="textSecondary">
            Seperate each keywords with a coma (,)
          </Typography>

          <TextField
            value={values.description}
            name="description"
            onChange={handleInput}
            className={classes.input}
            label="Description"
            variant="outlined"
            multiline
            rows={5}
            required
            fullWidth
            error={Boolean(errors.description)}
          />

          <Button
            color="primary"
            size="medium"
            variant="contained"
            onClick={handleFormSubmit}
            endIcon={
              isOnRequest ? (
                <CircularProgress color="primary" size={25} thickness={4} />
              ) : (
                <PublishIcon />
              )
            }
            disabled={isOnRequest}
          >
            Publish
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Share;
