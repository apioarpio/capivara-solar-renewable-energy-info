import React, {createContext, useState, useContext, useEffect} from 'react';
import {AppDictionaryInterface} from '../translate';
import {PortugueseDictionary} from '../translate/PortugueseDictionary';
import {EnglishDictionary} from '../translate/EnglishDictionary';

interface TranslateContextData {
  dictionary: AppDictionaryInterface;
  setLanguage: (language: string) => any;
}

const TranslateContext = createContext<TranslateContextData>(
  {} as TranslateContextData,
);

export const TranslateProvider: React.FC = ({children}) => {
  const [language, setLanguage] = useState('EN');
  const [dictionary, setDictionary] =
    useState<AppDictionaryInterface>(EnglishDictionary);

  const handleChangeDdictionary = () => {
    const dictionaries: any = {
      PT: PortugueseDictionary,
      EN: EnglishDictionary,
    };
    setDictionary(dictionaries[language]);
  };

  useEffect(() => {
    handleChangeDdictionary();
  }, [language]);

  return (
    <TranslateContext.Provider
      value={{
        dictionary,
        setLanguage,
      }}>
      {children}
    </TranslateContext.Provider>
  );
};

export function useTranslate() {
  return useContext(TranslateContext);
}
