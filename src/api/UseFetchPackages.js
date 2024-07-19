import { useQuery } from "@tanstack/react-query";
import { fetchPackageDetails } from "../utils/fetchPackageDetails";

export const UseFetchPackages = ({
  pkgData,
  setComparisonData,
  setComparisonDataD,
  trackerStatus,
  versionComparison,
}) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchPackageData"],
    staleTime: Infinity,
    queryFn: async () =>
      await fetchPackageDetails({
        pkgData,
        setComparisonData,
        setComparisonDataD,
        trackerStatus,
        versionComparison,
      }),
  });
};
