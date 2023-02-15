import { React, useEffect, useState } from 'react';
import {
    Flex,
    Button,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    SimpleGrid,
    Box
  } from '@chakra-ui/react';
  import axios from 'axios';
  import {
    Pagination,
    usePagination,
    PaginationPage,
    PaginationNext,
    PaginationPrevious,
    PaginationPageGroup,
    PaginationContainer,
    PaginationSeparator
  } from "@ajna/pagination";

  import {InfoIcon} from '@chakra-ui/icons'

  export default function Tabla (){

    const [data, setData] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [total, setTotal] = useState(0);
    const [mostrar, setMostrar] = useState(false)
    const getPokemons = async (offset)=>{
      axios.get(`https://pokeapi.co/api/v2/pokemon-species?offset=${offset}=&limit=20`).then((res)=>{
        setTotal(res.data.count)
        setData(res.data.results)
      })
    }
    const {
      pages,
      pagesCount,
      offset,
      currentPage,
      setCurrentPage,
      setIsDisabled,
      isDisabled,
      pageSize,
      setPageSize
    } = usePagination({
      total: total,
      limits: {
        outer: 2,
        inner: 2
      },
      initialState: {
        pageSize: 20,
        isDisabled: false,
        currentPage: 1
      }
    });

    const getPokemon =async (url)=>{
      await axios.get(url).then((res)=>{
        setMostrar(true);
        setPokemon(res.data)
      })
    }

    const handlePageChange = (nextPage) =>{
      setCurrentPage(nextPage);
    };

    useEffect(()=>{
      getPokemons(offset);
    },[currentPage,offset])

    return(
        <Flex  w={'100%'} height={'auto'} padding={'2% 1% 0% 2%'} justifyContent={'center'} alignItems={'center'}>
            <Flex direction={'column'} width={'30%'}>
            <TableContainer width={'100%'}>
              <Table variant={'striped'} size={'sm'} colorScheme={'blackAlpha'}>
                <Thead>
                  <Tr>
                    <Th width={'50%'} fontSize={'1rem'}>
                    Nombre
                    </Th>
                    <Th width={'50%'} fontSize={'1rem'} textAlign={'center'} >
                      Opciones
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map((p)=>{
                    return(
                      <>
                      <Tr height={'50%'} >
                        <Td>
                          {p.name}
                        </Td>
                        <Td textAlign={'center'} height={'50%'}>
                          <Button leftIcon={<InfoIcon></InfoIcon>}  variant={'ghost'}  size={'xs'} height={5} onClick={()=>getPokemon(p.url)}></Button>
                        </Td>
                      </Tr>
                    </>
                    )
                  })}
                </Tbody>
              </Table>
            </TableContainer>
            <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          isDisabled={isDisabled}
          onPageChange={handlePageChange}
        >
          <PaginationContainer
            align="center"
            justify="space-between"
            p={4}
            w="full"
          >
            <PaginationPrevious
              _hover={{
                bg: "whiteAlpha.900"
              }}
              bg="whiteAlpha"
              border={'1px'}
            >
              <Text fontSize={'sm'}>Anterior</Text>
            </PaginationPrevious>
            <PaginationPageGroup
              isInline
              align="center"
              separator={
                <PaginationSeparator
                  fontSize="sm"
                  w={7}
                  jumpSize={11}
                />
              }
            >
              {pages.map((page) => (
                <PaginationPage
                  w={7}
                  bg="white"
                  key={`pagination_page_${page}`}
                  page={page}
                  border={'1px'}
                  fontSize="sm"
                  _hover={{
                    bg: "blackAlpha.800",
                    color: "white"
                  }}
                  _current={{
                    bg: "blackAlpha.800",
                    color: 'white',
                    fontSize: "sm",
                    w: 10
                  }}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext
              _hover={{
                bg: "whiteAlpha.900"
              }}
              border={'1px'}
            >
              <Text fontSize={'sm'}>Siguiente</Text>
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
            </Flex>
            <Flex  padding={20} width={'52%'}>
              <Flex width={'100%'}>
                {mostrar ? <Box  w={'100%'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} borderRadius={'15px'} padding={'1%'}>
                  <Flex margin={8} direction={'column'}>
                    <Text fontSize={'xl'} fontWeight={'bold'}> {pokemon.name} </Text>
                    {pokemon.genera?.map((a)=>{
                      return a.language.name == 'es' ? <Text fontSize={'xs'}> {a.genus} | {pokemon.generation?.name}</Text>: ''
                    })}
                    {pokemon.evolves_from_species != null ? <Text fontSize={'xs'}>Evolución de {pokemon.evolves_from_species.name}</Text>:''}
                  </Flex>
                  <Flex marginLeft={8} width={'auto'} marginRight={8}>
                    <SimpleGrid spacing={8} display={'flex'} width='100%'>
                    <Box boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} borderRadius={'15px'}>
                      <Flex id='qfue' margin={5} gap={15} width={'100%'}>
                        <SimpleGrid spacing={1}>
                          <Text fontSize={'sm'}>Felicidad: {pokemon.base_happiness}</Text>
                          <Text fontSize={'sm'}>Tasa captura: {pokemon.capture_rate}</Text>
                          <Text fontSize={'sm'}>Bebé: {pokemon.is_baby ? 'Si':'No'}  </Text>
                          <Text fontSize={'sm'}>Lengedario: {pokemon.is_legendary ? 'Si':'No'}  </Text>
                          
                        </SimpleGrid>
                        <SimpleGrid spacing={1}>
                          <Text fontSize={'sm'}>Tasa crecimiento: {pokemon.growth_rate?.name}</Text>
                          <Text fontSize={'sm'}>Hábitat: {pokemon.habitat?.name}</Text>
                          <Text fontSize={'sm'}>Forma: {pokemon.shape?.name}  </Text>
                          <Text fontSize={'sm'}>Mítico: {pokemon.is_mythical ? 'Si':'No'}  </Text>
                        </SimpleGrid>
                      </Flex>
                    </Box>
                    <Box boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} borderRadius={'15px'}>
                      <Flex  margin={5} direction={'column'} gap={1}>
                        <Text fontSize={'sm'} fontWeight={'bold'}>Variantes</Text>
                        <SimpleGrid spacing={1} height={'auto'} maxHeight={'95px'} overflowY={"auto"} css={{
                          '&::-webkit-scrollbar': {
                            width: '7px'
                          },
                          '&::-webkit-scrollbar-track': {
                            background: '#555',
                            borderRadius: '0px'
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '0px'
                          },
                          '&::-webkit-scrollbar-thumb:hover': {
                            background: '#c2c2c2'
                          }
                          }}>
                          {pokemon.varieties?.map((v)=>{
                            return (
                              <Text paddingRight={2} fontSize={'sm'}>{v.pokemon?.name}</Text>
                            )
                          })}
                        </SimpleGrid>
                      </Flex>
                    </Box>
                    <Box boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} borderRadius={'15px'}>
                    <Flex  margin={5} direction={'column'} gap={1}>
                        <Text fontSize={'sm'} fontWeight={'bold'}>Huevo</Text>
                        <SimpleGrid spacing={1} height={'auto'} maxHeight={'95px'} overflowY={"auto"} css={{
                          '&::-webkit-scrollbar': {
                            width: '7px'
                          },
                          '&::-webkit-scrollbar-track': {
                            background: '#555',
                            borderRadius: '0px'
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '0px'
                          },
                          '&::-webkit-scrollbar-thumb:hover': {
                            background: '#c2c2c2'
                          }
                          }}>
                          {pokemon.egg_groups.length > 0 ? pokemon.egg_groups?.map((v)=>{
                            return (
                              <Text paddingRight={2} fontSize={'sm'}>{v.name}</Text>
                            )
                          }): <Text fontSize={'xs'}>No hay información</Text>}
                        </SimpleGrid>
                      </Flex>
                    </Box>
                    </SimpleGrid>
                  </Flex>
                  <Flex padding={'1rem 2rem 2rem 2rem'} width={'100%'} >
                    <Box  boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} borderRadius={'15px'}>
                    <Flex  margin={5} direction={'column'} maxWidth={'100%'} gap={'2px'}>
                        <Text fontSize={'sm'} fontWeight={'bold'}>Descripción</Text>
                        <SimpleGrid spacing={1} height={'auto'} maxHeight={'160px'} overflowY={"auto"} css={{
                          '&::-webkit-scrollbar': {
                            width: '7px'
                          },
                          '&::-webkit-scrollbar-track': {
                            background: '#555',
                            borderRadius: '0px'
                          },
                          '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: '0px'
                          },
                          '&::-webkit-scrollbar-thumb:hover': {
                            background: '#c2c2c2'
                          }
                          }}>
                          { pokemon.flavor_text_entries.length > 0 ? pokemon.flavor_text_entries?.map((v)=>{
                            return v.language.name == 'es' ? (
                              <Text paddingRight={2} fontSize={'sm'}>- {v.flavor_text}</Text>) : ''
                            
                          }):<Text fontSize={'sm'}> No hay información</Text> }
                        </SimpleGrid>
                      </Flex>
                    </Box>
                  </Flex>
                </Box>: 
                <Box w={'100%'} minW={'100%'} minH={'200px'} boxShadow={'rgba(0, 0, 0, 0.24) 0px 3px 8px'} borderRadius={'15px'} padding={'1%'}>
                     <Flex justifyContent={'center'} alignItems={'center'} height={'100%'}>
                        <Text fontSize={'xxx-large'}> Elije un pokemon!</Text>     
                     </Flex>
                </Box>}
              </Flex>
            </Flex>
        </Flex>
    )
  }