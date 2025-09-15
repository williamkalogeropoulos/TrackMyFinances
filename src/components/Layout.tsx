import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/TranslationContext'
import { Button } from './ui/button'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { state, dispatch } = useApp()
  const { t } = useTranslation()
  const location = useLocation()

  const navigation = [
    { name: t('navigation.dashboard'), href: '/', icon: '📊' },
    { name: t('navigation.transactions'), href: '/transactions', icon: '💳' },
    { name: t('navigation.budgets'), href: '/budgets', icon: '💰' },
    { name: t('navigation.accounts'), href: '/accounts', icon: '🏦' },
    { name: t('navigation.settings'), href: '/settings', icon: '⚙️' },
  ]

  const handleSignOut = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-foreground">
                {t('signIn.title')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {state.session.user?.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                {t('navigation.signOut')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-card border-r border-border min-h-screen">
          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-ele transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <span className="mr-3 text-lg">{item.icon}</span>
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
