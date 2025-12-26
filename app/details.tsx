import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Pokemon {
  id: number | string;
  name: string;
  image: string;
  imageBack: string;
  frontShiny: string;
  backShiny: string;
  types: PokemonType[];
  stats: any[];
  forms: any[];
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export const colorsByType: Record<string, string> = {
  normal: "#A8A77A",
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
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function Details() {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [activeTab, setActiveTab] = useState<"stats" | "forms" | "types">(
      "stats"
    );
  const [selectedImage, setSelectedImage] = useState<"front" | "back" | "front_shiny" | "back_shiny">("front");

  const { name } = useLocalSearchParams();

  useEffect(() => {
    getPokemon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  async function getPokemon() {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();

      const formattedPokemon: Pokemon = {
        id: `00${data.id}`,
        name: data.name,
        image: data.sprites.front_default,
        imageBack: data.sprites.back_default,
        frontShiny: data.sprites.front_shiny,
        backShiny: data.sprites.back_shiny,
        types: data.types,
        stats: data.stats,
        forms: data.forms,
      };

      setPokemon(formattedPokemon);
    } catch (error) {
      console.log(error);
    }
  }

  if (!pokemon) return <Text>Loading...</Text>;

  const bgColor = colorsByType[pokemon.types[0].type.name];

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <Text style={styles.description}>{pokemon.id}</Text>
      <View
        style={{
          backgroundColor: bgColor + "50",
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
                selectedImage === "front" ? pokemon.image : selectedImage === "back" ? pokemon.imageBack : selectedImage === 'front_shiny' ? pokemon.frontShiny : pokemon.backShiny,
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
              {tab.toUpperCase()}
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
                selectedImage === "back" && styles.activeFormBox,
              ]}
            >
              <Image
                source={{ uri: pokemon.frontShiny }}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.itemRow}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedImage("back_shiny")}
              style={[
                styles.formBox,
                selectedImage === "back" && styles.activeFormBox,
              ]}
            >
              <Image
                source={{ uri: pokemon.backShiny }}
                style={{ width: 80, height: 80 }}
              />
              <Text style={styles.itemRow}>Back</Text>
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
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "capitalize",
  },
  description: {
    fontSize: 20,
    textAlign: "center",
    color: "gray",
    textTransform: "capitalize",
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
  },
  activeTabButton: {
  },
  tabText: {
    color: "#aaa",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "Black",
  },
  tabContent: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  itemRow: {
    fontSize: 18,
    paddingVertical: 6,
    textTransform: "capitalize",
  },
  formBox: {
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#e8e8e8",
  },
  activeFormBox: {
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "#dcdcdc",
  },
});
