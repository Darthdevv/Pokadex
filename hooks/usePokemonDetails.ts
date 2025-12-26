import { useEffect, useState } from "react";

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonDetails {
  id: string;
  name: string;
  image: string;
  imageBack: string;
  frontShiny: string;
  backShiny: string;
  types: PokemonType[];
  stats: any[];
  forms: any[];
}

export function usePokemonDetails(name?: string | string[]) {
  const [data, setData] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!name) return;

    let mounted = true;

    async function fetchPokemon() {
      try {
        setLoading(true);

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        const result = await response.json();

        const formatted: PokemonDetails = {
          id: `00${result.id}`,
          name: result.name,
          image: result.sprites.front_default,
          imageBack: result.sprites.back_default,
          frontShiny: result.sprites.front_shiny,
          backShiny: result.sprites.back_shiny,
          types: result.types,
          stats: result.stats,
          forms: result.forms,
        };

        if (mounted) setData(formatted);
      } catch (err) {
        if (mounted) setError(err as Error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPokemon();

    return () => {
      mounted = false;
    };
  }, [name]);

  return { data, loading, error };
}
