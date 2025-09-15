import React, { createContext, useContext, ReactNode } from 'react'
import { useApp } from './AppContext'
import { t, getTranslations, Translations } from '../lib/translations'
import { Locale } from '../types'

interface TranslationContextType {
  t: (key: string) => string
  translations: Translations
  locale: Locale
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

interface TranslationProviderProps {
  children: ReactNode
}

export function TranslationProvider({ children }: TranslationProviderProps) {
  const { state } = useApp()
  const locale = state.settings.locale
  const translations = getTranslations(locale)

  const translate = (key: string): string => {
    return t(locale, key)
  }

  const value: TranslationContextType = {
    t: translate,
    translations,
    locale,
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
