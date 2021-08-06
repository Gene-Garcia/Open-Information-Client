import { useState } from "react";

function useForm(initialValues, initialErros, validate, submitFunction) {
  // Values embedded to form
  const [values, setValues] = useState({ ...initialValues });
  // String messages, holds any error messages of the form
  const [errors, setErrors] = useState({ ...initialErros });

  // The function that handle updating the objet inside values
  // which are embededd to the input fields to be controlled fields
  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // every input will trigger validation, AGGRESSIVE
    // [name] with brackets makes JS understand to use the value inside name, and not 'name' itself
    validate({ [name]: value }, setErrors);
  };

  // A function that performs checking through all values and errors to determine if the form is valid for submit
  const formIsValid = () => {
    let isValid = true;

    for (const [, v] of Object.entries(values)) {
      if (v === "" || v === null) {
        isValid = false;
        break;
      }
    }
    // console.log("isValid after checking in value: " + isValid);

    for (const [, v] of Object.entries(errors)) {
      if (v !== "" && v !== null) {
        isValid = false;
        break;
      }
    }

    // console.log("isValid: " + isValid);
    return isValid;
  };

  function resetForms() {
    setValues({ ...initialValues });
    setErrors({ ...initialErros });
  }

  // Event handler function of clicking the submit button
  const handleFormSubmit = async (e) => {
    validate(values, setErrors);

    e.preventDefault();

    const isValid = formIsValid();

    if (isValid) {
      // await postFormParams
      await submitFunction(); // always make sure that this is async
      resetForms();
    }
  };

  // return
  return {
    values,
    errors,
    handleInput,
    validate, // but this might not be needed if we pass it as a callback
    formIsValid,
    handleFormSubmit,
  };
}

function useButton() {
  // this is just a small helper function
  // which converts a button to loading
}

// const validateTemplate = (fieldData, setErrors) => {
//   let tempErrs = { ...errors };

//   if ("name" in fieldData) {
//     tempErrs["name"] =
//       fieldData["name"] === "" || fieldData["name"] === null
//         ? "Titnamele is required"
//         : "";
//   }

//   // repeat if as needed

//   // update state errors
//   setErrors({ ...tempErrs });
// };

export { useForm };
