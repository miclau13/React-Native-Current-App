import { FieldAttributes, useField, useFormikContext  } from 'formik';

function useNativeField(propsOrFieldName: string | FieldAttributes<any>) {
  const form = useFormikContext();
  const { handleBlur, handleChange } = form;
  const [field, meta] = useField(propsOrFieldName);
  const { name, onBlur, onChange, ...inputProps } = field;
  const customField = { 
    ...inputProps,
    name,
    onChange: handleChange(name),
    onBlur: handleBlur(name),
  };
  return [customField, meta] as [typeof customField, typeof meta];
}

export default useNativeField;
