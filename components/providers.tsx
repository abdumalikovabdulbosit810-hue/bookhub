"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { ConfigProvider, theme as antTheme } from "antd";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { reduxStore } from "@/store/redux-store";

const muiTheme = createTheme({
  palette: {
    primary: { main: "#6D28D9" }
  },
  shape: { borderRadius: 8 }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={reduxStore}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <MuiThemeProvider theme={muiTheme}>
          <ConfigProvider
            theme={{
              algorithm: antTheme.defaultAlgorithm,
              token: { colorPrimary: "#6D28D9", borderRadius: 8 }
            }}
          >
            {children}
          </ConfigProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  );
}
