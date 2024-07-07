export const sortAlpha = ({
  sortedAlpha,
  comparisonData,
  comparisonDataD,
  setComparisonData,
  trackerStatus,
  setComparisonDataD,
  setToggleAlphaSort,
}) => {
  const updateSortDependencies = sortedAlpha
    ? Object.keys(comparisonData).sort()
    : Object.keys(comparisonData).sort().reverse();

  const sortedDependencies = updateSortDependencies.reduce((obj, key) => {
    obj[key] = comparisonData[key];
    return obj;
  }, {});

  setComparisonData(sortedDependencies);

  if (trackerStatus) {
    const updateSortDevDependencies = sortedAlpha
      ? Object.keys(comparisonDataD).sort()
      : Object.keys(comparisonDataD).sort().reverse();

    const sortedDevDependencies = updateSortDevDependencies.reduce(
      (obj, key) => {
        obj[key] = comparisonDataD[key];
        return obj;
      },
      {}
    );

    setComparisonDataD(sortedDevDependencies);
  }
  setToggleAlphaSort(!sortedAlpha);
};
