import { styled } from "styled-components";

import { colors } from "../utils/constants";

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const TableWrapper = styled.div`
  height: 65vh;
  overflow-y: scroll;
  background-color: white;
`;

const Table = styled.table`
  border: 0;
  border-collapse: collapse;
  padding: 1rem;
  background-color: #fafafa;
  font-size: 0.875rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
`;

const Trow = styled.tr`
  border-bottom: 1px solid ${colors.lightestGray};
`;

const Theader = styled.th`
  padding: 1.5rem 3rem;
  text-align: left;
  text-transform: uppercase;
`;

const Tcell = styled.td`
  padding: ${(props) => (props.$collapse ? "0.75rem 3rem" : "1.5rem 3rem")};
  color: ${(props) => (props.$active ? colors[props.$active] : "inherit")};
  font-weight: ${(props) => (props.$collapse ? "600" : "inherit")};

  &:not(:nth-child(1)) {
    background-color: ${colors.white};
  }
`;

const Loader = styled.span`
  @media (prefers-reduced-motion: no-preference) {
    animation: Spin infinite 2s linear;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 2px solid ${colors.primary};
    border-bottom-color: transparent;
    display: inline-block;
  }

  @keyframes Spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Legends = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  gap: 5rem;
`;

const LegendsItem = styled.li`
  position: relative;
  font-size: 0.875rem;
  color: ${colors.darkerGray};
  cursor: pointer;
  &:nth-child(n) {
    &:before {
      content: "";
      position: absolute;
      left: -1.5rem;
      top: 0.025rem;
      width: 1rem;
      height: 1rem;
    }
  }

  &:nth-child(1) {
    color: ${colors.primary};

    &:before {
      background-color: ${colors.primary};
    }
    &:checked {
      border: 1px solid;
    }
  }

  &:nth-child(2) {
    color: ${colors.yellow};

    &:before {
      background-color: ${colors.yellow};
    }
  }

  &:nth-child(3) {
    color: ${colors.orange};

    &:before {
      background-color: ${colors.orange};
    }
  }

  &:nth-child(4) {
    color: ${colors.red};

    &:before {
      background-color: ${colors.red};
    }
  }
  &:nth-child(5) {
    color: ${colors.gray};

    &:before {
      background-color: ${colors.gray};
    }
  }
`;

const StickyHead = styled.thead`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10 !important;
`;

const StyledAsc = styled(AiOutlineSortAscending)`
  margin-right: 0.4rem;
  font-size: 20px;
`;
const StyledDsc = styled(AiOutlineSortDescending)`
  margin-right: 0.4rem;
  font-size: 20px;
`;

const StyledThCellOne = styled.span`
  position: relative;
  top: -3px;
`;

const StickySubHead = styled(Tcell)`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10 !important;
  top: 63px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3e3e97;
`;

export {
  Section,
  StickyHead,
  StickySubHead,
  StyledAsc,
  StyledDsc,
  StyledThCellOne,
  StyledLink,
  TableWrapper,
  Table,
  Trow,
  Theader,
  Tcell,
  Loader,
  Legends,
  LegendsItem,
};
