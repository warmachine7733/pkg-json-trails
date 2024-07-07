import { Legends, LegendsItem } from "../assets/Comparison.styled";

export const VersionInfo = ({ filterByVersion, isFiltered }) => {
  return (
    <Legends onClick={filterByVersion}>
      <LegendsItem>Latest</LegendsItem>
      <LegendsItem>Patch</LegendsItem>
      <LegendsItem>Minor</LegendsItem>
      <LegendsItem>Major</LegendsItem>
      {isFiltered && <LegendsItem value="All">All</LegendsItem>}
    </Legends>
  );
};
