
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import { ActivityIndicator } from 'react-native-paper';
import { checkLocationPermissions, requestLocationPermission } from '../../../services/LocationService';
import { getMosques } from './MosqueService'

MapboxGL.setAccessToken('YOUR_MAPBOX_ACCESS_TOKEN');

const MosquesScreen = () => {
  const [location, setLocation] = useState(null);
  const [mosques, setMosques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocationAndMosques = async () => {
      let permissionGranted = await checkLocationPermissions();
      if (!permissionGranted) {
        permissionGranted = await requestLocationPermission();
      }

      if (permissionGranted) {
        Geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            fetchMosqueData();
          },
          (error) => {
            console.error(error);
            Alert.alert('Location Error', 'Could not get your location.');
            setLoading(false);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        setLoading(false);
      }
    };

    const fetchMosqueData = async () => {
      const mosqueData = await getMosques();
      setMosques(mosqueData);
      setLoading(false);
    };

    getLocationAndMosques();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView style={styles.map}>
        <MapboxGL.Camera
          zoomLevel={14}
          centerCoordinate={[location.longitude, location.latitude]}
          animationMode="flyTo"
          animationDuration={2000}
        />
        <MapboxGL.UserLocation visible={true} />
        
        {mosques.map((mosque) => (
          <MapboxGL.PointAnnotation
            key={mosque.id}
            id={mosque.id}
            coordinate={[mosque.longitude, mosque.latitude]}
          >
            {/* You can add a custom icon for the mosque here */}
          </MapboxGL.PointAnnotation>
        ))}

      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MosquesScreen;





























































// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Alert } from 'react-native';
// import MapboxGL from '@rnmapbox/maps';  
// import Geolocation from 'react-native-geolocation-service';
// import { ActivityIndicator } from 'react-native-paper';
// import { checkLocationPermissions, requestLocationPermission } from '../../services/LocationService';


// MapboxGL.setAccessToken('sk.eyJ1IjoidGF5eWFiYWJkdWxoYW5uYW4iLCJhIjoiY21leWNvaXpqMTFyYjJpcjI0NGIyeHJpdCJ9.uNRXwUrNHhDVUjlzJ72RiQ');

// const MosquesScreen = () => {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getLocation = async () => {
//       let permissionGranted = await checkLocationPermissions();
//       if (!permissionGranted) {
//         permissionGranted = await requestLocationPermission();
//       }

//       if (permissionGranted) {
//         Geolocation.getCurrentPosition(
//           (position) => {
//             setLocation({
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             });
//             setLoading(false);
//           },
//           (error) => {
//             console.error(error);
//             Alert.alert(
//               'Location Error',
//               'Could not get your location. Please check your settings.'
//             );
//             setLoading(false);
//           },
//           { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//         );
//       } else {
//         setLoading(false);
//       }
//     };

//     getLocation();
//   }, []);

//   if (loading || !location) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <MapboxGL.MapView style={styles.map}>
//         <MapboxGL.Camera
//           zoomLevel={14}
//           centerCoordinate={[location.longitude, location.latitude]}
//           animationMode="flyTo"
//           animationDuration={2000}
//         />
//         <MapboxGL.UserLocation visible={true} />
//       </MapboxGL.MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default MosquesScreen;
