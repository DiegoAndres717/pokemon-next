import React, { FC } from 'react';
import { Card, Grid, Row, Text } from '@nextui-org/react';
import { SmallPokemon } from '../../interfaces/pokemon-list';
import { useRouter } from 'next/router';

interface Props {
    pokemon: SmallPokemon;
  }

const PokemonCard: FC<Props>  = ({pokemon}) => {
  const router = useRouter();
  const onClickPoke = () => {
    router.push(`/pokemon/${pokemon.id}`)
  }

    return (
        <>
            <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
                <Card 
                  onClick={ onClickPoke }
                  hoverable clickable>
                  <Card.Body css={{ p: 1 }}>
                    <Card.Image 
                      src={pokemon.img}
                      width='100%'
                      height='140'
                      alt={pokemon.name}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <Row justify="space-between">
                      <Text transform="capitalize">{pokemon.name}</Text>
                      <Text># {pokemon.id}</Text>
                    </Row>
                  </Card.Footer>
                </Card>
            </Grid>
            
        </>
    );
};

export default PokemonCard;