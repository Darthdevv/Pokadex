import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
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

export default function Index() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  useEffect(() => {
    getPokemons();
  }, []);

  async function getPokemons() {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20"
      );
      const data = await response.json();

      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            image: details.sprites.front_default,
            imageBack: details.sprites.back_default,
            types: details.types,
          };
        })
      );
      console.log("data", detailedPokemons);
      setPokemons(detailedPokemons);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      >
        {pokemons.map((pokemon) => (
          <Link
            href={{ pathname: "/details" , params: {name: pokemon.name}}}
            key={pokemon.name}
            style={{
              backgroundColor: colorsByType[pokemon.types[0].type.name] + 50,
              borderRadius: 20,
              padding: 20,
            }}
          >
            <View>
              <Text style={styles.name}>{pokemon.name}</Text>
              <Text style={styles.type}>{pokemon.types[0].type.name}</Text>
              <View style={{ flexDirection: "row-reverse" }}>
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: pokemon.image }}
                />
                <Image
                  style={{ width: 150, height: 150 }}
                  source={{ uri: pokemon.imageBack }}
                />
              </View>
            </View>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  type: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "gray",
  },
});
