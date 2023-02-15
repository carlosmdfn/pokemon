// import logo from './logo.svg';
// import './App.css';
import {
  Box,
  Flex,
  Image,
  Button,
  Container,
  Text,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  useMediaQuery,
  InputRightElement
} from '@chakra-ui/react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Tabla from '../components/Tabla';
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Tabla></Tabla>
    </>
  );
}

export default App;
