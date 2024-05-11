import React from "react";
import theme from "./theme.js";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";

const ThemeProviderWrapper = ({ children }) => {
  const currentTheme = useSelector((state) => state.theme.theme);

  return <ThemeProvider theme={theme[currentTheme]}>{children}</ThemeProvider>;
};

export default ThemeProviderWrapper;
