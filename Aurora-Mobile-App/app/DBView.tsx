import cong from "./DB"; // Assuming the correct path to your configuration file
import { getDatabase, ref, onValue } from "firebase/database";
import { View } from "react-native";
import { Text } from "react-native";
import { useEffect } from "react";
import { useState } from "react";

function DBView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Initialize the Firebase database with the provided configuration
    const database = getDatabase(cong);

    // Reference to the specific collection in the database
    const collectionRef = ref(database, "Your_Collection");
    const collectionRef2 = ref(database, "User1");
    const collectionRef3 = ref(database, "User2");

    // Function to fetch data from the database
    const fetchData = () => {
      // Listen for changes in the collection
      onValue(collectionRef, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values<never>(dataItem);

          setData(displayItem);
        }
      });
    };

    const fetchData2 = () => {
      // Listen for changes in the collection
      onValue(collectionRef2, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values<never>(dataItem);

          setData(displayItem);
        }
      });
    };

    const fetchData3 = () => {
      // Listen for changes in the collection
      onValue(collectionRef3, (snapshot) => {
        const dataItem = snapshot.val();

        // Check if dataItem exists
        if (dataItem) {
          // Convert the object values into an array
          const displayItem = Object.values<never>(dataItem);

          setData(displayItem);
        }
      });
    };

    // Fetch data when the component mounts
    fetchData();
    fetchData2();
    fetchData3();
  }, []);

  return (
    <View>
      <Text>Data from database:</Text>

      {data.map((item, index) => (
        <Text key={index}>{item}</Text>
      ))}
    </View>
  );
}

export default DBView;
