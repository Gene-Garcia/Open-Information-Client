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
});

function Read() {
  const [information, setInformation] = useState([]);

  useEffect(() => {
    async function fetchInformation() {
      const response = await axios.get("/information");
      const data = response.data;

      setInformation(data);
    }

    fetchInformation();
  }, []);

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

        <SearchNavigation classes={classes} />
      </Container>
    </Box>
  );
}

export default Read;
