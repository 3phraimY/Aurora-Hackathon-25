import { StyleSheet, Text, View, Button } from "react-native";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.body}>Home</Text>
      <View style={styles.buttonMargin}>
        <Button title="Login" onPress={() => router.push("/Login")} />
      </View>
      <View style={styles.buttonMargin}>
        <Button title="SignUp" onPress={() => router.push("/SignUp")} />
      </View>
      <View style={styles.innerContainer}>
        <Text style={styles.body}>RSS Feed</Text>
        <Button
          title="Fetch RSS Feed"
          onPress={() => router.push("/RSSReader")}
        />
      </View>
      <View style={styles.buttonMargin}>
        <Button title="DBView" onPress={() => router.push("/DBView")} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20, // Add spacing below the text
  },
  innerContainer: {
    marginTop: 20, // Add spacing between the sections
    alignItems: "center",
  },
  buttonMargin: {
    margin: 10,
  },
});
