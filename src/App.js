import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Routers from "./Routes/Routes";

function App() {
  return (
    <ChakraProvider>
      <Routers />
    </ChakraProvider>
  );
}

export default App;
