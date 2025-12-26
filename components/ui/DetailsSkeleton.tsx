import React from "react";
import { StyleSheet, View } from "react-native";
import { Shimmer } from "./Shimmer";


export const DetailsSkeleton = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Shimmer style={styles.title} />
      <Shimmer style={styles.subtitle} />

      {/* Main image card */}
      <View style={styles.imageCard}>
        <Shimmer style={styles.mainImage} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {[...Array(3)].map((_, i) => (
          <Shimmer key={i} style={styles.tab} />
        ))}
      </View>

      {/* Tab content */}
      <View style={styles.contentBox}>
        {[...Array(4)].map((_, i) => (
          <Shimmer key={i} style={styles.row} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#121212",
    flex: 1,
  },

  title: {
    width: "50%",
    height: 30,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 8,
  },

  subtitle: {
    width: "30%",
    height: 20,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 20,
  },

  imageCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#222",
    alignItems: "center",
  },

  mainImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },

  tab: {
    width: 80,
    height: 30,
    borderRadius: 20,
  },

  contentBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#000000cc",
  },

  row: {
    height: 20,
    borderRadius: 6,
    marginBottom: 12,
    width: "90%",
  },
});
