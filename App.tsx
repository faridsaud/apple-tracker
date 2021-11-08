import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { useDeviceAvailability } from "./src/hooks/useDeviceAvailability";
import { Device } from "./src/service/apple";

export default function App() {
  const [zipCode, setZipCode] = useState<string>("");
  const [deviceType, setDeviceType] = useState<Device>(Device.IPHONE);
  const [isIPhoneAvailable, timestamp] = useDeviceAvailability(
    zipCode,
    deviceType
  );

  useEffect(() => {
    if (isIPhoneAvailable) {
      Vibration.vibrate(10 * 1000);
    }
  }, [isIPhoneAvailable]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isIPhoneAvailable ? "green" : "transparent" },
      ]}
    >
      <View style={styles.row}>
        <Text>Device:</Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setDeviceType(Device.IPHONE)}
          >
            <Text>IPHONE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setDeviceType(Device.MACBOOK)}
          >
            <Text>MACBOOK</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Text>Zip Code:</Text>
        <TextInput
          style={styles.textInput}
          placeholder={"ZIP CODE"}
          onChangeText={(t) => setZipCode(t)}
        />
      </View>

      <Text>
        {isIPhoneAvailable ? "AVAILABLE!" : "NOT AVAILABLE, KEEP WAITING."}
      </Text>
      <Text>{`Last Check: ${timestamp.toLocaleTimeString()}`}</Text>
      <Text>{`Device: ${deviceType}`}</Text>
      <Text>{`Zip Code: ${zipCode}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    backgroundColor: "white",
    padding: 5,
    textAlign: "center",
    marginBottom: 10,
    marginLeft: 16,
  },
  buttons: {
    display: "flex",
    marginLeft: 16,
  },
  button: {
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    margin: 4,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    margin: 16,
    alignItems: "center",
  },
});
