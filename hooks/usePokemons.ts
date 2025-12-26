import { useEffect, useState } from "react";

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: string;
  name: string;
  image: string;
  imageBack: string;
  types: PokemonType[];
}

export function usePokemons(limit = 200) {
  const [data, setData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchPokemons() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        const result = await response.json();

        const detailed = await Promise.all(
          result.results.map(async (pokemon: any) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
              id: `00${details.id}`,
              name: pokemon.name,
              image: details.sprites.front_default,
              imageBack: details.sprites.back_default,
              types: details.types,
            };
          })
        );

        if (mounted) setData(detailed);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPokemons();

    return () => {
      mounted = false;
    };
  }, [limit]);

  return { data, loading, error };
}
