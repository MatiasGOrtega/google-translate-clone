import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { type FromLanguage, type Language, SectionType } from "../type";

type Props =
  | {
      type: SectionType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (language: Language) => void;
    };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (value: string) => {
    onChange(value as Language);
  };

  return (
    <>
      {type === "from" ? (
        <Label htmlFor="source-language">From</Label>
        ) : (
        <Label htmlFor="target-language">To</Label>
      )}
      <Select onValueChange={handleChange} value={value}>
        <SelectTrigger id={type === "from" ? 'source-language' : 'target-language'} className="w-full">
          <SelectValue placeholder="Selecciona el idioma" />
        </SelectTrigger>
        <SelectContent>
          {type === "from" && (
            <SelectItem value={AUTO_LANGUAGE}>Detect language</SelectItem>
          )}
          {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
            <SelectItem key={key} value={key}>
              {literal}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};
