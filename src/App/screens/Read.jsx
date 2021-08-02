import React, { useEffect, useState } from "react";

// MUI
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ChromeReaderModeOutlinedIcon from "@material-ui/icons/ChromeReaderModeOutlined";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import SearchIcon from "@material-ui/icons/Search";

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

function SearchNavigation() {
  const classes = useStyles();

  return (
    <Box component="div" mt={5}>
      <Typography variant="h6" component="p">
        search an open information
      </Typography>

      <form>
        <TextField
          className={classes.input}
          label="Title"
          variant="outlined"
          required
          fullWidth
        />

        <TextField
          className={classes.input}
          label="Keyword"
          variant="outlined"
          fullWidth
        />

        <Button
          startIcon={<SearchIcon />}
          variant="contained"
          size="medium"
          color="primary"
        >
          Search
        </Button>
      </form>
    </Box>
  );
}

function InformationSkeleton({ id, title, rawKeywords, description }) {
  const classes = useStyles();

  return (
    <Card className={classes.information}>
      <CardContent>
        <Typography className={classes.title} variant="h6" color="primary">
          {title}
        </Typography>

        <Typography className={classes.keywords} variant="subtitle2">
          {rawKeywords.map((item, index) => {
            return <span key={index}>{item} </span>;
          })}
        </Typography>

        <Typography className={classes.description} variant="body1">
          Donec non tellus diam. Phasellus sit amet gravida magna. Sed vulputate
          velit et convallis aliquet. Fusce orci eros, dignissim id nisi eu,
          hendrerit aliquet velit. In ut porta enim. Proin neque lectus, pretium
          a egestas ut, bibendum nec nibh. Maecenas elementum risus turpis.
          Quisque pharetra purus eu placerat ultricies.
        </Typography>
      </CardContent>
    </Card>
  );
}

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
              key={item._id}
              id={item._id}
              title={item.title}
              rawKeywords={item.keywords}
              description={item.description}
            />
          ))}
        </Box>

        <SearchNavigation />
      </Container>
    </Box>
  );
}

export default Read;
