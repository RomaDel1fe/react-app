import * as yup from 'yup';


export const initialValues = { login: '', password: '' };

export const validationSchema = yup.object().shape({
  login: yup
    .string()
    .required('Required')
    .matches(/^\S+$/, 'Login cannot start or end with whitespace')
    .min(5, 'Login must be at least 5 characters')
    .trim(),
  password: yup
    .string()
    .required('Required')
    .matches(/^(?=.*[A-Z])(?=.*[0-9])/, 'Password must contain at least one uppercase letter and one digit')
    .min(8, 'Password must be at least 8 characters'),
});

export const onSubmit = (login) => async (values, { setSubmitting }) => {
  await login(values); 
  setSubmitting(false);
};

export const validate = async (values) => {
  try {
    await validationSchema.validate(values, { abortEarly: false });
    return {};
  } catch (validationErrors) {
    const errors = {};
    validationErrors.inner.forEach((error) => {
      errors[error.path] = error.message;
    });
    return errors;
  }
};
