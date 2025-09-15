import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { formatCurrency } from '../lib/currency-locale'

export default function Accounts() {
  const { state, dispatch } = useApp()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAccount, setEditingAccount] = useState<typeof state.accounts[0] | null>(null)
  const [newAccount, setNewAccount] = useState({
    name: '',
    type: 'checking' as 'checking' | 'savings' | 'credit',
    currency: 'USD' as 'USD'
  })

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

  const formatAmount = (cents: number) => {
    return formatCurrency(cents, state.settings.currency, state.settings.locale)
  }

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newAccount.name) return

    const account = {
      id: `a${Date.now()}`,
      name: newAccount.name,
      type: newAccount.type,
      currency: newAccount.currency
    }

    dispatch({ type: 'ADD_ACCOUNT', payload: account })
    setNewAccount({ name: '', type: 'checking', currency: 'USD' })
    setShowAddForm(false)
  }

  const handleEditAccount = (account: typeof state.accounts[0]) => {
    setEditingAccount(account)
    setNewAccount({
      name: account.name,
      type: account.type,
      currency: account.currency
    })
    setShowAddForm(true)
  }

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingAccount || !newAccount.name) return

    const updatedAccount = {
      ...editingAccount,
      name: newAccount.name,
      type: newAccount.type,
      currency: newAccount.currency
    }

    dispatch({ type: 'UPDATE_ACCOUNT', payload: updatedAccount })
    setEditingAccount(null)
    setNewAccount({ name: '', type: 'checking', currency: 'USD' })
    setShowAddForm(false)
  }

  const handleDeleteAccount = (accountId: string) => {
    // Check if account has transactions
    const hasTransactions = state.transactions.some(t => t.accountId === accountId)
    
    if (hasTransactions) {
      alert('Cannot delete account with existing transactions. Please delete all transactions first.')
      return
    }

    if (window.confirm('Are you sure you want to delete this account?')) {
      dispatch({ type: 'DELETE_ACCOUNT', payload: accountId })
    }
  }

  const handleCancelEdit = () => {
    setEditingAccount(null)
    setNewAccount({ name: '', type: 'checking', currency: 'USD' })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Accounts</h1>
          <p className="text-muted-foreground">Manage your financial accounts</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          Add Account
        </Button>
      </div>

      {/* Add/Edit Account Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingAccount ? 'Edit Account' : 'Add Account'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingAccount ? handleUpdateAccount : handleAddAccount} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Account Name</label>
                  <input
                    type="text"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Chase Checking"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Account Type</label>
                  <select
                    value={newAccount.type}
                    onChange={(e) => setNewAccount({ ...newAccount, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                    <option value="credit">Credit Card</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  {editingAccount ? 'Update Account' : 'Add Account'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Accounts List */}
      <Card>
        <CardHeader>
          <CardTitle>Your Accounts</CardTitle>
          <CardDescription>
            {accountBalances.length} account{accountBalances.length !== 1 ? 's' : ''} • Total Balance: {formatAmount(totalBalance)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accountBalances.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No accounts found.</p>
              <Button className="mt-4" onClick={() => setShowAddForm(true)}>
                Add Your First Account
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {accountBalances.map(account => (
                <div key={account.id} className="border border-border rounded-card p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{account.name}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-ele capitalize">
                          {account.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {account.currency} • {state.transactions.filter(t => t.accountId === account.id).length} transactions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xl font-bold ${
                        account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatAmount(account.balance)}
                      </p>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditAccount(account)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteAccount(account.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Summary */}
      {accountBalances.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Account Summary</CardTitle>
            <CardDescription>Overview of your account balances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {accountBalances.filter(acc => acc.balance >= 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Positive Balance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {accountBalances.filter(acc => acc.balance < 0).length}
                </p>
                <p className="text-sm text-muted-foreground">Negative Balance</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {formatAmount(totalBalance)}
                </p>
                <p className="text-sm text-muted-foreground">Total Net Worth</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
