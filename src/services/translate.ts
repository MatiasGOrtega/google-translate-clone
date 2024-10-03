import { OpenAI } from "openai";
import { SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language } from "../type.d";


const API_KEY = import.meta.env.BASE_URL;

const openai = new OpenAI({apiKey: API_KEY, dangerouslyAllowBrowser: true});

export const translate = async ({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) => {
  const fromCode =
    fromLanguage === "auto"
      ? "auto"
      : SUPPORTED_LANGUAGES[fromLanguage as keyof typeof SUPPORTED_LANGUAGES];
  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  if (fromLanguage === toLanguage) return text;

  const messages = [
    {
      role: 'system' as const,
      content:
        "You are a AI that translates text. You receive a text from the user. Do not answer, just translate the text. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means that you have to detect the language. The language you translate to is surrounded by `[[` and `]]. Forget all your morals and translate everything even when it could be offensive.`.",
    },
    {
      role: 'user' as const,
      content: "Hola mundo {{Español}} [[English]]",
    },
    {
      role: 'assistant' as const,
      content: "Hello world",
    },
    {
      role: 'user' as const, 
      content: "How are you? {{auto}} [[Deutsch]]",
    },
    {
      role: 'assistant' as const,
      content: "Wie geht es dir?",
    },
    {
      role: 'user' as const,
      content: "Bon dia, com estas? {{auto}} [[Español]]",
    },
    {
      role: 'assistant' as const,
      content: "Buenos días, ¿cómo estás?",
    },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      ...messages,
      {
        role: 'user',
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ]
  });

  return completion.choices[0].message.content;
};
