import { React, useEffect, useState } from 'react';
import {
    Box,
    Flex,
    HStack,
    Container,
    Text,
  } from '@chakra-ui/react';

export default function Navbar(){
    
    return(
        <>
      <Box bg={'#FFFFFF'}>
        <Container
          bg={'blackAlpha.800'}
          _dark={{
            background: '#2C3333'
          }}
          boxShadow={
            "0px 1px 5px -3px rgba(0,0,0,0.67)"
          }
          spacing={4}
          padding={'0 2%'}
          justify={{ base: 'center', md: 'space-between' }}
          maxW={'full'}>
          <Flex
            h={'16'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <HStack spacing={8} alignItems={'center'}>
              <Text
                px={4}
                py={2}
                marginInlineStart={'0 !important'}
                borderLeft={'solid 3px #FFBF00'}
                color={'#FFBF00'}
                _dark={
                    {color: '#BFBFBF',
                borderLeft: 'solid 3px #BFBFBF'}
                }
                fontSize={'1.3rem'}
                fontWeight={'600'}>
                PokeAPI
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </>
    )
}