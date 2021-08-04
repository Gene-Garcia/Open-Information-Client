import React, { createContext, useReducer } from "react";

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
      }}
    >
      {children}
    </InformationContext.Provider>
  );
}
export { InformationProvider };
