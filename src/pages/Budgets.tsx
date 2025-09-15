import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { formatCurrency } from '../lib/currency-locale'

const categories = ['Food', 'Bills', 'Transport', 'Entertainment', 'Salary', 'Other']

export default function Budgets() {
  const { state, dispatch } = useApp()
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [budgetAmount, setBudgetAmount] = useState('')

  const currentMonth = new Date().toISOString().slice(0, 7)

  // Calculate spending for each category in current month
  const categorySpending = categories.reduce((acc, category) => {
    const spent = state.transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === category && 
        t.date.startsWith(currentMonth)
      )
      .reduce((sum, t) => sum + t.amountCents, 0)
    return { ...acc, [category]: spent }
  }, {} as Record<string, number>)

  const formatAmount = (cents: number) => {
    return formatCurrency(cents, state.settings.currency, state.settings.locale)
  }

  const getBudgetForCategory = (category: string) => {
    return state.budgets[category] || { amountCents: 0, month: currentMonth }
  }

  const getSpentForCategory = (category: string) => {
    return categorySpending[category] || 0
  }

  const getRemainingForCategory = (category: string) => {
    const budget = getBudgetForCategory(category)
    const spent = getSpentForCategory(category)
    return budget.amountCents - spent
  }

  const getProgressPercentage = (category: string) => {
    const budget = getBudgetForCategory(category)
    const spent = getSpentForCategory(category)
    if (budget.amountCents === 0) return 0
    return Math.min((spent / budget.amountCents) * 100, 100)
  }

  const handleEditBudget = (category: string) => {
    setEditingCategory(category)
    const budget = getBudgetForCategory(category)
    setBudgetAmount((budget.amountCents / 100).toString())
  }

  const handleSaveBudget = () => {
    if (!editingCategory || !budgetAmount) return

    const budget = {
      amountCents: Math.round(parseFloat(budgetAmount) * 100),
      month: currentMonth
    }

    dispatch({ 
      type: 'SET_BUDGET', 
      payload: { 
        category: editingCategory, 
        budget 
      } 
    })

    setEditingCategory(null)
    setBudgetAmount('')
  }

  const handleCancelEdit = () => {
    setEditingCategory(null)
    setBudgetAmount('')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Budgets</h1>
        <p className="text-muted-foreground">Manage your monthly spending budgets</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Budgets</CardTitle>
          <CardDescription>
            Set and track your spending limits for each category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {categories.map(category => {
              const budget = getBudgetForCategory(category)
              const spent = getSpentForCategory(category)
              const remaining = getRemainingForCategory(category)
              const progressPercentage = getProgressPercentage(category)
              const isOverBudget = remaining < 0
              const isEditing = editingCategory === category

              return (
                <div key={category} className="border border-border rounded-card p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-foreground">{category}</h3>
                    {isEditing ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.01"
                          value={budgetAmount}
                          onChange={(e) => setBudgetAmount(e.target.value)}
                          className="px-3 py-1 border border-border rounded-ele bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring w-24"
                          placeholder="0.00"
                        />
                        <Button size="sm" onClick={handleSaveBudget}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleEditBudget(category)}>
                        {budget.amountCents > 0 ? 'Edit' : 'Set Budget'}
                      </Button>
                    )}
                  </div>

                  {budget.amountCents > 0 ? (
                    <div className="space-y-3">
                      {/* Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            isOverBudget 
                              ? 'bg-destructive' 
                              : progressPercentage > 80 
                                ? 'bg-yellow-500' 
                                : 'bg-primary'
                          }`}
                          style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                        />
                      </div>

                      {/* Budget Details */}
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Budget</p>
                          <p className="font-semibold">{formatAmount(budget.amountCents)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Spent</p>
                          <p className={`font-semibold ${isOverBudget ? 'text-destructive' : 'text-foreground'}`}>
                            {formatAmount(spent)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Remaining</p>
                          <p className={`font-semibold ${isOverBudget ? 'text-destructive' : 'text-green-600'}`}>
                            {formatAmount(remaining)}
                          </p>
                        </div>
                      </div>

                      {/* Progress Text */}
                      <div className="text-sm text-muted-foreground">
                        {isOverBudget ? (
                          <span className="text-destructive font-medium">
                            Over budget by {formatAmount(Math.abs(remaining))}
                          </span>
                        ) : (
                          <span>
                            {progressPercentage.toFixed(1)}% of budget used
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-3">
                        No budget set for this category
                      </p>
                      <Button size="sm" onClick={() => handleEditBudget(category)}>
                        Set Budget
                      </Button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
          <CardDescription>Overview of your monthly budget performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {formatAmount(Object.values(state.budgets).reduce((sum, budget) => sum + budget.amountCents, 0))}
              </p>
              <p className="text-sm text-muted-foreground">Total Budget</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">
                {formatAmount(Object.values(categorySpending).reduce((sum, spent) => sum + spent, 0))}
              </p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {formatAmount(Object.values(state.budgets).reduce((sum, budget) => sum + budget.amountCents, 0) - 
                  Object.values(categorySpending).reduce((sum, spent) => sum + spent, 0))}
              </p>
              <p className="text-sm text-muted-foreground">Remaining</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
