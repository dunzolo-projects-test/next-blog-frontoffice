import "@/styles/globals.css";
import "@/styles/index.css";
import "@/styles/posts.css";
import "@/styles/category.css";
import type { AppProps } from "next/app";
import AppNavbar from "@/components/AppNavbar";
import AppFooter from "@/components/AppFooter";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppNavbar />
      <Component {...pageProps} />
      <AppFooter />
    </>
  );
}
