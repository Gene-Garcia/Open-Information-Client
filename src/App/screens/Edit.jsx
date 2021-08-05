import React, { useState } from "react";

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

function Edit({
  match: {
    params: { pId, pTitle },
  },
}) {
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
        // axios.post("/information/", data).then((response) => {
        //   clearFields();
        //   alert("post success");
        // });
      }
    });
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
