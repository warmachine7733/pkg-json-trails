import {
  StickyHead,
  StickySubHead,
  StyledAsc,
  StyledDsc,
  StyledThCellOne,
  StyledLink,
  TableWrapper,
  Table,
  Trow,
  Theader,
  Tcell,
  Loader,
} from "../assets/Comparison.styled";
import { NPM_PACKAGE_URL } from "../constants";
export const TableData = ({
  sortAlpha,
  sortedAlpha,
  trackerStatus,
  calculatedDepData,
  comparisonDataD,
  versionComparison,
  calculatedDevDepData,
}) => {
  return (
    <TableWrapper>
      <Table>
        <StickyHead>
          <Trow>
            <Theader id="name" onClick={sortAlpha}>
              {sortedAlpha ? <StyledDsc /> : <StyledAsc />}
              <StyledThCellOne>Package Name</StyledThCellOne>
            </Theader>
            <Theader>Current Version</Theader>
            <Theader>Latest Version</Theader>
          </Trow>
        </StickyHead>
        <tbody>
          {trackerStatus ? (
            <Trow>
              <StickySubHead colSpan="3" $collapse={trackerStatus}>
                Dependencies
              </StickySubHead>
            </Trow>
          ) : null}
          {calculatedDepData &&
            Object.values(calculatedDepData).map((item, index) => {
              return (
                <Trow key={`tr_${index}`}>
                  <Tcell>
                    <StyledLink
                      to={`${NPM_PACKAGE_URL}${item.pkgName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.pkgName}
                    </StyledLink>
                  </Tcell>
                  <Tcell
                    $active={item.pkgNewVer ? item.versionDetails.color : ""}
                  >
                    {item.pkgCurrVer}
                  </Tcell>
                  <Tcell>
                    {item.pkgNewVer ? item.pkgNewVer : <Loader></Loader>}
                  </Tcell>
                </Trow>
              );
            })}
          {trackerStatus ? (
            <Trow>
              <StickySubHead colSpan="3" $collapse={trackerStatus}>
                Dev Dependencies
              </StickySubHead>
            </Trow>
          ) : null}
          {calculatedDevDepData &&
            Object.values(calculatedDevDepData).map((item, index) => {
              return (
                <Trow key={`tr_${index}`}>
                  <Tcell>{Object.keys(calculatedDevDepData)[index]}</Tcell>
                  <Tcell
                    $active={item.pkgNewVer ? item.versionDetails.color : ""}
                  >
                    {item.pkgCurrVer}
                  </Tcell>
                  <Tcell>
                    {item.pkgNewVer ? item.pkgNewVer : <Loader></Loader>}
                  </Tcell>
                </Trow>
              );
            })}
        </tbody>
      </Table>
    </TableWrapper>
  );
};
