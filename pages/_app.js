import Layout from "../src/components/layout.js";
import ThemeProviderWrapper from "@/components/features/theme/ThemeContext.js";
import { Provider } from "react-redux";
import store from "@/components/store.js";
import globals from "./globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProviderWrapper>
    </Provider>
  );
}
