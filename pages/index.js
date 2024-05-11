import styled from "styled-components";
import { TbZoom } from "react-icons/tb";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "@/components/select";
import Pagination from "@/components/pagination";

import Image from "next/image";

import Link from "next/link";
import {
  changePageInitial,
  changePageSelected,
} from "@/components/features/pagination/paginationSlice.js";

const ContenedorFilter = styled.div`
  display: flex;
  flex-direction: column;

  padding-top: 50px;
  .contenedor_select {
    margin-top: 81px;
  }
  @media (min-width: 870px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .contenedor_select {
      margin-top: 0;
      width: 50%;
      max-width: 198px;
    }
  }
`;
const InputSearch = styled.input`
  color: ${(props) => props.theme.inputColor};
  background-color: inherit;
  border: none;
  font-size: 16px;
  width: 100%;

  &:focus {
    border: none;
    outline: none;
  }
  &::placeholder {
    color: ${(props) => props.theme.inputColor};
  }
  @media (min-width: 530px) {
    font-size: 23px;
  }

  @media (min-width: 870px) {
    font-size: 13px;
  }
`;

const InputWithIcon = styled.div`
  padding-block: 21px;
  padding-inline: 5px;
  width: 100%;
  box-shadow: 0px 0px 5px 0px black;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.backgroundColorElements};
  display: flex;
  align-items: center;
  gap: 0px;
  border-radius: 5px;
  .icon_search {
    font-size: 35px;
    display: flex;
  }
  @media (min-width: 530px) {
    gap: 51px;
    padding-block: 21px;
    padding-inline: 58px;
  }

  @media (min-width: 870px) {
    padding-block: 19px;
    gap: 22px;
    padding-inline: 30px;
    max-width: 483px;
    .icon_search {
      font-size: 1rem;
    }
  }
`;

const ContenedorCards = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 75px;
  padding-bottom: 50px;
  margin-top: 53px;
  padding-inline: 11%;
  a {
    text-decoration: none;
  }
  h3 {
    color: ${(props) => props.theme.textColor};
    font-size: 18px;
  }
  p {
    color: ${(props) => props.theme.textColor};
  }
  @media (min-width: 830px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1040px) {
    padding-inline: 0;
    grid-template-columns: repeat(4, 1fr);
  }
`;
const Card = styled.div`
  background-color: ${(props) => props.theme.backgroundColorElements};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .contenedorContenido {
    padding: 6px 24px 47px;

    .subtitulo {
      font-weight: 600;
    }
  }
  p {
    margin: 0;
    font-size: 14px;
  }
  .population {
    margin-block: 12px 5px;
  }
`;

const ContenedorImagen = styled.div`
  position: relative;
  aspect-ratio: 16/9;
  img {
    border-radius: 10px 10px 0 0;
    object-fit: cover;
  }
`;

export async function getStaticProps() {
  try {
    const res = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,region,population,capital,cca3"
    );
    const data = await res.json();
    const newData = data.map((item) => {
      return {
        name: { common: item.name.common },
        region: item.region,
        flags: { svg: item.flags.svg },
        population: item.population,
        capital: item.capital || "no data",
      };
    });
    return { props: { data: newData } };
  } catch (error) {
    return { props: { data: [] } };
  }
}

/*

*/

const cantidadElementosPorPagina = 8;
export default function Home({ data }) {
  const selectRef = useRef(null);
  const [isFilter, setIsFilter] = useState(false);
  const [filtroAplicado, setFiltroAplicado] = useState(null);
  const [countrySelected, setCountrySelected] = useState("");
  const pageInitial = useSelector((state) => state.pagination.pageInitial);
  const pageSelected = useSelector((state) => state.pagination.pageSelected);
  const dispatch = useDispatch();
  const [dataShowed, setDataShowed] = useState([]);

  useEffect(() => {
    setDataShowed(
      data
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .filter((item) =>
          filtroAplicado ? item.region === filtroAplicado : true
        )
        .filter((item) =>
          countrySelected === ""
            ? true
            : item.name.common
                .toLocaleLowerCase()
                .includes(countrySelected.toLocaleLowerCase())
        )
        .slice(
          (pageSelected - 1) * cantidadElementosPorPagina,
          (pageSelected - 1) * cantidadElementosPorPagina +
            cantidadElementosPorPagina
        )
    );
  }, [filtroAplicado, countrySelected, pageSelected]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePageInitial = (page) => {
    dispatch(changePageInitial(page));
  };

  const handlePageSelected = (page) => {
    dispatch(changePageSelected(page));
  };

  const handleInputCountry = (event) => {
    setCountrySelected(event.target.value);
    handlePageSelected(1);
    handlePageInitial(1);
  };

  const getDataFiltradaLength = () => {
    return data
      .sort((a, b) => a.name.common.localeCompare(b.name.common))
      .filter((item) =>
        filtroAplicado ? item.region === filtroAplicado : true
      )
      .filter((item) =>
        countrySelected === ""
          ? true
          : item.name.common
              .toLocaleLowerCase()
              .includes(countrySelected.toLocaleLowerCase())
      ).length;
  };

  return (
    <>
      <ContenedorFilter>
        <InputWithIcon>
          <div className="icon_search">
            <TbZoom />
          </div>
          <InputSearch
            placeholder="Search for a country..."
            value={countrySelected}
            onChange={handleInputCountry}
          />
        </InputWithIcon>
        <div className="contenedor_select">
          <Select
            referencia={selectRef}
            isFilter={isFilter}
            setIsFilter={setIsFilter}
            data={["Africa", "Americas", "Asia", "Europe", "Oceania"]}
            filtroAplicado={filtroAplicado}
            setFiltroAplicado={(value) => {
              handlePageInitial(1);
              handlePageSelected(1);
              setFiltroAplicado(value);
            }}
          >
            {filtroAplicado ? filtroAplicado : "Filter by Region"}
          </Select>
        </div>
      </ContenedorFilter>
      <div>
        {data.length > 0 ? (
          <ContenedorCards>
            {dataShowed.length > 0
              ? dataShowed.map((item, index) => {
                  return (
                    <Link
                      href={`/country/${item.name.common}`}
                      key={item.name.common}
                    >
                      <Card>
                        <ContenedorImagen>
                          <Image
                            src={item.flags.svg}
                            alt={`${item.name.common} flag`}
                            fill
                          />
                        </ContenedorImagen>
                        <div className="contenedorContenido">
                          <h3>{item.name.common}</h3>
                          <p className="population">
                            <span className="subtitulo">Population:</span>{" "}
                            {item.population.toLocaleString()}
                          </p>
                          <p>
                            <span className="subtitulo">Region:</span>{" "}
                            {item.region}
                          </p>
                          <p>
                            <span className="subtitulo">Capital:</span>{" "}
                            {item.capital ? item.capital[0] : "--"}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  );
                })
              : ""}
          </ContenedorCards>
        ) : (
          <p>No existen datos</p>
        )}
        <Pagination
          cantidadElementosPorPagina={cantidadElementosPorPagina}
          pageInitial={pageInitial}
          handlePageInitial={handlePageInitial}
          length={getDataFiltradaLength()}
          pageSelected={pageSelected}
          setPageSelected={handlePageSelected}
        />
      </div>
    </>
  );
}
