import {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  firestoreCollections,
  THttpState,
  TRoom,
} from '../../../utils/constants';
import {styles} from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TAppStack} from '../../../navigation/navigators/AppStack';
import LinearGradient from 'react-native-linear-gradient';
import ErrorComponent from '../../../components/organisms/ErrorComponent';
import firestore from '@react-native-firebase/firestore';
import COLORS from '../../../values/colors';

type TProps = NativeStackScreenProps<TAppStack>;

const RoomsScreen = ({navigation}: TProps) => {
  const [state, setState] = useState<THttpState<TRoom[]>>({
    isLoading: false,
    error: null,
    data: [],
  });

  const getRooms = useCallback(async () => {
    setState({
      isLoading: true,
      error: null,
      data: [],
    });
    const docs = await firestore()
      .collection(firestoreCollections.Rooms)
      .get()
      .then(snapshot => {        
        const rooms: TRoom[] = snapshot.docs.map(doc => ({
          id: doc.data().id,
          name: doc.data().name,
          image: doc.data().image,
        }));
        setState({
          isLoading: false,
          error: null,
          data: rooms,
        });
      })
      .catch(error => {
        setState({
          isLoading: false,
          error: error.message,
          data: [],
        });
      });
  }, []);

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  if (state.isLoading) {
    return (
      <View style={styles.roomsScreen}>
        <ActivityIndicator color={COLORS.red} size="large" />
      </View>
    );
  }

  if (state.error) {
    return (
      <View style={styles.roomsScreen}>
        <ErrorComponent
          errorText="Hello to this error and we should stand toghther to stop this war"
          onRetry={() => getRooms()}
        />
      </View>
    );
  }

  return (
    <View style={styles.roomsScreen}>
      <FlatList<TRoom>
        style={{width: '100%'}}
        keyExtractor={(item, index) => item.id}
        data={state.data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Room', {room: item});
            }}
            activeOpacity={0.7}>
            <ImageBackground
              style={styles.roomItem}
              imageStyle={styles.roomItem}
              source={{
                uri: item.image,
              }}>
              <LinearGradient
                colors={[COLORS.primary, 'transparent']}
                start={{x: 0.0, y: 1.0}}
                end={{x: 0.0, y: 0.0}}
                style={styles.gradient}
              />
              <Text style={styles.name}>{item.name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default RoomsScreen;
