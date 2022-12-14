import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/layouts/Layout';
import NoFavorites from '../../components/ui/NoFavorites';
import { localFavorites } from '../../utils';

const FavoritePage = () => {

    const [favoritePoke, setFavoritePoke] = useState<number[]>([])

    useEffect(() => {
      setFavoritePoke( localFavorites.pokemons())
    }, [])
    

    return (
        <Layout title='Favoritos'>
            {
                favoritePoke.length === 0 
                ? ( <NoFavorites /> )
                : (
                    <Grid.Container gap={2} direction='row' justify='flex-start'>
                        {
                            favoritePoke.map( id => (
                                <Grid xs={6} sm={2} md={2} xl={1} key={id}>
                                    <Card hoverable clickable css={{ padding: 10 }}>
                                        <Card.Image 
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                                            width={'100%'}
                                            height={140}
                                        />
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid.Container>
                )
            }
        </Layout>
    );
};

export default FavoritePage;