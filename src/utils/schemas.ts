import * as Yup from 'yup';

const phoneRegex = /^01(0|1|2|5)[0-9]{8}$/g;

export const profileValidationSchema = Yup.object().shape({
  name: Yup.string().required('Required!!'),
  phoneNumber: Yup.string()
    .required('Required!!')
    .matches(phoneRegex, 'Please enter a valid egyptian phone number !!'),
});
