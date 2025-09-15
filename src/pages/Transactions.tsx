import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { formatCurrency } from '../lib/currency-locale'

const categories = ['Food', 'Bills', 'Transport', 'Entertainment', 'Salary', 'Other']

export default function Transactions() {
  const { state, dispatch } = useApp()
  const [filters, setFilters] = useState({
    dateFrom: new Date().toISOString().slice(0, 7) + '-01',
    dateTo: new Date().toISOString().slice(0, 7) + '-31',
    type: '',
    accountId: '',
    category: ''
  })
  const [editingTransaction, setEditingTransaction] = useState<typeof state.transactions[0] | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    type: 'expense' as 'income' | 'expense' | 'transfer',
    accountId: state.accounts[0]?.id || '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    tags: ''
  })

  // Filter transactions
  const filteredTransactions = state.transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date)
    const fromDate = new Date(filters.dateFrom)
    const toDate = new Date(filters.dateTo)
    
    return (
      transactionDate >= fromDate &&
      transactionDate <= toDate &&
      (!filters.type || transaction.type === filters.type) &&
      (!filters.accountId || transaction.accountId === filters.accountId) &&
      (!filters.category || transaction.category === filters.category)
    )
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatAmount = (cents: number) => {
    return formatCurrency(cents, state.settings.currency, state.settings.locale)
  }

  const getAccountName = (accountId: string) => {
    return state.accounts.find(acc => acc.id === accountId)?.name || 'Unknown'
  }

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
    setShowAddForm(false)
  }

  const handleEditTransaction = (transaction: typeof state.transactions[0]) => {
    setEditingTransaction(transaction)
    setNewTransaction({
      type: transaction.type,
      accountId: transaction.accountId,
      amount: (transaction.amountCents / 100).toString(),
      category: transaction.category,
      date: transaction.date,
      notes: transaction.notes || '',
      tags: transaction.tags.join(', ')
    })
    setShowAddForm(true)
  }

  const handleUpdateTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingTransaction || !newTransaction.accountId || !newTransaction.amount || !newTransaction.category) return

    const updatedTransaction = {
      ...editingTransaction,
      date: newTransaction.date,
      accountId: newTransaction.accountId,
      type: newTransaction.type,
      amountCents: Math.round(parseFloat(newTransaction.amount) * 100),
      category: newTransaction.category,
      notes: newTransaction.notes,
      tags: newTransaction.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }

    dispatch({ type: 'UPDATE_TRANSACTION', payload: updatedTransaction })
    setEditingTransaction(null)
    setNewTransaction({
      type: 'expense',
      accountId: state.accounts[0]?.id || '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      tags: ''
    })
    setShowAddForm(false)
  }

  const handleDeleteTransaction = (transactionId: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: transactionId })
    }
  }

  const handleCancelEdit = () => {
    setEditingTransaction(null)
    setNewTransaction({
      type: 'expense',
      accountId: state.accounts[0]?.id || '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      tags: ''
    })
    setShowAddForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Manage your financial transactions</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          Add Transaction
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">From Date</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">To Date</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Type</label>
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Account</label>
              <select
                value={filters.accountId}
                onChange={(e) => setFilters({ ...filters, accountId: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Accounts</option>
                {state.accounts.map(account => (
                  <option key={account.id} value={account.id}>{account.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Category</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Transaction Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingTransaction ? handleUpdateTransaction : handleAddTransaction} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                  <select
                    value={newTransaction.category}
                    onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    required
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
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTransaction.tags}
                    onChange={(e) => setNewTransaction({ ...newTransaction, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="work, travel, etc."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Notes</label>
                <textarea
                  value={newTransaction.notes}
                  onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  rows={3}
                  placeholder="Optional notes about this transaction"
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit">
                  {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
                </Button>
                <Button type="button" variant="outline" onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions ({filteredTransactions.length})</CardTitle>
          <CardDescription>
            Showing transactions from {filters.dateFrom} to {filters.dateTo}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found for the selected filters.</p>
              <Button className="mt-4" onClick={() => setShowAddForm(true)}>
                Add Your First Transaction
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Account</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Category</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Notes</th>
                    <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map(transaction => (
                    <tr key={transaction.id} className="border-b border-border hover:bg-accent/50">
                      <td className="py-3 px-4 text-sm">{transaction.date}</td>
                      <td className="py-3 px-4 text-sm">{getAccountName(transaction.accountId)}</td>
                      <td className="py-3 px-4 text-sm capitalize">{transaction.type}</td>
                      <td className="py-3 px-4 text-sm">{transaction.category}</td>
                      <td className={`py-3 px-4 text-sm font-medium ${
                        transaction.type === 'income' ? 'text-green-600' : 
                        transaction.type === 'expense' ? 'text-red-600' : 
                        'text-blue-600'
                      }`}>
                        {transaction.type === 'expense' ? '-' : '+'}{formatAmount(transaction.amountCents)}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{transaction.notes || '-'}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditTransaction(transaction)}
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteTransaction(transaction.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
