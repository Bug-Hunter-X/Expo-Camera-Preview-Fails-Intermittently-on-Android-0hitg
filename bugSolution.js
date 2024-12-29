// bugSolution.js
import * as React from 'react';
import { Camera, useCameraDevices } from 'expo-camera';
import { StyleSheet, View, Text, Button } from 'react-native';

const App = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const devices = useCameraDevices();
  const device = devices?.[0];

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View><Text>Requesting camera permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {device ? (
        <Camera style={styles.camera} type={type} device={device}>
          <View style={styles.buttonContainer}>
            <Button title="Flip Camera" onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }} />
          </View>
        </Camera>
      ) : (
        <Text>No Camera Device Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
});
export default App;