export interface User {
  id: string
  name: string
  email: string
}

export interface Session {
  isAuthenticated: boolean
  user: User | null
}

export interface Account {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit'
  currency: 'USD'
}

export interface Transaction {
  id: string
  date: string
  accountId: string
  type: 'income' | 'expense' | 'transfer'
  amountCents: number
  category: string
  notes?: string
  tags: string[]
  transferLinkId?: string
}

export interface Budget {
  amountCents: number
  month: string
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR' | 'BRL' | 'MXN' | 'KRW' | 'SGD' | 'HKD' | 'NZD' | 'NOK' | 'SEK' | 'DKK' | 'PLN' | 'CZK' | 'HUF' | 'RUB' | 'ZAR' | 'TRY' | 'ILS' | 'AED' | 'SAR' | 'THB' | 'MYR' | 'PHP' | 'IDR' | 'VND'

export type Locale = 'en-US' | 'en-GB' | 'en-CA' | 'en-AU' | 'en-NZ' | 'en-IN' | 'en-SG' | 'en-HK' | 'fr-FR' | 'fr-CA' | 'fr-BE' | 'fr-CH' | 'de-DE' | 'de-AT' | 'de-CH' | 'es-ES' | 'es-MX' | 'es-AR' | 'es-CO' | 'es-CL' | 'es-PE' | 'es-VE' | 'it-IT' | 'it-CH' | 'pt-BR' | 'pt-PT' | 'nl-NL' | 'nl-BE' | 'sv-SE' | 'no-NO' | 'da-DK' | 'fi-FI' | 'pl-PL' | 'cs-CZ' | 'hu-HU' | 'ru-RU' | 'ja-JP' | 'ko-KR' | 'zh-CN' | 'zh-TW' | 'zh-HK' | 'th-TH' | 'vi-VN' | 'id-ID' | 'ms-MY' | 'tl-PH' | 'ar-SA' | 'ar-AE' | 'ar-EG' | 'he-IL' | 'tr-TR' | 'uk-UA' | 'ro-RO' | 'bg-BG' | 'hr-HR' | 'sk-SK' | 'sl-SI' | 'et-EE' | 'lv-LV' | 'lt-LT' | 'el-GR'

export interface Settings {
  currency: Currency
  locale: Locale
  name: string
}

export interface AppState {
  session: Session
  accounts: Account[]
  transactions: Transaction[]
  budgets: Record<string, Budget>
  settings: Settings
}
