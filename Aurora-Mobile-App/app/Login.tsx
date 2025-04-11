import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJcf3uMM0qxqFjJvEJoBINIWDxYW36Z5M",
  authDomain: "sample-firebase-ai-app-365d1.firebaseapp.com",
  databaseURL:
    "https://sample-firebase-ai-app-365d1-default-rtdb.firebaseio.com",
  projectId: "sample-firebase-ai-app-365d1",
  storageBucket: "sample-firebase-ai-app-365d1.firebasestorage.app",
  messagingSenderId: "425966379931",
  appId: "1:425966379931:web:90555a3ac5d5e19696373e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields.");
      return;
    }

    try {
      // Firebase Authentication: Sign in user
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Signed in successfully!");
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      Alert.alert("Error", error.message || "Failed to sign in.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
});

export default Login;
