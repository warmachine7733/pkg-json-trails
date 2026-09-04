import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPackageDetails } from "../utils/fetchPackageDetails";

export const UseFetchPackages = ({
  pkgData,
  setComparisonData,
  setComparisonDataD,
  trackerStatus,
  versionComparison,
  onProgress,
}) => {
  const query = useQuery({
    queryKey: ["fetchPackageData", pkgData, trackerStatus],
    queryFn: () => fetchPackageDetails({ pkgData, trackerStatus, versionComparison, onProgress }),
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (query.data) {
      const { dependencies, devDependencies } = query.data;
      setComparisonData(dependencies);
      setComparisonDataD(devDependencies);
    }
  }, [query.data, setComparisonData, setComparisonDataD]);

  return query;
};
