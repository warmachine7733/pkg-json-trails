import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Section, Intro, Eyebrow, Heading, Description, ScanCard, ActionRow,
  UploadButton, 
  Upload, 
  Text, 
  PasteButton, 
  Label,
  LabelText,
  CheckboxContainer,
  HiddenCheckbox,
  StyledCheckbox,
  Icon, 
  PasteBoxArea, 
  PasteBox, 
  PasteConfirmButton, ErrorMessage
} from '../assets/App.styled';

const Checkbox = ({ checked, ...props }) => {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={checked} {...props} />
      <StyledCheckbox checked={checked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  )
}

const SAMPLE_PACKAGE_JSON = `{
  "dependencies": {
    "react": "^19.0.0",
    "webpack": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}`;

function App() {
  const navigate = useNavigate();
  const [pasteBoxActive, setPasteBoxActive] = useState(false);
  const [pasteBoxData, setPasteBoxData] = useState('');
  const [trackerStatus, setTrackerStatus] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const parseFileData = (uploadedFile) => {
    if (!uploadedFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        validatePackageJson(fileReader.result);
        trackVersions(fileReader.result);
      } catch (error) {
        setErrorMessage(error.message);
      }
    }
    fileReader.readAsText(uploadedFile);
  }

  const validatePackageJson = (fileData) => {
    const packageJson = JSON.parse(fileData);
    if (!packageJson || typeof packageJson !== 'object' || (!packageJson.dependencies && !packageJson.devDependencies)) {
      throw new Error('Add dependencies or devDependencies to scan.');
    }
    return packageJson;
  };

  const trackVersions = (fileData = pasteBoxData) => {
    try {
      validatePackageJson(fileData);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message || 'Please provide valid JSON.');
      return;
    }
    navigate('/comparison', { 
      state: { trackerStatus, fileData }
    });
  };

  return (
    <Section>
      <Intro>
        <Eyebrow>Package health check</Eyebrow>
        <Heading>See what your dependencies are ready for.</Heading>
        <Description>Drop in a package.json and get a clear view of what is current, what needs attention, and what is waiting on the registry.</Description>
      </Intro>
      <ScanCard>
        <ActionRow>
          <UploadButton>Upload package.json
            <Upload type="file" accept="application/json,.json" onChange={(event) => parseFileData(event.target.files[0])} />
          </UploadButton>
          <Text>or</Text>
          <PasteButton onClick={() => { setPasteBoxActive(true); setErrorMessage(''); }}>Paste JSON</PasteButton>
          <PasteButton onClick={() => { setPasteBoxActive(true); setPasteBoxData(SAMPLE_PACKAGE_JSON); setErrorMessage(''); }}>Try sample</PasteButton>
        </ActionRow>
      <Label>
        <Checkbox
          checked={ trackerStatus }
          onChange={ () => setTrackerStatus(prevData => !prevData) }
        />
        <LabelText>Include devDependencies</LabelText>
      </Label>
      {
        pasteBoxActive && (
          <PasteBoxArea>
            <PasteBox aria-label="package.json contents" placeholder="Paste your package.json here..." value={pasteBoxData} onChange={(event) => { setPasteBoxData(event.target.value); setErrorMessage(''); }} />
            <PasteConfirmButton onClick={() => trackVersions()}>Scan dependencies</PasteConfirmButton>
          </PasteBoxArea>
        )
      }
      {errorMessage && <ErrorMessage role="alert">{errorMessage}</ErrorMessage>}
      </ScanCard>
    </Section>
  );
}

export default App;
