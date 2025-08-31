import auth from '@react-native-firebase/auth';


export const loginUser = async (email, password) => {
  try {
    
    await auth().signInWithEmailAndPassword(email.trim(), password);
  } catch (error) {
    throw new Error(
      error.code?.replace('auth/', '').replace(/-/g, ' ') || 'Login failed'
    );
  }
};


export const registerUser = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email.trim(), password);
  } catch (error) {
    throw new Error(
      error.code?.replace('auth/', '').replace(/-/g, ' ') || 'Registration failed'
    );
  }
};


export const logoutUser = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw new Error(
      error.code?.replace('auth/', '').replace(/-/g, ' ') || 'Logout failed'
    );
  }
};
