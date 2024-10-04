import "./App.css";
import { Button } from "@/components/ui/button"
import { ShuffleIcon, Copy, Volume1 } from "lucide-react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { LanguageSelector } from "./components/LanguageSelector";
import { AUTO_LANGUAGE, VOICE_FOR_LENGUAGE } from "./constants";
import { SectionType } from "./type.d";
import { TextArea } from "./components/TextArea";
import { translate } from "./services/translate";
import { useEffect } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useStore } from "./hooks/useStore";
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
    <div className="app flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-4 md:px-6 py-12">
        <div className="w-full max-w-2xl grid grid-cols-[1fr_auto_1fr] gap-4">
          <div className="grid gap-2">
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
          </div>

          <Button
            variant="outline" 
            className="h-10 px-4"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ShuffleIcon className="h-5 w-5" />
          </Button>

          <div className="grid gap-2">
            <LanguageSelector
              type={SectionType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <div className="relative">
              <TextArea
                type={SectionType.To}
                value={result}
                onChange={setResult}
                loading={loading}
              />
              <div className="absolute left-0 bottom-0 flex gap-2">
                <Button 
                  variant="ghost"
                  onClick={handleCopy}
                >
                  <Copy className="h-5 w-5"/>
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleSpeak}
                >
                  <Volume1 className="h-5 w-5"/>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
