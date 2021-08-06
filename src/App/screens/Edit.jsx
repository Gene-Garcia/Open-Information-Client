import React, { useState, useEffect } from "react";

// MUI
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PublishIcon from "@material-ui/icons/Publish";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// Axios
import axios from "../../shared/APIServer";

// Form Validator
import { useForm } from "./useForm";

// Styles
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

function Edit({
  history,
  match: {
    params: { id: pId, title: pTitle },
  },
}) {
  // Post status for error message
  const [postStatus, setPostStatus] = useState({
    isFinished: false,
    severity: "",
    message: "",
  });
  // Submit handlers
  async function edit() {
    setOnRequest(true);

    // handle axios
    // BUG WHAT IF TITLE WAS CHANGED
    await axios
      .patch(`/information/${pId}/title/${values.title}`, values)
      .then((res) => {
        if (res.status == 201) {
          successEdit();
        } else {
          failedEdit("server");
        }
      })
      .catch((err) => {
        console.log(err.data);
        failedEdit("client");
      });
  }

  // Success and failure on edit
  function successEdit() {
    setOnRequest(false);
    history.push("/read");
  }

  function failedEdit(blame) {
    setOnRequest(false);
    setPostStatus({
      isFinished: true,
      severity: "error",
      message:
        "Something went wrong in updating the information with the title '" +
        pTitle +
        "'. Please try again.",
    });
  }

  function validate(fieldData, setErrors) {
    let tempErrors = { ...errors };

    if ("title" in fieldData) {
      tempErrors["title"] =
        fieldData.title === "" || fieldData.title === null
          ? "Title is required"
          : "";
    }

    if ("description" in fieldData) {
      tempErrors["description"] =
        fieldData.description === "" || fieldData.description === null
          ? "Description is required"
          : "";
    }

    if ("keywords" in fieldData) {
      tempErrors["keywords"] =
        fieldData.keywords === "" || fieldData.keywords === null
          ? "Keyword(s) is/are required"
          : "";
    }

    setErrors({ ...tempErrors });
  }

  // No need to use information context, because I think this is an isolated case
  // MAYBE USE CONTEXT WHEN WE WILL SEND A MESSAGE TO ANOTHER PAGE AFTER EDITING
  useEffect(() => {
    async function fetchData(path) {
      await axios
        .get(path)
        .then((res) => {
          if (res.status == 201) {
            setValues({
              title: res.data.title,
              keywords: res.data.keywords.join(","),
              description: res.data.description,
            });
          } else {
            alert("Invalid URL");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error");
        });
    }

    // Fetch the information using id paramater
    const path = `/information/${pId}`;
    fetchData(path);
  }, []);

  // Validator
  const initial = { title: "", keywords: "", description: "" };
  const { values, setValues, errors, handleInput, handleFormSubmit } = useForm(
    { ...initial },
    { ...initial },
    validate,
    edit
  );

  // add cleaning

  // a little helper state to handle disabling the button
  const [isOnRequest, setOnRequest] = useState(false);

  // Styles
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
          edit this
        </Typography>

        <Fab size="small">
          <EditIcon color="primary" />
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
            Save
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Edit;
