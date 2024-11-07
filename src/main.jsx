import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { store } from './store.js'
import { Provider } from 'react-redux'

// Create a custom theme with primary color set to black
const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Black color for primary
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Provider>
  </StrictMode>
);
