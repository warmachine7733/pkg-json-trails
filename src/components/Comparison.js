import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Section } from "../assets/Comparison.styled";
import { versionComparison } from "../utils/versionComparision";
import { VersionInfo } from "./VersionInfo";
import { TableData } from "./TableData";
import { sortAlpha } from "../utils/sortAlpha";
import { UseFetchPackages } from "../api/UseFetchPackages";

function Comparison() {
  const location = useLocation();
  const [sortedAlpha, setToggleAlphaSort] = useState(false);
  const [pkgData, setPkgData] = useState(JSON.parse(location.state.fileData));
  const [trackerStatus, setTrackerStatus] = useState(
    JSON.parse(location.state.trackerStatus)
  );
  const [loadStatus, setLoadStatus] = useState(false);
  const [comparisonData, setComparisonData] = useState(null);
  const [comparisonDataD, setComparisonDataD] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filteredDataDev, setFilteredDataDev] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isFilteredDev, setIsFilteredDev] = useState(false);

  const loadExistingData = () => {
    let mappedData = {};
    for (let item in pkgData.dependencies) {
      mappedData = {
        ...mappedData,
        [item]: {
          pkgCurrVer: pkgData.dependencies[item],
          pkgNewVer: null,
          pkgDependencies: null,
        },
      };
    }
    setComparisonData(mappedData);

    if (trackerStatus) {
      mappedData = {};
      for (let item in pkgData.devDependencies) {
        mappedData = {
          ...mappedData,
          [item]: {
            pkgCurrVer: pkgData.devDependencies[item],
            pkgNewVer: null,
            pkgDependencies: null,
          },
        };
      }
      setComparisonDataD(mappedData);
    }
    setLoadStatus(true);
  };

  const filterByVersion = (e) => {
    const versionsType = ["Major", "Minor", "Patch", "Latest"];
    if (e.target.innerText === "All") {
      setFilteredData(comparisonData);
      setIsFiltered(false);
    } else if (versionsType.includes(e.target.innerText)) {
      const filtered = Object.values(comparisonData)
        .filter((each) => each.versionDetails.value === e.target.innerText)
        .reduce((obj, key) => {
          return {
            ...obj,
            [key.pkgName]: key,
          };
        }, {});
      setFilteredData(filtered);
      setIsFiltered(filtered ? true : false);
    }
    if (trackerStatus) {
      if (e.target.innerText === "All") {
        setFilteredDataDev(comparisonData);
        setIsFilteredDev(false);
      } else {
        const filteredDev = Object.values(comparisonDataD)
          .filter((each) => each.versionDetails.value === e.target.innerText)
          .reduce((obj, key) => {
            return {
              ...obj,
              [key.pkgName]: key,
            };
          }, {});
        setFilteredDataDev(filteredDev);
        setIsFilteredDev(filteredDev ? true : false);
      }
    }
  };

  useEffect(() => {
    loadExistingData();
  }, [pkgData]);

  UseFetchPackages({
    pkgData,
    setComparisonData,
    setComparisonDataD,
    trackerStatus,
    versionComparison,
  });

  const calculatedDepData =
    isFiltered && filteredData ? filteredData : comparisonData;

  const calculatedDevDepData =
    isFilteredDev && filteredDataDev ? filteredDataDev : comparisonDataD;

  return (
    <Section>
      <TableData
        sortAlpha={() =>
          sortAlpha({
            sortedAlpha,
            comparisonData,
            comparisonDataD,
            setComparisonData,
            trackerStatus,
            setComparisonDataD,
            setToggleAlphaSort,
          })
        }
        sortedAlpha={sortedAlpha}
        trackerStatus={trackerStatus}
        calculatedDepData={calculatedDepData}
        calculatedDevDepData={calculatedDevDepData}
        versionComparison={versionComparison}
      />
      <VersionInfo filterByVersion={filterByVersion} isFiltered={isFiltered} />
    </Section>
  );
}

export default Comparison;
