import { Box, Button, Typography, useColorMode } from "ui";
import "./App.scss";

function App() {
  const { toggleColorMode } = useColorMode();
  return (
    <Box className="App">
      <Button variant="contained" onClick={toggleColorMode}>
        Hello World
      </Button>
      <Typography variant="h1">Hello</Typography>
    </Box>
  );
}

export default App;
