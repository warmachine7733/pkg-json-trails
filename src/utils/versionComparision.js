export const versionComparison = (curr, latest) => {
  const parseVersion = (version) => {
    const match = String(version || "").match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?/);
    return match ? [Number(match[1]), Number(match[2] || 0), Number(match[3] || 0)] : null;
  };

  const current = parseVersion(curr);
  const newest = parseVersion(latest);

  if (!current || !newest) {
    return { color: "gray", value: "Unavailable" };
  }

  if (current[0] < newest[0]) return { color: "red", value: "Major" };
  if (current[0] === newest[0] && current[1] < newest[1]) {
    return { color: "orange", value: "Minor" };
  }
  if (
    current[0] === newest[0] &&
    current[1] === newest[1] &&
    current[2] < newest[2]
  ) {
    return { color: "yellow", value: "Patch" };
  }

  return { color: "primary", value: "Latest" };
};