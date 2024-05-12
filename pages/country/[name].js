import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

export async function getStaticPaths() {
  const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
  const names = await res.json();
  const paths = names.map((item) => {
    return {
      params: { name: item.name.common },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const name = context.params.name;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
  );
  const data = await res.json();

  const cca3plusName = await fetch(
    `https://restcountries.com/v3.1/all?fields=cca3,name`
  );
  const arrayCca3NamePreviuos = await cca3plusName.json();
  const objetoNameCCA3 = {};
  arrayCca3NamePreviuos.forEach((item) => {
    objetoNameCCA3[item.cca3] = item.name.common;
  });
  const objetoPais = data[0];
  const preparedData = {
    nativeName: Object.values(objetoPais.name.nativeName).map(
      (item) => item.common
    ),
    flags: objetoPais.flags ? objetoPais.flags.svg : "",
    region: objetoPais.region,
    subregion: objetoPais.subregion,
    capital: objetoPais.capital,
    population: objetoPais.population,
    tld: objetoPais.tld,
    languages: Object.values(objetoPais.languages),
    currencies: Object.values(objetoPais.currencies).map(
      (currency) => currency.name
    ),
    borderCountries: objetoPais.borders.map((pais) => objetoNameCCA3[pais]),
  };

  return {
    props: {
      data: preparedData,
    },
  };
}

const Contenedor = styled.div`
  display: flex;
  margin-top: 50px;
  flex-direction: column;
  justify-content: space-between;

  .contenedorImagen {
    width: 100%;
    img {
      width: 100%;
      height: 82%;
    }
  }
  .contenedorContenido {
    color: ${(props) => props.theme.textColor};
    padding-top: 47px;
    width: 100%;
    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }

  @media (min-width: 530px) {
    margin-top: 126px;
    .contenedorContenido {
      h2 {
        font-size: 43px;
      }
    }
  }

  @media (min-width: 870px) {
    flex-direction: row;
    margin-top: 79px;
    .contenedorImagen {
      width: 43.5%;
    }

    .contenedorContenido {
      padding-top: 17px;
      width: 45.4%;
    }
    h2 {
      font-size: 31px;
    }
  }
`;

const Columnas = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8%;
  font-size: 16px;
  .columna {
    width: 100%;
  }
  .titulo {
    font-weight: 600;
  }
  @media (min-width: 530px) {
    font-size: 29px;
  }
  @media (min-width: 870px) {
    flex-direction: row;
    font-size: 1rem;
    .columna {
      width: 45%;
    }
  }
`;

const ButtonBack = styled.button`
  background-color: ${(props) => props.theme.backgroundColorElements};
  color: ${(props) => props.theme.textColor};
  border: none;
  cursor: pointer;

  box-shadow: 0px 0px 5px 0px black;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  border-radius: 5px;
  width: 100px;
  padding-block: 16px;
  font-size: 16px;
  span {
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  @media (min-width: 530px) {
    font-size: 28px;
    width: 206px;

    span {
      font-size: 28px;
    }
  }

  @media (min-width: 870px) {
    font-size: 1rem;
    width: 136px;
    padding-block: 7px;
  }
`;

const ContenedorPagina = styled.div`
  padding-block: 78px;
  padding-inline: 24px;
  @media (min-width: 870px) {
    padding-inline: 0px;
    padding-block: 85px;
  }
`;

const ContenedorPaisesBorder = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  font-size: 16px;
  .PaisBorder {
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.backgroundColorElements};
    padding: 5px 21px;
    display: flex;
    align-items: center;
  }
  .titulo {
    font-weight: 600;
  }
  @media (min-width: 530px) {
    font-size: 29px;
  }
  @media (min-width: 870px) {
    font-size: 1rem;
  }
`;

export default function Blog({ data }) {
  const router = useRouter();

  return (
    <>
      <ContenedorPagina>
        <Link href="/">
          <ButtonBack>
            <span>
              <FaArrowLeftLong />
            </span>
            Back
          </ButtonBack>
        </Link>

        <Contenedor>
          <div className="contenedorImagen">
            <Image
              src={data.flags}
              alt={`${router.query.name} flag`}
              width={300}
              height={300}
            />
          </div>

          <div className="contenedorContenido">
            <h2>{router.query.name}</h2>
            <Columnas>
              <div className="columna">
                <p>
                  <span className="titulo">Native Name:</span>{" "}
                  {data.nativeName.length > 1
                    ? [...new Set(data.nativeName)].join(", ")
                    : data.nativeName}
                </p>
                <p>
                  <span className="titulo">Population:</span>{" "}
                  {data.population.toLocaleString()}
                </p>
                <p>
                  <span className="titulo">Region:</span> {data.region}
                </p>
                <p>
                  <span className="titulo">Sub Region:</span> {data.subregion}
                </p>
                <p>
                  <span className="titulo">Capital:</span> {data.capital}
                </p>
              </div>
              <div className="columna">
                <p>
                  <span className="titulo">Top Level Domain:</span>{" "}
                  {data.tld.join(", ")}
                </p>
                <p>
                  <span className="titulo">Currencies:</span> {data.currencies}
                </p>
                <p>
                  <span className="titulo">Languages:</span>{" "}
                  {data.languages.length > 1
                    ? data.languages.join(", ")
                    : data.languages}
                </p>
              </div>
            </Columnas>

            <ContenedorPaisesBorder>
              <span className="titulo">Border Countries:</span>{" "}
              {data.borderCountries.length > 0
                ? data.borderCountries.map((pais) => (
                    <span className="PaisBorder" key={pais}>
                      {" "}
                      {pais}{" "}
                    </span>
                  ))
                : "None"}
            </ContenedorPaisesBorder>
          </div>
        </Contenedor>
      </ContenedorPagina>
    </>
  );
}
