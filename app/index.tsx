import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { HomeSkeleton } from "@/components/ui/HomeSkeleton"
import { usePokemons } from "@/hooks/usePokemons";


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

export default function Index() {
  const { data: pokemons, loading, error } = usePokemons(200);

  if (error)
    return <Text style={{ color: "white" }}>Something went wrong</Text>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {loading ? (
          <HomeSkeleton />
        ) : (
          pokemons.map((pokemon) => (
            <Link
              href={{ pathname: "/details", params: { name: pokemon.name } }}
              key={pokemon.name}
              style={[
                styles.card,
                {
                  backgroundColor:
                    colorsByType[pokemon.types[0].type.name] + "50",
                  borderColor: colorsByType[pokemon.types[0].type.name],
                },
              ]}
            >
              <View>
                <Text style={styles.name}>{pokemon.name}</Text>
                <Text style={styles.type}>{pokemon.id}</Text>
                <View style={{ flexDirection: "row-reverse" }}>
                  <Image style={styles.image} source={{ uri: pokemon.image }} />
                  <Image
                    style={styles.image}
                    source={{ uri: pokemon.imageBack }}
                  />
                </View>
              </View>
            </Link>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    color: "white",
    textTransform: "capitalize",
  },
  type: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
    color: "#eee",
  },
  image: {
    width: 150,
    height: 150,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 20,
    borderColor: "#555",
    marginBottom: 16,
  },
});
