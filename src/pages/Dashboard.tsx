import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useTranslation } from '../context/TranslationContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../lib/currency-locale'

// Categories will be translated dynamically

export default function Dashboard() {
  const { state, dispatch } = useApp()
  const { t } = useTranslation()
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense' | 'transfer',
    accountId: state.accounts[0]?.id || '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    tags: ''
  })

  const categories = [
    t('categories.food'),
    t('categories.bills'),
    t('categories.transport'),
    t('categories.entertainment'),
    t('categories.salary'),
    t('categories.other')
  ]

  // Calculate account balances
  const accountBalances = state.accounts.map(account => {
    const balance = state.transactions
      .filter(t => t.accountId === account.id)
      .reduce((sum, t) => {
        if (t.type === 'income') return sum + t.amountCents
        if (t.type === 'expense') return sum - t.amountCents
        return sum
      }, 0)
    return { ...account, balance }
  })

  const totalBalance = accountBalances.reduce((sum, account) => sum + account.balance, 0)

  // Calculate monthly spending by category
  const currentMonth = new Date().toISOString().slice(0, 7)
  const monthlySpending = categories.reduce((acc, category) => {
    const spent = state.transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === category && 
        t.date.startsWith(currentMonth)
      )
      .reduce((sum, t) => sum + t.amountCents, 0)
    return { ...acc, [category]: spent }
  }, {} as Record<string, number>)

  const topSpendingCategories = Object.entries(monthlySpending)
    .filter(([_, amount]) => amount > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  // Calculate net cash flow for current month
  const monthlyIncome = state.transactions
    .filter(t => t.type === 'income' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amountCents, 0)

  const monthlyExpenses = state.transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(currentMonth))
    .reduce((sum, t) => sum + t.amountCents, 0)

  const netCashFlow = monthlyIncome - monthlyExpenses

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTransaction.accountId || !newTransaction.amount || !newTransaction.category) return

    const transaction = {
      id: `t${Date.now()}`,
      date: newTransaction.date,
      accountId: newTransaction.accountId,
      type: newTransaction.type,
      amountCents: Math.round(parseFloat(newTransaction.amount) * 100),
      category: newTransaction.category,
      notes: newTransaction.notes,
      tags: newTransaction.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }

    dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
    setNewTransaction({
      type: 'expense',
      accountId: state.accounts[0]?.id || '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      tags: ''
    })
  }

  const formatAmount = (cents: number) => {
    return formatCurrency(cents, state.settings.currency, state.settings.locale)
  }

  return (
    <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground">{t('common.welcome')} {state.session.user?.name}!</p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Accounts Summary */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.accountsSummary')}</CardTitle>
            <CardDescription>{t('common.yourAccounts')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {accountBalances.map(account => (
              <div key={account.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{account.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{account.type}</p>
                </div>
                <p className={`font-semibold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatAmount(account.balance)}
                </p>
              </div>
            ))}
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Total</p>
                <p className={`text-lg font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatAmount(totalBalance)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Add Transaction */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Add Transaction</CardTitle>
            <CardDescription>Record a new transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTransaction} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as any })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Account</label>
                <select
                  value={newTransaction.accountId}
                  onChange={(e) => setNewTransaction({ ...newTransaction, accountId: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {state.accounts.map(account => (
                    <option key={account.id} value={account.id}>{account.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
                <input
                  type="text"
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Optional notes"
                />
              </div>

              <Button type="submit" className="w-full">
                Add Transaction
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Monthly Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
            <CardDescription>Current month summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Net Cash Flow</p>
              <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatAmount(netCashFlow)}
              </p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Top Spending Categories</p>
              {topSpendingCategories.length > 0 ? (
                <div className="space-y-2">
                  {topSpendingCategories.map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm">{category}</span>
                      <span className="text-sm font-medium">{formatAmount(amount)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No spending this month</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Navigate to different sections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link to="/transactions">View All Transactions</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/budgets">Manage Budgets</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/accounts">Manage Accounts</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
