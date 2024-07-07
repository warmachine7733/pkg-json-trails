export const versionComparison = (curr, latest) => {
    let versionDetails = {
      color: null,
      value: null,
    };
    let str = curr;
    if (curr.charAt(0) === "^") {
      str = str.substring(1, str.length);
    }
    const currVerCat = str.split(".");
    const latestVerCat = latest.split(".");
    if (parseInt(currVerCat[0]) < parseInt(latestVerCat[0])) {
      versionDetails = {
        color: "red",
        value: "Major",
      };
    } else if (parseInt(currVerCat[1]) < parseInt(latestVerCat[1])) {
      versionDetails = {
        color: "orange",
        value: "Minor",
      };
    } else if (parseInt(currVerCat[2]) < parseInt(latestVerCat[2])) {
      versionDetails = {
        color: "yellow",
        value: "Patch",
      };
    } else {
      versionDetails = {
        color: "primary",
        value: "Latest",
      };
    }
    return versionDetails;
  };