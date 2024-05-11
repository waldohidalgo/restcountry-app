import { Nunito } from "next/font/google";
import Nav from "./nav";

const nunito = Nunito({ subsets: ["latin"], weight: ["300", "600", "800"] });
import styled from "styled-components";
const Main = styled.main`
  background-color: ${(props) => {
    return props.theme.backgroundColor;
  }};
`;
export default function Layout({ children }) {
  return (
    <>
      <Nav font={nunito.className} />
      <Main className={nunito.className}>{children}</Main>
    </>
  );
}
