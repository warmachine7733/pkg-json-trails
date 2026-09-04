import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { Section, ResultsHeader, ResultsTitle, ResultsMeta, BackLink, Status, ErrorStatus, ProgressTrack, ProgressValue, SummaryGrid, SummaryCard, SummaryValue, SummaryLabel, Toolbar, SearchInput, RetryButton, EmailPanel, EmailIntro, EmailTitle, EmailHint, EmailRow, EmailInput, EmailButton, ExportButton } from "../assets/Comparison.styled";
import { versionComparison } from "../utils/versionComparision";
import { VersionInfo } from "./VersionInfo";
import { TableData } from "./TableData";
import { sortAlpha } from "../utils/sortAlpha";
import { UseFetchPackages } from "../api/UseFetchPackages";

function Comparison() {
  const location = useLocation();
  const [sortedAlpha, setToggleAlphaSort] = useState(false);
  const [pkgData] = useState(() => JSON.parse(location.state.fileData));
  const [trackerStatus, setTrackerStatus] = useState(
    location.state?.trackerStatus ?? false
  );
  const [comparisonData, setComparisonData] = useState(null);
  const [comparisonDataD, setComparisonDataD] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [scanProgress, setScanProgress] = useState(0);
  const [emailAddress, setEmailAddress] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);

  const loadExistingData = () => {
    let mappedData = {};
    for (let item in pkgData.dependencies || {}) {
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
      for (let item in pkgData.devDependencies || {}) {
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
  };

  const filterByVersion = (selectedVersion) => {
    setSelectedFilter(selectedVersion === "All" ? null : selectedVersion);
  };

  useEffect(() => {
    loadExistingData();
  }, [pkgData]);

  const { isPending, error, data: scanResult, refetch } = UseFetchPackages({
    pkgData,
    setComparisonData,
    setComparisonDataD,
    trackerStatus,
    versionComparison,
    onProgress: (completed, total) => setScanProgress(total ? Math.round((completed / total) * 100) : 100),
  });

  useEffect(() => {
    if (scanResult) setScanProgress(100);
  }, [scanResult]);

  const applyFilters = (data) => Object.fromEntries(
    Object.entries(data || {}).filter(([name, item]) => {
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVersion = !selectedFilter || item.versionDetails?.value === selectedFilter;
      return matchesSearch && matchesVersion;
    })
  );

  const calculatedDepData = useMemo(() => applyFilters(comparisonData), [comparisonData, searchTerm, selectedFilter]);
  const calculatedDevDepData = useMemo(() => applyFilters(comparisonDataD), [comparisonDataD, searchTerm, selectedFilter]);
  const allItems = [...Object.values(comparisonData || {}), ...Object.values(comparisonDataD || {})];
  const counts = allItems.reduce((result, item) => {
    const category = item.versionDetails?.value;
    if (category) result[category] = (result[category] || 0) + 1;
    result.All += 1;
    return result;
  }, { All: 0 });
  const failedPackages = scanResult?.failedPackages || [];
  const updatedCount = allItems.filter((item) => ["Major", "Minor", "Patch"].includes(item.versionDetails?.value)).length;
  const reportText = [
    "Package Tracker report",
    "",
    ...allItems.map((item) => `${item.pkgName}: ${item.pkgCurrVer} -> ${item.pkgNewVer || "Unavailable"} (${item.versionDetails?.value || "Pending"})`),
  ].join("\n");
  const exportReport = () => {
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "package-tracker-report.txt";
    link.click();
    URL.revokeObjectURL(url);
  };
  const emailReport = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setEmailMessage("Enter a valid email address.");
      return;
    }
    const subject = `Package report: ${updatedCount} update${updatedCount === 1 ? "" : "s"} available`;
    window.location.href = `mailto:${encodeURIComponent(emailAddress)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(reportText)}`;
    setEmailMessage("Your email app should open with the report ready to send.");
  };

  return (
    <Section>
      <ResultsHeader>
        <div>
          <ResultsTitle>Dependency report</ResultsTitle>
          <ResultsMeta>{Object.keys(pkgData.dependencies || {}).length} dependencies{trackerStatus ? ` + ${Object.keys(pkgData.devDependencies || {}).length} dev dependencies` : ""}</ResultsMeta>
        </div>
        <BackLink to="/">New scan</BackLink>
      </ResultsHeader>
      {isPending && <Status>Checking the npm registry... {scanProgress}% complete<ProgressTrack><ProgressValue $value={scanProgress} /></ProgressTrack></Status>}
      {error && <ErrorStatus>Could not complete the scan. <RetryButton onClick={() => { setScanProgress(0); refetch(); }}>Try again</RetryButton></ErrorStatus>}
      {!!failedPackages.length && <ErrorStatus>{failedPackages.length} package{failedPackages.length === 1 ? "" : "s"} could not be found. <RetryButton onClick={() => { setScanProgress(0); refetch(); }}>Retry scan</RetryButton></ErrorStatus>}
      <SummaryGrid>
        <SummaryCard><SummaryValue>{counts.All}</SummaryValue><SummaryLabel>Packages scanned</SummaryLabel></SummaryCard>
        <SummaryCard><SummaryValue $color="#d95757">{counts.Major || 0}</SummaryValue><SummaryLabel>Major updates</SummaryLabel></SummaryCard>
        <SummaryCard><SummaryValue $color="#db8b35">{(counts.Minor || 0) + (counts.Patch || 0)}</SummaryValue><SummaryLabel>Minor or patch</SummaryLabel></SummaryCard>
        <SummaryCard><SummaryValue $color="#45c892">{counts.Latest || 0}</SummaryValue><SummaryLabel>Already current</SummaryLabel></SummaryCard>
      </SummaryGrid>
      <Toolbar>
        <SearchInput aria-label="Search packages" placeholder="Search packages..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <ResultsMeta>{updatedCount} package{updatedCount === 1 ? "" : "s"} can be updated</ResultsMeta>
        <ExportButton onClick={exportReport}>Download report</ExportButton>
        <ExportButton onClick={() => setEmailOpen((open) => !open)}>{emailOpen ? "Hide email" : "Email report"}</ExportButton>
      </Toolbar>
      {emailOpen && (
        <EmailPanel>
          <EmailIntro>
            <EmailTitle>Send this report</EmailTitle>
            <EmailHint>Prepare the report in your default email app. No account setup is needed here.</EmailHint>
          </EmailIntro>
          <EmailRow>
            <EmailInput type="email" aria-label="Report email address" placeholder="name@company.com" value={emailAddress} onChange={(event) => { setEmailAddress(event.target.value); setEmailMessage(""); }} />
            <EmailButton onClick={emailReport}>Open email</EmailButton>
          </EmailRow>
          {emailMessage && <ResultsMeta role="status">{emailMessage}</ResultsMeta>}
        </EmailPanel>
      )}
      <VersionInfo filterByVersion={filterByVersion} selectedFilter={selectedFilter} counts={counts} />
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
    </Section>
  );
}

export default Comparison;
