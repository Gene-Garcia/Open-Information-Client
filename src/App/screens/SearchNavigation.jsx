import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

function SearchNavigation({ classes, onSearch }) {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");

  function onTitleChange(e) {
    const v = e.target.value;
    setTitle(v);
  }

  function onKeywordChange(e) {
    const v = e.target.value;
    setKeyword(v);
  }

  function onSearchBtn(e) {
    e.preventDefault();

    onSearch(title, keyword);
    console.log(e);
    setTitle("");
    setKeyword("");
  }

  return (
    <Box component="div">
      <Typography variant="h6" component="p">
        search an open information
      </Typography>

      <form>
        <TextField
          onChange={onTitleChange}
          value={title}
          className={classes.input}
          label="Title"
          variant="outlined"
          required
          fullWidth
        />

        <TextField
          onChange={onKeywordChange}
          value={keyword}
          className={classes.input}
          label="Keyword"
          variant="outlined"
          fullWidth
        />

        <Button
          role="button"
          onClick={onSearchBtn}
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
