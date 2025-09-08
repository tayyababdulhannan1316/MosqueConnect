
import firestore from '@react-native-firebase/firestore';

const getMosques = async () => {
  try {
    const mosquesSnapshot = await firestore().collection('mosques').get();
    const mosquesList = mosquesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return mosquesList;
  } catch (error) {
    console.error("Error fetching mosques: ", error);
    return [];
  }
};

export { getMosques };