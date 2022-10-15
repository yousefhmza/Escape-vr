import {Formik} from 'formik';
import {useContext} from 'react';
import {Button, TextInput} from 'react-native';
import {VerticalSpace} from '../../../components/atoms/Spaces';
import AppButton from '../../../components/molecules/AppButton';
import TextField from '../../../components/molecules/TextField';
import {AuthContext} from '../../../stores/auth/auth-context';
import {rsHeight} from '../../../utils/responsive';
import {profileValidationSchema} from '../../../utils/schemas';
import COLORS from '../../../values/colors';
import {styles} from '../styles';

const ProfileForm = () => {
  const authContext = useContext(AuthContext);
  return (
    <Formik
      initialValues={{
        name: authContext.user!.name,
        phoneNumber: authContext.user!.phoneNumber,
      }}
      validationSchema={profileValidationSchema}
      onSubmit={values => {
        console.log(values);
      }}>
      {({handleBlur, handleChange, handleSubmit, values, errors, touched}) => {
        return (
          <>
            <TextField
              icon="person"
              placeholder="Name"
              name="name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              error={errors.name !== undefined && touched.name}
            />
            <VerticalSpace height={rsHeight(16)} />
            <TextField
              icon="phone-portrait-outline"
              name="phoneNumber"
              placeholder="Phone number"
              onChangeText={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              value={values.phoneNumber}
              error={errors.phoneNumber !== undefined && touched.phoneNumber}
            />
            <VerticalSpace height={rsHeight(16)} />
            <AppButton title="Update profile" onPress={handleSubmit} />
          </>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
