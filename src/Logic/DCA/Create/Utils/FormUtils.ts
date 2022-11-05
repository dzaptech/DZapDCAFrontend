export const getFormValues = (form: any, fieldKey: string) =>
  form.getFieldValue(fieldKey);

export const setFormValues = (form: any, fieldKey: string, value: any) =>
  form.setFieldsValue({
    [fieldKey]: value,
  });
