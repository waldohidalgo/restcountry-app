import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { changeTheme } from "../features/theme/themeSlice.js";
import { IoMdMoon } from "react-icons/io";
import { MdSunny } from "react-icons/md";

const H1 = styled.h1`
  color: ${(props) => {
    return props.theme.textColor;
  }};
  margin: 0;
  font-size: 26px;
  letter-spacing: 1px;
  word-spacing: -2px;
  text-align: center;
  @media (min-width: 870px) {
    font-size: 22px;
  }
`;

const Navbar = styled.nav`
  background-color: ${(props) => {
    return props.theme.backgroundColorElements;
  }};
  display: flex;
  position: relative;
  box-shadow: 0px 0px 5px 0px black;
  padding-block: 65px;
  flex-direction: column;
  align-items: center;
  @media (min-width: 550px) {
    flex-direction: row;
    justify-content: space-between;
  }
  @media (min-width: 870px) {
    padding-block: 23px;
  }
`;

const Switch = styled.div`
  color: ${(props) => {
    return props.theme.textColor;
  }};
  position: absolute;
  top: 5px;
  right: 5px;
  margin-left: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 24px;
  font-weight: 600;

  text-align: center;
  @media (min-width: 550px) {
    position: static;
    gap: 20px;
  }
  @media (min-width: 870px) {
    font-size: 16px;
    gap: 11px;
  }
`;

export default function Nav({ font }) {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar className={font}>
        <header>
          <H1>Where in the world?</H1>
        </header>

        <Switch
          onClick={() => dispatch(changeTheme())}
          title="Click to change theme"
        >
          {theme === "light" ? <IoMdMoon /> : <MdSunny />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </Switch>
      </Navbar>
    </>
  );
}
