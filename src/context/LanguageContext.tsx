import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type Language = 'zh' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  setLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('zh')

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
