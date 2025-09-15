import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/TranslationContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { CURRENCIES, LOCALES, getCurrencyInfo, getLocaleInfo } from '../lib/currency-locale'

export default function Settings() {
  const { state, dispatch } = useApp()
  const { t } = useTranslation()
  const [settings, setSettings] = useState({
    name: state.settings.name,
    currency: state.settings.currency,
    locale: state.settings.locale
  })

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings })
    alert('Settings saved successfully!')
  }

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      dispatch({ type: 'RESET_DATA' })
      alert('All data has been reset.')
    }
  }

  const handleLoadExampleData = () => {
    if (window.confirm('This will load example data and may overwrite your current data. Continue?')) {
      dispatch({ type: 'LOAD_EXAMPLE_DATA' })
      alert('Example data loaded successfully!')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t('settings.title')}</h1>
        <p className="text-muted-foreground">{t('settings.manageProfile')}</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.profileSettings')}</CardTitle>
          <CardDescription>{t('settings.manageProfile')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t('common.name')}</label>
                <input
                  type="text"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t('common.email')}</label>
                <input
                  type="email"
                  value={state.session.user?.email || ''}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-muted text-muted-foreground cursor-not-allowed"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">{t('settings.emailCannotBeChanged')}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t('settings.currency')}</label>
                <select
                  value={settings.currency}
                  onChange={(e) => setSettings({ ...settings, currency: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {CURRENCIES.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name} ({currency.symbol})
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('settings.selectedCurrency')}: {getCurrencyInfo(settings.currency).name} ({getCurrencyInfo(settings.currency).symbol})
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">{t('settings.locale')}</label>
                <select
                  value={settings.locale}
                  onChange={(e) => setSettings({ ...settings, locale: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {LOCALES.map(locale => (
                    <option key={locale.code} value={locale.code}>
                      {locale.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  {t('settings.selectedLocale')}: {getLocaleInfo(settings.locale).name}
                </p>
              </div>
            </div>

            <Button type="submit">
              {t('settings.saveSettings')}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Manage your application data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-border rounded-card">
              <div>
                <h3 className="font-medium text-foreground">Load Example Data</h3>
                <p className="text-sm text-muted-foreground">
                  Load sample accounts, transactions, and budgets for testing
                </p>
              </div>
              <Button variant="outline" onClick={handleLoadExampleData}>
                Load Example Data
              </Button>
            </div>

            <div className="flex justify-between items-center p-4 border border-border rounded-card">
              <div>
                <h3 className="font-medium text-foreground">Reset All Data</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete all your data and start fresh
                </p>
              </div>
              <Button variant="destructive" onClick={handleResetData}>
                Reset All Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle>App Information</CardTitle>
          <CardDescription>About TrackMyFinances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Version</span>
              <span className="text-sm font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Type</span>
              <span className="text-sm font-medium">MVP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Data Storage</span>
              <span className="text-sm font-medium">Local Storage</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Currency Support</span>
              <span className="text-sm font-medium">USD Only</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Your Data</CardTitle>
          <CardDescription>Statistics about your financial data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{state.accounts.length}</p>
              <p className="text-sm text-muted-foreground">Accounts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{state.transactions.length}</p>
              <p className="text-sm text-muted-foreground">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{Object.keys(state.budgets).length}</p>
              <p className="text-sm text-muted-foreground">Budget Categories</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
