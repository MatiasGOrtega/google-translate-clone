import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { ArrowExchange, ClipboardIcon, SpeakerIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAGE, VOICE_FOR_LENGUAGE } from "./constants";
import { useDebounce } from "./hooks/useDebounce";
import { SectionType } from "./type.d";
import { TextArea } from "./components/TextArea";
import { useEffect } from "react";
import { translate } from "./services/translate";
function App() {
  const {
    loading,
    fromLanguage,
    toLanguage,
    fromText,
    result,
    interchangeLanguages,
    setFromLenguage,
    setToLanguage,
    setFromText,
    setResult,
  } = useStore();

  const debauncedFromText = useDebounce(fromText, 250);

  useEffect(() => {
    if(debauncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debauncedFromText })
      .then((result) => {
        if(result == null) return
        setResult(result)
      })
      .catch(() => setResult("Error translating text"));

  }, [debauncedFromText, fromLanguage, toLanguage]);

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LENGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="app">
      <h1>Google Translate</h1>
      <Container fluid>
        <Row>
          <Col>
            <Stack gap={3}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLenguage}
              />
              <TextArea
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>
          </Col>
          <Col xs="auto">
            <Button
              variant="link"
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
            >
              <ArrowExchange />
            </Button>
          </Col>
          <Col>
            <Stack gap={3}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <div className="" style={{position: 'relative'}}>
                <TextArea
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                  loading={loading}
                />
                <div style={{position:'absolute', left:0, bottom: 0, display:'flex', gap: 13}}>
                  <Button 
                    variant="link"
                    onClick={handleCopy}
                  >
                    <ClipboardIcon />
                  </Button>
                  <Button
                    variant="link"
                    onClick={handleSpeak}
                  >
                    <SpeakerIcon />
                  </Button>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
