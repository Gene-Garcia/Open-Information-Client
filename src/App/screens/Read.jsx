import React, { useEffect, useState } from "react";
import SearchNavigation from "./SearchNavigation";
import InformationSkeleton from "./InformationSkeleton";

// MUI
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ChromeReaderModeOutlinedIcon from "@material-ui/icons/ChromeReaderModeOutlined";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";

// API
import axios from "../../shared/APIServer";

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
});

function Read() {
  const [loadingInfos, setLoadingInfos] = useState(true);
  const [information, setInformation] = useState([]);
  const [searchValue, setSearchValue] = useState({ title: "", keyword: "" });

  useEffect(() => {
    async function fetchInformation() {
      let path = "/information";

      //build path
      path =
        searchValue.title !== ""
          ? "/information/title/" + searchValue.title
          : path;
      path =
        searchValue.keyword !== ""
          ? path + "/keyword/" + searchValue.keyword
          : path;

      const response = await axios.get(path);

      //convert to array if not yet arry
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];

      setLoadingInfos(false); // triggered after await
      setInformation(data);
    }

    fetchInformation();
  }, [searchValue]);

  function onSearch(title, keyword) {
    console.log(title + " " + keyword);

    setSearchValue({ title: title, keyword: keyword });
  }

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
          read me
        </Typography>

        <Fab size="small">
          <ChromeReaderModeOutlinedIcon color="primary" />
        </Fab>

        <Box mt={4}>
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

        <Box mt={4}>
          <SearchNavigation classes={classes} onSearch={onSearch} />
        </Box>
      </Container>
    </Box>
  );
}

export default Read;
