import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
  description?: string;
}

/**
 * takes in url, returns raw xml data from the rss feed
 */
async function fetchRssFeed(url: string): Promise<string> {
  try {
    const response: any = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching the RSS feed:", error);
    throw new Error("Failed to fetch RSS feed");
  }
}

/**
 * Parses the raw XML data into a JavaScript object using fast-xml-parser.
 */
async function parseRssFeed(xml: string): Promise<any> {
  const parser = new XMLParser();
  try {
    const result = parser.parse(xml); // Synchronous parsing
    return result;
  } catch (error) {
    console.error("Error parsing the RSS feed:", error);
    throw new Error("Failed to parse RSS feed");
  }
}

/**
 * Extracts feed items from the parsed XML data and maps them to an array of FeedItem objects.
 */
async function extractFeedItems(parsedData: any): Promise<FeedItem[]> {
  const items = parsedData.rss.channel.item.map((item: any) => ({
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    description: item.description || "No description available",
  }));

  return items;
}

/**
 * Fetches, parses, and displays RSS feed items from a given URL.
 *
 * This function fetches the RSS feed XML, parses it into an object,
 * extracts the desired data, and returns it.
 */
export async function fetchAndDisplayRssFeed(url: string): Promise<FeedItem[]> {
  try {
    const xmlData = await fetchRssFeed(url); // Step 1: Fetch the RSS feed
    const parsedData = await parseRssFeed(xmlData); // Step 2: Parse the XML data
    const feedItems = await extractFeedItems(parsedData); // Step 3: Extract feed items
    return feedItems; // Step 4: Return cleaned data
  } catch (error) {
    console.error("Error during RSS feed processing:", error);
    throw error;
  }
}
export default fetchAndDisplayRssFeed;
// Example Usage
// fetchAndDisplayRssFeed("https://example.com/rss-feed.xml");
