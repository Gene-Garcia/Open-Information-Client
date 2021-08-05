import React from "react";

// route package
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Context
import { InformationProvider } from "../../context/Information/InformationContext";

// Nav
import Navbar from "./Navbar";

// Pages
import Read from "../screens/Read";
import Share from "../screens/Share";
import Edit from "../screens/Edit";

// MUI components
import { createTheme, ThemeProvider } from "@material-ui/core";
import Box from "@material-ui/core/Box";

// Custom Theme
const theme = createTheme({
  typography: {
    fontFamily: "Hind Siliguri, sans-serif",
  },
});

// App
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />

        <Box style={{ marginTop: "100px" }}>
          <InformationProvider>
            <Switch>
              <Route path="/" exact>
                <Share />
              </Route>

              <Route path="/read" exact>
                <Read />
              </Route>

              <Route path="/share" exact>
                <Share />
              </Route>

              <Route
                path="/edit/:id/title/:title"
                exact
                component={Edit}
              ></Route>
            </Switch>
          </InformationProvider>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
