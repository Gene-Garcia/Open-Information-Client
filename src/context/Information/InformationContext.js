import React, { useState, createContext, useReducer } from "react";

// Reducer
import InformationReducer from "./InformationReducer";

// Initial
const initialState = {
  information: [],
};

// Context
const InformationContext = createContext();
export default InformationContext;

function InformationProvider({ children }) {
  const [state, dispatch] = useReducer(InformationReducer, initialState);

  // additional states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // CRUD Actions through Dispatch
  const loadInformation = (newInformation) => {
    dispatch({
      type: "LOAD_INFORMATION",
      payload: newInformation,
    });
  };

  return (
    <InformationContext.Provider
      value={{
        information: state.information,
        loadInformation,
        loadingState: [loading, setLoading],
        errorState: [error, setError],
      }}
    >
      {children}
    </InformationContext.Provider>
  );
}
export { InformationProvider };
