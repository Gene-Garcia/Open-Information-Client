import React from "react";

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

function InformationSkeleton() {
  const classes = useStyles();

  return (
    <Card className={classes.information}>
      <CardContent>
        <Typography variant="h6" color="primary">
          Skeleton Title
        </Typography>

        <Typography variant="subtitle2">Skeleton Keywords</Typography>

        <Typography variant="body1">
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
          <InformationSkeleton />
          <InformationSkeleton />
          <InformationSkeleton />
        </Box>

        <SearchNavigation />
      </Container>
    </Box>
  );
}

export default Read;
