import { styled } from "styled-components";
import { colors } from "../utils/constants";
import { AiOutlineSortAscending, AiOutlineSortDescending } from "react-icons/ai";
import { Link } from "react-router-dom";

const Section = styled.section`width: min(100% - 2rem, 72rem); margin: 0 auto; padding: 2rem 0 4rem;`;
const ResultsHeader = styled.div`display: flex; justify-content: space-between; gap: 1rem; align-items: end; margin-bottom: 1.25rem; @media (max-width: 560px) { align-items: start; flex-direction: column; }`;
const ResultsTitle = styled.h2`color: ${colors.ink}; font-size: clamp(1.7rem, 4vw, 2.6rem); letter-spacing: -0.04em;`;
const ResultsMeta = styled.p`margin-top: 0.3rem; color: ${colors.muted}; font-size: 0.9rem;`;
const BackLink = styled(Link)`color: ${colors.darkGray}; font-size: 0.85rem; font-weight: 800; text-decoration: none; &:hover { color: ${colors.primaryDark}; }`;
const Status = styled.p`margin: 1rem 0; padding: 0.8rem 1rem; border-radius: 0.6rem; color: ${colors.muted}; background: ${colors.primarySoft}; font-size: 0.9rem;`;
const ErrorStatus = styled(Status)`color: ${colors.error}; background: #fae8e6;`;
const ProgressTrack = styled.div`height: 0.35rem; overflow: hidden; margin: 0.75rem 0 1.25rem; border-radius: 1rem; background: ${colors.line};`;
const ProgressValue = styled.div`width: ${(props) => `${props.$value}%`}; height: 100%; border-radius: inherit; background: ${colors.primaryDark}; transition: width 200ms ease;`;
const SummaryGrid = styled.div`display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.75rem; margin-bottom: 1.5rem; @media (max-width: 720px) { grid-template-columns: repeat(2, 1fr); }`;
const SummaryCard = styled.div`padding: 1rem; border: 1px solid ${colors.line}; border-radius: 0.8rem; background: ${colors.surface};`;
const SummaryValue = styled.strong`display: block; color: ${(props) => props.$color || colors.ink}; font-size: 1.6rem; line-height: 1;`;
const SummaryLabel = styled.span`display: block; margin-top: 0.45rem; color: ${colors.muted}; font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;`;
const Toolbar = styled.div`display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;`;
const SearchInput = styled.input`flex: 1 1 14rem; min-width: 12rem; padding: 0.75rem 0.9rem; border: 1px solid ${colors.lineStrong}; border-radius: 0.6rem; color: ${colors.ink}; background: ${colors.surface}; font: inherit; &:focus { outline: 3px solid ${colors.accent}; outline-offset: 2px; }`;
const FilterBar = styled.div`display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem;`;
const FilterButton = styled.button`border: 1px solid ${(props) => props.$active ? colors.ink : colors.line}; border-radius: 2rem; padding: 0.55rem 0.8rem; color: ${(props) => props.$active ? colors.surface : colors.muted}; background: ${(props) => props.$active ? colors.ink : colors.surface}; font: inherit; font-size: 0.78rem; font-weight: 800; cursor: pointer;`;
const RetryButton = styled.button`border: 0; padding: 0; color: ${colors.error}; background: transparent; font: inherit; font-weight: 800; text-decoration: underline; cursor: pointer;`;
const EmailPanel = styled.div`margin: 1.25rem 0; padding: 1.1rem 1.25rem; border: 1px solid ${colors.line}; border-radius: 0.8rem; background: ${colors.surface};`;
const EmailIntro = styled.div`margin-bottom: 0.75rem;`;
const EmailTitle = styled.h3`color: ${colors.ink}; font-size: 0.95rem;`;
const EmailHint = styled.p`margin-top: 0.2rem; color: ${colors.muted}; font-size: 0.8rem;`;
const EmailRow = styled.div`display: flex; gap: 0.6rem; align-items: stretch; @media (max-width: 560px) { flex-direction: column; }`;
const EmailInput = styled.input`flex: 1; min-width: 0; padding: 0.78rem 0.9rem; border: 1px solid ${colors.lineStrong}; border-radius: 0.55rem; color: ${colors.ink}; background: ${colors.canvas}; font: inherit; &:focus { outline: 3px solid ${colors.accent}; outline-offset: 2px; }`;
const EmailButton = styled.button`border: 0; border-radius: 0.55rem; padding: 0.78rem 1.1rem; color: ${colors.white}; background: ${colors.primaryDark}; font: inherit; font-weight: 800; cursor: pointer; transition: background 160ms ease, transform 160ms ease; &:hover { background: ${colors.primary}; transform: translateY(-1px); } &:focus-visible { outline: 3px solid ${colors.accent}; outline-offset: 2px; }`;
const ExportButton = styled.button`border: 1px solid ${colors.lineStrong}; border-radius: 0.55rem; padding: 0.7rem 0.9rem; color: ${colors.ink}; background: ${colors.surface}; font: inherit; font-weight: 800; cursor: pointer;`;
const StatusBadge = styled.span`display: inline-block; margin-left: 0.5rem; border-radius: 999px; padding: 0.25rem 0.5rem; color: ${(props) => colors[props.$color] || colors.muted}; background: ${(props) => props.$color === "red" ? "#f8dfdd" : props.$color === "orange" ? "#f7eadb" : props.$color === "yellow" ? "#eef0d9" : props.$color === "primary" ? colors.primarySoft : "#e7edeb"}; font-size: 0.7rem; font-weight: 800;`;
const TableWrapper = styled.div`overflow: auto; max-height: 65vh; border: 1px solid ${colors.line}; border-radius: 1rem; background: ${colors.surface}; box-shadow: 0 1rem 3rem rgba(32, 50, 54, 0.1);`;
const Table = styled.table`width: 100%; border-collapse: collapse; min-width: 38rem; font-size: 0.9rem;`;
const Trow = styled.tr`border-bottom: 1px solid ${colors.line}; &:last-child { border-bottom: 0; }`;
const Theader = styled.th`position: sticky; top: 0; z-index: 1; padding: 1rem 1.25rem; color: ${colors.muted}; background: ${colors.canvas}; font-size: 0.72rem; letter-spacing: 0.08em; text-align: left; text-transform: uppercase;`;
const Tcell = styled.td`padding: 1rem 1.25rem; color: ${(props) => (props.$active ? colors[props.$active] : colors.ink)}; font-weight: ${(props) => (props.$collapse ? 800 : 500)}; &:not(:first-child) { background: ${colors.surface}; }`;
const StickyHead = styled.thead``;
const StickySubHead = styled(Tcell)`padding: 0.65rem 1.25rem; color: ${colors.darkGray}; background: ${colors.primarySoft} !important; font-size: 0.75rem; letter-spacing: 0.08em; text-transform: uppercase;`;
const Loader = styled.span`display: inline-block; width: 0.9rem; height: 0.9rem; border: 2px solid ${colors.primary}; border-right-color: transparent; border-radius: 50%; animation: spin 700ms linear infinite; @keyframes spin { to { transform: rotate(360deg); } }`;
const StyledAsc = styled(AiOutlineSortAscending)`margin-right: 0.3rem; vertical-align: -0.2rem; font-size: 1.1rem;`;
const StyledDsc = styled(AiOutlineSortDescending)`margin-right: 0.3rem; vertical-align: -0.2rem; font-size: 1.1rem;`;
const StyledThCellOne = styled.span``;
const StyledLink = styled(Link)`color: ${colors.ink}; font-weight: 800; text-decoration: none; &:hover { color: ${colors.primaryDark}; }`;
const Legends = styled.ul`display: flex; flex-wrap: wrap; gap: 1.2rem; margin: 1.25rem 0 0 1rem;`;
const LegendsItem = styled.li`
  position: relative; color: ${colors.muted}; font-size: 0.8rem; font-weight: 700; cursor: pointer;
  &:before { content: ""; position: absolute; left: -1rem; top: 0.2rem; width: 0.55rem; height: 0.55rem; border-radius: 50%; background: ${colors.gray}; }
  &:nth-child(1):before { background: ${colors.primaryDark}; } &:nth-child(2):before { background: ${colors.yellow}; }
  &:nth-child(3):before { background: ${colors.orange}; } &:nth-child(4):before { background: ${colors.red}; }
`;

export { Section, ResultsHeader, ResultsTitle, ResultsMeta, BackLink, Status, ErrorStatus, ProgressTrack, ProgressValue, SummaryGrid, SummaryCard, SummaryValue, SummaryLabel, Toolbar, SearchInput, FilterBar, FilterButton, RetryButton, EmailPanel, EmailIntro, EmailTitle, EmailHint, EmailRow, EmailInput, EmailButton, ExportButton, StatusBadge, StickyHead, StickySubHead, StyledAsc, StyledDsc, StyledThCellOne, StyledLink, TableWrapper, Table, Trow, Theader, Tcell, Loader, Legends, LegendsItem };