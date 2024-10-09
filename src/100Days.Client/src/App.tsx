import Layout from "@/features/layout/layout";
import { ThemeProvider } from "./features/theme/theme-provider";
import HomePage from "./features/home/home-page";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout>
        <HomePage />
      </Layout>
    </ThemeProvider>
  );

  // async function populateWeatherData() {
  //     const response = await fetch('api/weatherforecast');
  //     const data = await response.json();
  //     setForecasts(data);
  // }
}

export default App;

