import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

function SearchNavigation({ classes }) {
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

export default SearchNavigation;
