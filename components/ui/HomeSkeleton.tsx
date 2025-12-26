import React from "react";
import { StyleSheet, View } from "react-native";
import { Shimmer } from "./Shimmer";

export const HomeSkeleton = () => {
  return (
    <View style={{ gap: 16 }}>
      {[...Array(5)].map((_, index) => (
        <View key={index} style={[styles.card, { backgroundColor: "#222" }]}>
          <Shimmer style={styles.skeletonText} />
          <Shimmer style={styles.skeletonTextSmall} />
          <View style={{ flexDirection: "row-reverse", gap: 10 }}>
            <Shimmer style={styles.skeletonImage} />
            <Shimmer style={styles.skeletonImage} />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    borderColor: "#555",
  },
  skeletonText: {
    width: "60%",
    height: 28,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 8,
  },
  skeletonTextSmall: {
    width: "40%",
    height: 20,
    borderRadius: 6,
    alignSelf: "center",
    marginBottom: 16,
  },
  skeletonImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
});
