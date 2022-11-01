import {Formik} from 'formik';
import {useContext, useState} from 'react';
import {ActivityIndicator, ToastAndroid} from 'react-native';
import {VerticalSpace} from '../../../components/atoms/Spaces';
import {AuthContext} from '../../../stores/auth/auth-context';
import {rsHeight} from '../../../utils/responsive';
import {profileValidationSchema} from '../../../utils/schemas';
import {useNavigation} from '@react-navigation/native';
import {updateUser} from '../../../services/firebase-services';
import AppButton from '../../../components/molecules/AppButton';
import TextField from '../../../components/molecules/TextField';
import COLORS from '../../../values/colors';

type TValues = {name: string; phoneNumber: string};
type TState = {loading: boolean; error: string | null};
type props = {image: string};

const ProfileForm = ({image}: props) => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [state, setState] = useState<TState>({loading: false, error: null});

  const onSubmit = async (values: TValues) => {
    setState({loading: true, error: null});
    try {
      const updatedUser = await updateUser({
        id: authContext.user!.id,
        name: values.name,
        phoneNumber: values.phoneNumber,
        image: image,
        points: authContext.user!.points,
      });
      authContext.setUser(updatedUser);
      setState({loading: false, error: null});
      navigation.goBack();
      ToastAndroid.show('You updated your profile successfully', 2000);
    } catch (e) {
      setState({loading: false, error: 'Error occurred'});
      ToastAndroid.show(state.error!, 2000);
    }
  };

  return (
    <Formik
      initialValues={{
        name: authContext.user!.name,
        phoneNumber: authContext.user!.phoneNumber,
      }}
      validationSchema={profileValidationSchema}
      onSubmit={onSubmit}>
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
            {state.loading ? (
              <ActivityIndicator color={COLORS.red} size="large" />
            ) : (
              <AppButton title="Update profile" onPress={handleSubmit} />
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
