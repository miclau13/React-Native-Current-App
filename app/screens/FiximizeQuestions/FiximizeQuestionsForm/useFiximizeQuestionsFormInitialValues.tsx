import React from 'react';
// import * as yup from 'yup';

function useFiximizeQuestionsFormInitialValues() {
  const [initialValues, setInitialValues] = React.useState({
    asIsEstimate: "",
    halfBathSize: "",
  });
  // const validationSchema = React.useMemo(() => yup.object().shape({
  //   asIsEstimate: yup.string().required('As-Is Estimate is Required'),
  //   halfBathSize: yup.string().required('Half Bath Size is Required'),
  // }), []);

  return ([initialValues, setInitialValues])
}

export default useFiximizeQuestionsFormInitialValues;