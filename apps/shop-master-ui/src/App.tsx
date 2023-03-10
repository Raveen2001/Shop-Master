import { Box, Button, useColorMode } from "ui";
import "./App.scss";

function App() {
  const { toggleColorMode } = useColorMode();
  return (
    <Box className="App">

      <Button variant="contained" onClick={toggleColorMode}>
        Hello World
      </Button>
    </Box>
  );
}

export default App;
