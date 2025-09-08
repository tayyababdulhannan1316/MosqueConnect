import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';

import auth, { onAuthStateChanged } from '@react-native-firebase/auth'; 

import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ modular style usage
    const unsubscribe = onAuthStateChanged(auth(), (usr) => {
      setUser(usr);
      if (initializing) setInitializing(false);
    });

    return unsubscribe; // cleanup on unmount
  }, [initializing]);

  if (initializing) return null;

  return (
    <PaperProvider>
      <NavigationContainer>
        {user ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
