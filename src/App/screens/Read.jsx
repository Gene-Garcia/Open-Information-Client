import React, { useEffect, useContext, useState, useRef } from "react";

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
import Button from "@material-ui/core/Button";

// API
import axios from "../../shared/APIServer";

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
  // Use of context and reducer for Information data
  const {
    information,
    loadInformation,
    loadingState: [loading, setLoading],
    errorState: [error, setError],
  } = useContext(InformationContext);
  useEffect(() => {
    async function fetchInformation() {
      await axios
        .get("/information")
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

      setLoading(false);
    }

    setLoading(true);
    fetchInformation();
  }, []);

  // State for simple pagination through 'load more'
  const [shownCards, setShownCards] = useState(3);
  const [showOption, setShowOption] = useState("LOAD MORE");

  async function handleShowMoreLess() {
    if (shownCards < information.length - 1) {
      setShownCards((prev) => prev + 2);
    }

    // if (shownCards >= information.length - 1) {
    //   setShowOption("SHOW LESS");
    // }

    // if (showOption === "SHOW LESS") {
    //   setShownCards((prev) => prev / 2);
    //   setShowOption("LOAD MORE");
    // }
  }

  const loadMoreRef = useRef(null);

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
                  {information.slice(0, shownCards).map((item) => (
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

                <Box className={classes.loadingRoot} mb={loading ? 4 : 0}>
                  <Fade in={loading} unmountOnExit>
                    <CircularProgress color="primary" />
                  </Fade>
                </Box>

                <Box>
                  <Button
                    ref={loadMoreRef}
                    color="primary"
                    size="small"
                    style={{ width: "100%" }}
                    onClick={async () => {
                      await handleShowMoreLess();
                      loadMoreRef.current.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    {showOption}
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={5} md={4} lg={3} xl={3}>
              <SearchNavigation classes={classes} />
            </Grid>
          </Grid>
        </div>
      </Container>
    </Box>
  );
}

export default Read;
