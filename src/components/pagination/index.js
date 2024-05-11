import styled from "styled-components";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

const ContenedorPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding-bottom: 50px;
`;

const Page = styled.a`
  padding: 5px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  background-color: ${(props) => {
    return props.$pageselected ? "black" : "transparent";
  }};
  color: ${(props) => {
    return props.$pageselected ? "white" : props.theme.textColor;
  }};
`;
export default function Pagination({
  cantidadElementosPorPagina,
  length,
  pageSelected,
  setPageSelected,
  pageInitial,
  handlePageInitial,
}) {
  const cantidadPaginas = Math.ceil(length / cantidadElementosPorPagina);

  const handlePageSelected = (page) => {
    setPageSelected(page);
  };
  const handleNextPagitation = () => {
    if (pageInitial + 3 <= cantidadPaginas) {
      setPageSelected(pageInitial + 3);
      handlePageInitial(pageInitial + 3);
    }
  };
  const handlePreviousPagitation = () => {
    if (pageInitial - 3 > 0) {
      setPageSelected(pageInitial - 3);
      handlePageInitial(pageInitial - 3);
    }
  };
  return (
    <ContenedorPagination>
      {pageInitial !== 1 && (
        <Page onClick={handlePreviousPagitation}>
          <MdOutlineKeyboardDoubleArrowLeft />
        </Page>
      )}

      <Page
        onClick={() => handlePageSelected(pageInitial)}
        $pageselected={pageInitial === pageSelected}
      >
        {pageInitial}
      </Page>
      {cantidadPaginas >= pageInitial + 1 && (
        <Page
          onClick={() => handlePageSelected(pageInitial + 1)}
          $pageselected={pageInitial + 1 === pageSelected}
        >
          {pageInitial + 1}
        </Page>
      )}
      {cantidadPaginas >= pageInitial + 2 && (
        <Page
          onClick={() => handlePageSelected(pageInitial + 2)}
          $pageselected={pageInitial + 2 === pageSelected}
        >
          {pageInitial + 2}
        </Page>
      )}
      {cantidadPaginas >= pageInitial + 3 && (
        <Page
          onClick={() => handlePageSelected(pageInitial + 3)}
          $pageselected={pageInitial + 3 === pageSelected}
        >
          {pageInitial + 3}
        </Page>
      )}
      {cantidadPaginas >= pageInitial + 4 && (
        <Page onClick={handleNextPagitation}>
          <MdKeyboardDoubleArrowRight />
        </Page>
      )}
    </ContenedorPagination>
  );
}
