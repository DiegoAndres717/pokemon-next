import { NextPage, GetStaticProps } from "next";
import Layout from "../components/layouts/Layout";
import pokeAPi from '../api/pokeApi';
import { PokemonList, SmallPokemon } from '../interfaces/pokemon-list';
import { Card, Grid, Row, Text } from "@nextui-org/react";
import PokemonCard from "../components/pokemon/PokemonCard";

interface Props {
  pokemons: SmallPokemon[];
} 

const Home: NextPage<Props> = ({ pokemons }) => {
  //console.log(pokemons)
  return (
    <Layout title="Listado de Pokémons">
        <Grid.Container gap={2} justify='flex-start'>
        {
            pokemons.map( (pokemon) => (
             <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }
        </Grid.Container>
    </Layout>
  )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeAPi.get<PokemonList>('/pokemon?limit=151', { 
    headers: { "Accept-Encoding": "gzip,deflate,compress" } 
})
  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
  }))


  return {
    props: {
      pokemons
    }
  }
}


export default Home;