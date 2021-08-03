import React from "react";

// route package
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI components
import { createTheme, ThemeProvider } from "@material-ui/core";

// Pages
import Read from "../screens/Read";
import Share from "../screens/Share";

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
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
