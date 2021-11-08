import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Vibration, TextInput } from "react-native";
import { useIPhoneAvailability } from "./src/hooks/useIPhoneAvailability";

export default function App() {
  const [zipCode, setZipCode] = useState<string>("");
  const [isIPhoneAvailable, timestamp] = useIPhoneAvailability(zipCode);

  useEffect(() => {
    if (isIPhoneAvailable) {
      Vibration.vibrate(10 * 1000);
    }
  }, [isIPhoneAvailable]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isIPhoneAvailable ? "green" : "red" },
      ]}
    >
      <TextInput
        style={styles.textInput}
        placeholder={"ZIP CODE"}
        onChangeText={(t) => setZipCode(t)}
      />
      <Text>
        {isIPhoneAvailable ? "AVAILABLE!" : "NOT AVAILABLE, KEEP WAITING."}
      </Text>
      <Text>{`Last Check: ${timestamp.toLocaleTimeString()}`}</Text>
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
  },
});
