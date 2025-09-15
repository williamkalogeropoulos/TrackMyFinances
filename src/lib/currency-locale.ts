import { Currency, Locale } from '../types'

export const CURRENCIES: { code: Currency; name: string; symbol: string }[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'PLN', name: 'Polish Złoty', symbol: 'zł' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'TRY', name: 'Turkish Lira', symbol: '₺' },
  { code: 'ILS', name: 'Israeli Shekel', symbol: '₪' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
]

export const LOCALES: { code: Locale; name: string; language: string; country: string }[] = [
  // English
  { code: 'en-US', name: 'English (United States)', language: 'English', country: 'United States' },
  { code: 'en-GB', name: 'English (United Kingdom)', language: 'English', country: 'United Kingdom' },
  { code: 'en-CA', name: 'English (Canada)', language: 'English', country: 'Canada' },
  { code: 'en-AU', name: 'English (Australia)', language: 'English', country: 'Australia' },
  { code: 'en-NZ', name: 'English (New Zealand)', language: 'English', country: 'New Zealand' },
  { code: 'en-IN', name: 'English (India)', language: 'English', country: 'India' },
  { code: 'en-SG', name: 'English (Singapore)', language: 'English', country: 'Singapore' },
  { code: 'en-HK', name: 'English (Hong Kong)', language: 'English', country: 'Hong Kong' },
  
  // French
  { code: 'fr-FR', name: 'Français (France)', language: 'French', country: 'France' },
  { code: 'fr-CA', name: 'Français (Canada)', language: 'French', country: 'Canada' },
  { code: 'fr-BE', name: 'Français (Belgique)', language: 'French', country: 'Belgium' },
  { code: 'fr-CH', name: 'Français (Suisse)', language: 'French', country: 'Switzerland' },
  
  // German
  { code: 'de-DE', name: 'Deutsch (Deutschland)', language: 'German', country: 'Germany' },
  { code: 'de-AT', name: 'Deutsch (Österreich)', language: 'German', country: 'Austria' },
  { code: 'de-CH', name: 'Deutsch (Schweiz)', language: 'German', country: 'Switzerland' },
  
  // Spanish
  { code: 'es-ES', name: 'Español (España)', language: 'Spanish', country: 'Spain' },
  { code: 'es-MX', name: 'Español (México)', language: 'Spanish', country: 'Mexico' },
  { code: 'es-AR', name: 'Español (Argentina)', language: 'Spanish', country: 'Argentina' },
  { code: 'es-CO', name: 'Español (Colombia)', language: 'Spanish', country: 'Colombia' },
  { code: 'es-CL', name: 'Español (Chile)', language: 'Spanish', country: 'Chile' },
  { code: 'es-PE', name: 'Español (Perú)', language: 'Spanish', country: 'Peru' },
  { code: 'es-VE', name: 'Español (Venezuela)', language: 'Spanish', country: 'Venezuela' },
  
  // Italian
  { code: 'it-IT', name: 'Italiano (Italia)', language: 'Italian', country: 'Italy' },
  { code: 'it-CH', name: 'Italiano (Svizzera)', language: 'Italian', country: 'Switzerland' },
  
  // Portuguese
  { code: 'pt-BR', name: 'Português (Brasil)', language: 'Portuguese', country: 'Brazil' },
  { code: 'pt-PT', name: 'Português (Portugal)', language: 'Portuguese', country: 'Portugal' },
  
  // Dutch
  { code: 'nl-NL', name: 'Nederlands (Nederland)', language: 'Dutch', country: 'Netherlands' },
  { code: 'nl-BE', name: 'Nederlands (België)', language: 'Dutch', country: 'Belgium' },
  
  // Nordic
  { code: 'sv-SE', name: 'Svenska (Sverige)', language: 'Swedish', country: 'Sweden' },
  { code: 'no-NO', name: 'Norsk (Norge)', language: 'Norwegian', country: 'Norway' },
  { code: 'da-DK', name: 'Dansk (Danmark)', language: 'Danish', country: 'Denmark' },
  { code: 'fi-FI', name: 'Suomi (Suomi)', language: 'Finnish', country: 'Finland' },
  
  // Eastern European
  { code: 'pl-PL', name: 'Polski (Polska)', language: 'Polish', country: 'Poland' },
  { code: 'cs-CZ', name: 'Čeština (Česká republika)', language: 'Czech', country: 'Czech Republic' },
  { code: 'hu-HU', name: 'Magyar (Magyarország)', language: 'Hungarian', country: 'Hungary' },
  { code: 'ru-RU', name: 'Русский (Россия)', language: 'Russian', country: 'Russia' },
  { code: 'uk-UA', name: 'Українська (Україна)', language: 'Ukrainian', country: 'Ukraine' },
  { code: 'ro-RO', name: 'Română (România)', language: 'Romanian', country: 'Romania' },
  { code: 'bg-BG', name: 'Български (България)', language: 'Bulgarian', country: 'Bulgaria' },
  { code: 'hr-HR', name: 'Hrvatski (Hrvatska)', language: 'Croatian', country: 'Croatia' },
  { code: 'sk-SK', name: 'Slovenčina (Slovensko)', language: 'Slovak', country: 'Slovakia' },
  { code: 'sl-SI', name: 'Slovenščina (Slovenija)', language: 'Slovenian', country: 'Slovenia' },
  { code: 'et-EE', name: 'Eesti (Eesti)', language: 'Estonian', country: 'Estonia' },
  { code: 'lv-LV', name: 'Latviešu (Latvija)', language: 'Latvian', country: 'Latvia' },
  { code: 'lt-LT', name: 'Lietuvių (Lietuva)', language: 'Lithuanian', country: 'Lithuania' },
  { code: 'el-GR', name: 'Ελληνικά (Ελλάδα)', language: 'Greek', country: 'Greece' },
  
  // Asian
  { code: 'ja-JP', name: '日本語 (日本)', language: 'Japanese', country: 'Japan' },
  { code: 'ko-KR', name: '한국어 (대한민국)', language: 'Korean', country: 'South Korea' },
  { code: 'zh-CN', name: '中文 (中国)', language: 'Chinese', country: 'China' },
  { code: 'zh-TW', name: '中文 (台灣)', language: 'Chinese', country: 'Taiwan' },
  { code: 'zh-HK', name: '中文 (香港)', language: 'Chinese', country: 'Hong Kong' },
  { code: 'th-TH', name: 'ไทย (ประเทศไทย)', language: 'Thai', country: 'Thailand' },
  { code: 'vi-VN', name: 'Tiếng Việt (Việt Nam)', language: 'Vietnamese', country: 'Vietnam' },
  { code: 'id-ID', name: 'Bahasa Indonesia (Indonesia)', language: 'Indonesian', country: 'Indonesia' },
  { code: 'ms-MY', name: 'Bahasa Melayu (Malaysia)', language: 'Malay', country: 'Malaysia' },
  { code: 'tl-PH', name: 'Filipino (Pilipinas)', language: 'Filipino', country: 'Philippines' },
  
  // Middle Eastern & African
  { code: 'ar-SA', name: 'العربية (السعودية)', language: 'Arabic', country: 'Saudi Arabia' },
  { code: 'ar-AE', name: 'العربية (الإمارات)', language: 'Arabic', country: 'UAE' },
  { code: 'ar-EG', name: 'العربية (مصر)', language: 'Arabic', country: 'Egypt' },
  { code: 'he-IL', name: 'עברית (ישראל)', language: 'Hebrew', country: 'Israel' },
  { code: 'tr-TR', name: 'Türkçe (Türkiye)', language: 'Turkish', country: 'Turkey' },
]

export function getCurrencyInfo(currency: Currency) {
  return CURRENCIES.find(c => c.code === currency) || CURRENCIES[0]
}

export function getLocaleInfo(locale: Locale) {
  return LOCALES.find(l => l.code === locale) || LOCALES[0]
}

export function formatCurrency(amountCents: number, currency: Currency, locale: Locale): string {
  const currencyInfo = getCurrencyInfo(currency)
  const amount = amountCents / 100
  
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    // Fallback for unsupported currency/locale combinations
    return `${currencyInfo.symbol}${amount.toFixed(2)}`
  }
}

export function formatNumber(number: number, locale: Locale): string {
  try {
    return new Intl.NumberFormat(locale).format(number)
  } catch (error) {
    return number.toString()
  }
}
