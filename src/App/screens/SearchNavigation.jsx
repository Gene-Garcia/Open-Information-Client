import React, { useState, useContext, useEffect } from "react";

// Context
import InformationContext from "../../context/Information/InformationContext";

// Axios
import axios from "../../shared/APIServer";

// MUI
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

// Helpers
import { isValid } from "../../shared/ValueHelper";

function SearchNavigation({ classes, modifyLoading, modifyError }) {
  const { information, loadInformation } = useContext(InformationContext);

  // States
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useState({ title: "", keyword: "" });

  // Effeects
  useEffect(() => {
    async function fetchInformation(path) {
      await axios
        .get(path)
        .then((res) => {
          const data = Array.isArray(res.data) ? res.data : [res.data];

          loadInformation(data);
          modifyError(false);
          modifyLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          modifyError(true);
        });
    }

    // build path
    let path = "/information";
    path += isValid(searchValue.title) ? `/title/${searchValue.title}` : "";
    path += isValid(searchValue.keyword)
      ? `/keyword/${searchValue.keyword}`
      : "";

    modifyLoading(true);
    fetchInformation(path);
  }, [searchValue]);

  // Event Listeners
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

    setSearchValue({ title: title, keyword: keyword });
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
