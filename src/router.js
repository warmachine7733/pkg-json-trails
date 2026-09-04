import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle, styled } from "styled-components";

import App from "./components/App";
import Comparison from "./components/Comparison";
import { colors, fonts } from "./utils/constants";

const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/comparison",
    element: <Comparison />,
  },
]);

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
  }

  body {
    margin: 0;
    font-family: ${fonts.primary};
    background-color: ${colors.background};
    box-sizing: border-box;
    line-height: 1.6;
    font-size: 1rem;
    color: ${colors.darkerGray};
    color-scheme: light;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h5 {
    font-family: ${fonts.secondary};
  }

  ul {
    padding-left: 0;
    list-style-type: none;
  }

  ::selection {
    color: ${colors.ink};
    background: ${colors.primary};
  }
`;

const Main = styled.main`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: ${colors.background};
`;

const Header = styled.header`
  width: min(100% - 2rem, 72rem);
  margin: 0 auto;
  padding: 1.5rem 0 0;
  text-align: left;
`;

const Title = styled.h1`
  color: ${colors.ink};
  font-size: 1.1rem;
  letter-spacing: -0.03em;
`;

const SubTitle = styled.h5`
  margin-top: 0.15rem;
  color: ${colors.muted};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const queryClient = new QueryClient();

function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <Main>
        <GlobalStyle />
        <Header>
          <Title>Package Tracker</Title>
          <SubTitle>Track your project's package version</SubTitle>
        </Header>
        <RouterProvider router={routerConfig} />
      </Main>
    </QueryClientProvider>
  );
}

export default Router;
