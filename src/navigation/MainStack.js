import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MosqueScreen from '../features/mosques/MosqueScreen';
import { IconButton } from 'react-native-paper';
import { logoutUser } from '../features/auth/AuthService';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mosques"
        component={MosqueScreen}
        options={{
          headerTitle: 'Ahle Hadith Connect',
          headerRight: () => (
            <IconButton icon="logout" onPress={logoutUser} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;