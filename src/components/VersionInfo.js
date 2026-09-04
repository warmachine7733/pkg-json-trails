import { FilterBar, FilterButton } from "../assets/Comparison.styled";

export const VersionInfo = ({ filterByVersion, selectedFilter, counts }) => {
  return (
    <FilterBar>
      {['All', 'Major', 'Minor', 'Patch', 'Latest'].map((version) => (
        <FilterButton key={version} $active={(selectedFilter || 'All') === version} onClick={() => filterByVersion(version)}>
          {version} {counts[version] !== undefined ? `· ${counts[version]}` : ''}
        </FilterButton>
      ))}
    </FilterBar>
  );
};
