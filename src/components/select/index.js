import styled from "styled-components";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const SelectContenedor = styled.div`
  background-color: ${(props) => {
    return props.theme.backgroundColorElements;
  }};
  color: ${(props) => {
    return props.theme.textColor;
  }};
  padding-block: 15px;
  padding-inline: 5px;
  font-size: 16px;

  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 5px;
  font-weight: 600;
  outline: ${(props) => {
    return props.$isfilter ? "1px solid black" : "none";
  }};

  @media (min-width: 530px) {
    padding-block: 33px;
    font-size: 22px;
    padding-inline: 49px 37px;
  }
  @media (min-width: 870px) {
    padding-block: 18px;
    font-size: 14px;
    padding-inline: 23px;
  }
`;

const ContenedorIcon = styled.span`
  font-size: 30px;
  display: flex;
  align-items: center;
  @media (min-width: 870px) {
    font-size: 18px;
  }
`;

const ContenedorAll = styled.div`
  position: relative;
  width: 59%;
  box-shadow: 0px 0px 5px 0px black;
  border-radius: 5px;
  @media (min-width: 870px) {
    width: 100%;
  }
`;
const ContenedorOptions = styled.div`
  display: ${(props) => {
    return props.$isfilter ? "block" : "none";
  }};
  background-color: ${(props) => {
    return props.theme.backgroundColorElements;
  }};
  color: ${(props) => {
    return props.theme.textColor;
  }};
  z-index: 1;
  position: absolute;
  width: 100%;
  top: 109%;
  border-radius: 5px;

  font-weight: 600;
  padding-block: 15px;
  padding-inline: 5px;
  font-size: 16px;

  @media (min-width: 530px) {
    font-size: 22px;
    padding-block: 24px 14px;
    padding-inline: 49px 37px;
  }

  @media (min-width: 870px) {
    font-size: 14px;
    padding-block: 0;
    padding-inline: 23px;
  }
`;
const ElementoFiltro = styled.p`
  cursor: pointer;
  background-color: ${(props) => {
    return props.$isfilter ? "black" : "transparent";
  }};
  color: ${(props) => {
    if (props.$isfilter) return "white";
    return props.theme.textColor;
  }};
  margin-block: 0;
  padding-block: 10px;
`;

export default function Select({
  children,
  isFilter,
  setIsFilter,
  data,
  referencia,
  filtroAplicado,
  setFiltroAplicado,
}) {
  return (
    <>
      <ContenedorAll ref={referencia}>
        <SelectContenedor
          onClick={() => setIsFilter(!isFilter)}
          $isfilter={isFilter}
        >
          {children}{" "}
          <ContenedorIcon>
            {isFilter ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </ContenedorIcon>
        </SelectContenedor>
        <ContenedorOptions $isfilter={isFilter}>
          {filtroAplicado ? (
            <ElementoFiltro onClick={() => setFiltroAplicado(null)}>
              Resetear Filtro
            </ElementoFiltro>
          ) : null}
          {data.map((item, index) => (
            <ElementoFiltro
              key={index}
              $isfilter={item === filtroAplicado}
              onClick={() => setFiltroAplicado(item)}
            >
              {item}
            </ElementoFiltro>
          ))}
        </ContenedorOptions>
      </ContenedorAll>
    </>
  );
}
