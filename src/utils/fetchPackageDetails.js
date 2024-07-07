export const fetchPackageDetails = async ({
  pkgData,
  setComparisonData,
  setComparisonDataD,
  trackerStatus,
  versionComparison,
}) => {
  for (let item in pkgData.dependencies) {
    try {
      const endpoint = `https://registry.npmjs.org/${item}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      const versions = data.versions;
      const versionsData = Object.values(versions);
      let latestVersion = versionsData.pop();

      if (latestVersion.version.includes("-")) {
        for (let i = versionsData.length - 1; i > 0; i--) {
          if (!versionsData[i].version.includes("-")) {
            latestVersion = versionsData[i];
            break;
          }
        }
      }

      setComparisonData((prevData) => ({
        ...prevData,
        [latestVersion.name]: {
          ...prevData[latestVersion.name],
          pkgName: latestVersion.name,
          pkgNewVer: latestVersion.version,
          pkgDependencies: latestVersion.dependencies,
          versionDetails: {
            ...versionComparison(
              prevData[item].pkgCurrVer,
              latestVersion.version
            ),
          },
        },
      }));
    } catch (error) {
      setComparisonData((prevData) => ({
        ...prevData,
        [item]: {
          pkgName: prevData[item].name,
          pkgNewVer: prevData[item].pkgCurrVer,
          pkgCurrVer: prevData[item].pkgCurrVer,
          versionDetails: {
            ...versionComparison(
              prevData[item].pkgCurrVer,
              prevData[item].pkgCurrVer
            ),
          },
        },
      }));
    }
  }

  if (trackerStatus) {
    for (let item in pkgData.devDependencies) {
      try {
        const endpoint = `https://registry.npmjs.org/${item}`;
        const res = await fetch(endpoint);
        const data = await res.json();
        const versions = data.versions;
        const versionsData = Object.values(versions);
        let latestVersion = versionsData.pop();

        if (latestVersion.version.includes("-")) {
          for (let i = versionsData.length - 1; i > 0; i--) {
            if (!versionsData[i].version.includes("-")) {
              latestVersion = versionsData[i];
              break;
            }
          }
        }

        setComparisonDataD((prevData) => ({
          ...prevData,
          [latestVersion.name]: {
            ...prevData[latestVersion.name],
            pkgName: latestVersion.name,
            pkgNewVer: latestVersion.version,
            pkgDependencies: latestVersion.dependencies,
            versionDetails: {
              ...versionComparison(
                prevData[item].pkgCurrVer,
                latestVersion.version
              ),
            },
          },
        }));
      } catch (error) {
        setComparisonData((prevData) => ({
          ...prevData,
          [item]: {
            pkgName: prevData[item].name,
            pkgNewVer: prevData[item].pkgCurrVer,
            pkgCurrVer: prevData[item].pkgCurrVer,
            versionDetails: {
              ...versionComparison(
                prevData[item].pkgCurrVer,
                prevData[item].pkgCurrVer
              ),
            },
          },
        }));
      }
    }
  }
};
