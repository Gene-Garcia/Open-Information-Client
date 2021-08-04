function InformationReducer(state, action) {
  switch (action.type) {
    case "LOAD_INFORMATION":
      return {
        ...state,
        information: [...action.payload],
      };
    default:
      throw Error;
  }
}

export default InformationReducer;
