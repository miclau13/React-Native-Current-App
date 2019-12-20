import React from 'react';
// import * as yup from 'yup';

function useFiximizeQuestionsFormInitialValues() {
  const [initialValues, setInitialValues] = React.useState(null);
  const fiximizeQuestionsFromInitalValues = { 
    ...initialValues,
    asIsEstimate: "",
    halfBathSize: "",
  }
  // console.log("initialValues",initialValues, "  fiximizeQuestionsFromInitalValues", fiximizeQuestionsFromInitalValues)
  return [initialValues, setInitialValues, fiximizeQuestionsFromInitalValues];
}

export default useFiximizeQuestionsFormInitialValues;