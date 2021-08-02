import React from "react";

// route package
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// MUI components
import { createTheme, ThemeProvider } from "@material-ui/core";

// Pages
import Read from "../screens/Read";

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
          <Route path="/">
            <Read />
          </Route>

          <Route path="/read">
            <Read />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
