import { DetailsSkeleton } from "@/components/ui/DetailsSkeleton";
import { usePokemonDetails } from "@/hooks/usePokemonDetails";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const colorsByType: Record<string, string> = {
  normal: "#6F35FC",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#F7D02C",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Details() {
  const [activeTab, setActiveTab] = useState<"stats" | "forms" | "types">(
    "stats"
  );
  const [selectedImage, setSelectedImage] = useState<
    "front" | "back" | "front_shiny" | "back_shiny"
  >("front");

  const { name } = useLocalSearchParams();
  const { data: pokemon, loading, error } = usePokemonDetails(name);

  if (error)
    return <Text style={{ color: "white" }}>Something went wrong</Text>;
  if (loading) return <DetailsSkeleton />;
  if (!pokemon) return null;

  const bgColor = colorsByType[pokemon.types[0].type.name];

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, backgroundColor: "#121212" }}
    >
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text style={styles.description}>{pokemon.id}</Text>
      <View
        style={{
          backgroundColor: bgColor + "50",
          borderWidth: 1,
          borderColor: bgColor,
          borderRadius: 20,
          padding: 20,
        }}
      >
        <View
          style={{ flexDirection: "row-reverse", justifyContent: "center" }}
        >
          <Image
            style={{ width: 250, height: 250 }}
            source={{
              uri:
                selectedImage === "front"
                  ? pokemon.image
                  : selectedImage === "back"
                  ? pokemon.imageBack
                  : selectedImage === "front_shiny"
                  ? pokemon.frontShiny
                  : pokemon.backShiny,
            }}
          />
        </View>
      </View>
      {/* TABS */}
      <View style={styles.tabContainer}>
        {["stats", "forms", "types"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* TAB CONTENT */}
      <View style={styles.tabContent}>
        {activeTab === "stats" && (
          <View>
            {pokemon.stats.map((s) => (
              <Text key={s.stat.name} style={styles.itemRow}>
                {s.stat.name}: {s.base_stat}
              </Text>
            ))}
          </View>
        )}

        {activeTab === "forms" && (
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <TouchableOpacity
              onPress={() => setSelectedImage("front")}
              style={[
                styles.formBox,
                selectedImage === "front" && styles.activeFormBox,
              ]}
            >
              <Image
                source={{ uri: pokemon.image }}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.itemRow}>Front</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedImage("back")}
              style={[
                styles.formBox,
                selectedImage === "back" && styles.activeFormBox,
              ]}
            >
              <Image
                source={{ uri: pokemon.imageBack }}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.itemRow}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedImage("front_shiny")}
              style={[
                styles.formBox,
                selectedImage === "front_shiny" && styles.activeFormBox,
              ]}
            >
              <Image
                source={{ uri: pokemon.frontShiny }}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.itemRow}>Front Shiny</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedImage("back_shiny")}
              style={[
                styles.formBox,
                selectedImage === "back_shiny" && styles.activeFormBox,
              ]}
            >
              <Image
                source={{ uri: pokemon.backShiny }}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.itemRow}>Back Shiny</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === "types" && (
          <View>
            {pokemon.types.map((t) => (
              <Text key={t.type.name} style={styles.itemRow}>
                {t.type.name}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    textTransform: "capitalize",
    marginBlockEnd: 10
  },
  description: {
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center",
    color: "#eee",
    marginBlockEnd: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    textTransform: "capitalize",
  },
  activeTabButton: {},
  tabText: {
    color: "#aaa",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "white",
  },
  tabContent: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#000000cc",
    borderRadius: 12,
  },
  itemRow: {
    fontSize: 18,
    paddingVertical: 6,
    textTransform: "capitalize",
    color: "#fff",
  },
  formBox: {
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#000000cc",
    borderWidth: 2,
    borderColor: "#121212",
  },
  activeFormBox: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#29292b",
  },
});
