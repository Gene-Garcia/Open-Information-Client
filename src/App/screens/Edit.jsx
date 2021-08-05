import React, { useState, useContext, useEffect } from "react";

import InformationContext from "../../context/Information/InformationContext";

// MUI
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";

// Axios
import axios from "../../shared/APIServer";

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

function Edit(p) {
  const pId = p.match.params.id;

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

  // Information API data
  const { information } = useContext(InformationContext);
  useEffect(() => {
    // find the information
    const curr = information.find((info) => {
      return info._id === pId;
    });
    // convert arr to str
    const strKeywords = setData({
      title: curr.title,
      keywords: curr.keywords.join(", "),
      description: curr.description,
    });
  }, []);

  // Styles
  const classes = useStyles();

  // Event Listeners
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

  function handleErrors() {
    for (const [k, v] of Object.entries(data)) {
      setErrs((prev) => {
        return {
          ...prev,
          [k]: v === "",
        };
      });
    }
  }

  function clearFields() {
    setData({
      title: "",
      keywords: "",
      description: "",
    });
  }

  function onPublish(e) {
    // check for empty fields
    handleErrors();

    if (data.title === "" || data.keywords === "" || data.description === "") {
      alert("error");
      console.log("err");
    } else {
      axios
        .patch(`/information/${pId}/title/${data.title}`, data)
        .then((response) => {
          clearFields();
          alert("update success");
        })
        .catch((err) => {
          console.log(err.response);
          alert("update failure");
        });
    }
  }

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
            Save
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Edit;
