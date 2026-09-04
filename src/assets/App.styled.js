import { styled } from "styled-components";
import { colors } from "../utils/constants";

const Section = styled.section`
  width: min(100% - 2rem, 54rem);
  margin: 0 auto;
  padding: 3rem 0 5rem;
`;
const Intro = styled.div`max-width: 42rem; margin-bottom: 2rem;`;
const Eyebrow = styled.p`
  margin-bottom: 0.75rem; color: ${colors.primaryDark}; font-size: 0.75rem;
  font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase;
`;
const Heading = styled.h2`
  max-width: 38rem; margin-bottom: 0.9rem; color: ${colors.ink};
  font-size: clamp(2.4rem, 7vw, 5.4rem); line-height: 0.98; letter-spacing: -0.06em;
`;
const Description = styled.p`max-width: 36rem; color: ${colors.muted}; font-size: 1.05rem;`;
const ScanCard = styled.div`
  padding: clamp(1rem, 4vw, 2rem); border: 1px solid ${colors.line}; border-radius: 1.25rem;
  background: ${colors.surface}; box-shadow: 0 1.5rem 4rem rgba(32, 50, 54, 0.1);
`;
const Button = styled.button`
  border: 0; border-radius: 0.7rem; padding: 0.9rem 1.2rem; color: ${colors.ink};
  background: ${colors.primary}; font: inherit; font-weight: 800; cursor: pointer;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
  &:hover { background: ${colors.primaryDark}; box-shadow: 0 0.75rem 1.5rem rgba(0, 0, 0, 0.25); transform: translateY(-2px); }
  &:focus-visible { outline: 3px solid ${colors.accent}; outline-offset: 3px; }
`;
const ActionRow = styled.div`display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center;`;
const UploadButton = styled(Button)`
  position: relative; overflow: hidden; color: ${colors.surface}; background: ${colors.ink};
  &:hover { background: ${colors.inkSoft}; }
`;
const Upload = styled.input`position: absolute; inset: 0; width: 100%; opacity: 0; cursor: pointer;`;
const Text = styled.span`color: ${colors.faint}; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;`;
const PasteButton = styled(Button)`color: ${colors.ink}; background: ${colors.primarySoft};`;
const Label = styled.label`display: inline-flex; gap: 0.7rem; align-items: center; margin-top: 1.35rem; color: ${colors.muted}; font-size: 0.9rem; cursor: pointer;`;
const LabelText = styled.span``;
const CheckboxContainer = styled.span`position: relative; display: inline-flex;`;
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`position: absolute; width: 1px; height: 1px; opacity: 0;`;
const Icon = styled.svg`fill: none; stroke: ${colors.ink}; stroke-width: 3px;`;
const StyledCheckbox = styled.span`
  display: inline-grid; width: 1.3rem; height: 1.3rem; place-items: center;
  border: 1px solid ${colors.lineStrong}; border-radius: 0.35rem;
  background: ${(props) => (props.checked ? colors.primary : colors.surface)};
  ${Icon} { width: 0.85rem; visibility: ${(props) => (props.checked ? "visible" : "hidden")}; }
  ${HiddenCheckbox}:focus + & { outline: 3px solid ${colors.accent}; outline-offset: 2px; }
`;
const PasteBoxArea = styled.div`margin-top: 1.5rem;`;
const PasteBox = styled.textarea`
  display: block; width: 100%; min-height: 16rem; box-sizing: border-box; resize: vertical;
  padding: 1rem; border: 1px solid ${colors.lineStrong}; border-radius: 0.75rem;
  color: ${colors.ink}; background: ${colors.canvas}; font: 0.9rem/1.6 ui-monospace, SFMono-Regular, Menlo, monospace;
  &:focus { outline: 3px solid ${colors.accent}; outline-offset: 2px; border-color: ${colors.primary}; }
`;
const PasteConfirmButton = styled(Button)`margin-top: 0.8rem;`;
const ErrorMessage = styled.p`margin-top: 1rem; color: ${colors.error}; font-size: 0.9rem; font-weight: 700;`;

export {
  Section, Intro, Eyebrow, Heading, Description, ScanCard, ActionRow, UploadButton, Upload,
  Text, PasteButton, Label, LabelText, CheckboxContainer, HiddenCheckbox, StyledCheckbox,
  Icon, PasteBoxArea, PasteBox, PasteConfirmButton, ErrorMessage,
};