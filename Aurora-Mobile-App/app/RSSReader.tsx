/*
 * asks user for the url to an rss feed, (prefilled with a generic feed)
 * sends url to RSS.tsx for cleaning, then displays the returned data
 */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { fetchAndDisplayRssFeed } from "./RSS";
import type { FeedItem } from "./RSS";

const RssReader = () => {
  //set default link to working RSS feed
  const [url, setUrl] = useState<string>(
    "https://lorem-rss.herokuapp.com/feed"
  );
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const items = await fetchAndDisplayRssFeed(url);
      setFeedItems(items);
    } catch (err) {
      setError("Failed to load RSS feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const renderItem = ({ item }: { item: FeedItem }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>
        Read more
      </Text>
      <Text style={styles.pubDate}>{item.pubDate}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RSS Feed Reader</Text>

      <TextInput
        style={styles.input}
        value={url}
        placeholder="Enter RSS feed URL"
        onChangeText={setUrl}
      />

      <TouchableOpacity
        style={[styles.button, !url || loading ? styles.buttonDisabled : null]}
        onPress={handleFetch}
        disabled={!url || loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Loading..." : "Fetch Feed"}
        </Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <FlatList
        data={feedItems}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default RssReader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 16,
    textAlign: "center",
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  link: {
    color: "#007bff",
    marginBottom: 4,
  },
  pubDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
});
