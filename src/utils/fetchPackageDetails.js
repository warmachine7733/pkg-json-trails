const scanGroup = async (dependencies = {}, versionComparison, onProgress, failedPackages) => {
  const total = Object.keys(dependencies).length;
  let completed = 0;
  const entries = await Promise.all(
    Object.entries(dependencies).map(async ([name, currentVersion]) => {
      try {
        const response = await fetch(
          `https://registry.npmjs.org/${encodeURIComponent(name)}`
        );
        if (!response.ok) throw new Error(`Registry returned ${response.status}`);

        const packageData = await response.json();
        const latestVersion = packageData["dist-tags"]?.latest;
        if (!latestVersion) throw new Error("No stable release found");

        return [name, {
          pkgName: name,
          pkgCurrVer: currentVersion,
          pkgNewVer: latestVersion,
          pkgDependencies: packageData.versions?.[latestVersion]?.dependencies,
          versionDetails: versionComparison(currentVersion, latestVersion),
        }];
      } catch (error) {
        failedPackages.push(name);
        return [name, {
          pkgName: name,
          pkgCurrVer: currentVersion,
          pkgNewVer: null,
          pkgDependencies: null,
          error: true,
          versionDetails: { color: "gray", value: "Unavailable" },
        }];
      } finally {
        completed += 1;
        onProgress?.(completed, total);
      }
    })
  );

  return Object.fromEntries(entries);
};

export const fetchPackageDetails = async ({ pkgData, trackerStatus, versionComparison, onProgress }) => {
  const failedPackages = [];
  const dependencyCount = Object.keys(pkgData.dependencies || {}).length;
  const devDependencyCount = trackerStatus ? Object.keys(pkgData.devDependencies || {}).length : 0;
  const total = dependencyCount + devDependencyCount;
  let completed = 0;
  const updateProgress = (groupCompleted, groupTotal) => {
    completed += 1;
    onProgress?.(completed, total);
  };
  const dependencies = await scanGroup(pkgData.dependencies, versionComparison, updateProgress, failedPackages);
  const devDependencies = trackerStatus
    ? await scanGroup(pkgData.devDependencies, versionComparison, updateProgress, failedPackages)
    : {};

  return { dependencies, devDependencies, failedPackages };
};
