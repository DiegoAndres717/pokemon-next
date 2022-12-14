import React, { useState } from 'react';
import Layout from '../../components/layouts/Layout';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { PokemonList, SmallPokemon } from '../../interfaces/pokemon-list';
import pokeApi from '../../api/pokeApi';
import { Pokemon } from '../../interfaces/pokemon-full';
import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
    /* const router = useRouter();
    console.log(router.query); */
    
    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existPokemon(pokemon.id))

    const onToggleFavorites = () => {
        localFavorites.toogleFavorites( pokemon.id )
        setIsInFavorites( !isInFavorites )
    }

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px'}} gap={2}>
                <Grid xl={12} sm={4} >
                    <Card hoverable css={{ padding: '30px'}}>
                        <Card.Body>
                            <Card.Image 
                                src={pokemon.sprites.other?.dream_world.front_default || 'No_Image.png'}
                                alt={pokemon.name}
                                width='100%'
                                height='200px'
                            />
                        </Card.Body>
                    </Card>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ diplay: 'flex', justifyContent: 'space-between'}}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button
                                color='gradient'
                                ghost={ !isInFavorites }
                                onClick={onToggleFavorites}
                            >
                                { isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row' display='flex' gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    width={100}
                                    height={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    );
};


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const poke151 = [...Array(151)].map( (value, index) => `${index + 1}`);
    return {
        paths:  poke151.map( id => ({
            params: { id },
        }))
            /* {
                params: {
                    id: '1'
                }
            } */
        ,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { id } = params as { id: string };

    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`, { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  })
   /*  const pokemons: SmallPokemon[] = data.results.map( (poke, i) => ({
      ...poke,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ i + 1 }.svg`
    })) */
  
  
    return {
      props: {
        pokemon: data
      }
    }
  }

export default PokemonPage;