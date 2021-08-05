import React, { useEffect, useState, useContext } from "react";

// My components
import SearchNavigation from "./SearchNavigation";
import InformationSkeleton from "./InformationSkeleton";

// Context
import InformationContext from "../../context/Information/InformationContext";

// MUI
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ChromeReaderModeOutlinedIcon from "@material-ui/icons/ChromeReaderModeOutlined";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

// API
import axios from "../../shared/APIServer";

// Helpers
import { isValid } from "../../shared/ValueHelper";

// Styles
const useStyles = makeStyles({
  input: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
  information: {
    marginTop: 10,
    marginBottom: 20,
    border: 1,
    m: 1,
  },
  title: {
    marginTop: 5,
    marginBottom: 5,
  },
  keywords: {
    marginTop: 5,
    marginBottom: 5,
  },
  description: {
    marginTop: 8,
    marginBottom: 5,
  },
  loadingRoot: {
    display: "flex",
    justifyContent: "center",
  },
  gridRoot: {
    flexGrow: 1,
    marginTop: 20,
  },
});

function Read() {
  const [searchValue, setSearchValue] = useState({ title: "", keyword: "" });
  const [loadingInfos, setLoadingInfos] = useState(true);
  const [error, setError] = useState(false);

  // Use of context and reducer for Information data
  const { information, loadInformation } = useContext(InformationContext);
  useEffect(() => {
    async function fetchInformation(path) {
      const response = await axios
        .get(path)
        .then((res) => {
          //convert to array if not yet arry
          const data = Array.isArray(res.data) ? res.data : [res.data];

          loadInformation(data);
          setError(false);
        })
        .catch((err) => {
          console.log(err.response);
          setError(true);
        });

      setLoadingInfos(false); // triggered after await
    }

    //build path
    let path = "/information";
    path += isValid(searchValue.title) ? `/title/${searchValue.title}` : "";
    path += isValid(searchValue.keyword)
      ? `/keyword/${searchValue.keyword}`
      : "";

    setLoadingInfos(true);
    fetchInformation(path);
  }, [searchValue]);

  // Event listeners
  function onSearch(title, keyword) {
    console.log(title + " " + keyword);

    setSearchValue({ title: title, keyword: keyword });
  }

  // stylings
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
          read me
        </Typography>

        <Fab size="small">
          <ChromeReaderModeOutlinedIcon color="primary" />
        </Fab>

        <Box mt={4}>
          <Collapse in={error}>
            <Alert
              severity="error"
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setError(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <AlertTitle>Error</AlertTitle>
              Open information can not be found!
            </Alert>
          </Collapse>
        </Box>

        <div className={classes.gridRoot}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={7} md={8} lg={9} xl={9}>
              <Box>
                <Box>
                  {information.map((item) => (
                    <InformationSkeleton
                      classes={classes}
                      key={item._id}
                      id={item._id}
                      title={item.title}
                      rawKeywords={item.keywords}
                      description={item.description}
                    />
                  ))}
                </Box>

                <Box className={classes.loadingRoot}>
                  <Fade in={loadingInfos} unmountOnExit>
                    <CircularProgress color="primary" />
                  </Fade>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={3}>
              <SearchNavigation classes={classes} onSearch={onSearch} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default Read;
