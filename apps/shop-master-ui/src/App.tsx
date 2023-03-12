import { Box, Button, useColorMode } from "ui";
// import FinancialDataImage from "./assets/financial_data.svg";
import "./App.scss";
import FinancialDataImage from "ui/assets/financial_data.svg";

function App() {
  const { toggleColorMode } = useColorMode();
  return (
    <Box className="App">
      <Button variant="contained" onClick={toggleColorMode}>
        Hello World
      </Button>
      <FinancialDataImage />
      <img
        src={FinancialDataImage}
        alt="Financial Data"
        width={200}
        height={200}
      />
    </Box>
  );
}

export default App;
