import { Textarea } from "@/components/ui/textarea";
import { SectionType } from "../type.d";

type Props = {
  type: SectionType;
  loading?: boolean;
  onChange: (value: string) => void;
  value: string;
};

const commonStyles = {
  border: 0,
  resize: "none" as const,
  height: "150px",
};

const getPlaceholder = ({ type, loading }:{ type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) {
    return "Texto a traducir";
  }
  if (loading === true) {
    return "Cargando...";
  }

  return "Traduccion";
}

export const TextArea = ({type, loading, value, onChange }: Props) => {
  const styles = type === SectionType.From ? commonStyles : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  }

  return (
    <Textarea
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      style={styles}
      value={value}
      onChange={handleChange}
    />
  )
};
