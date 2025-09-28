import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { AppState, Account, Transaction, Budget, Settings, Session } from '../types'

// Initial state
const initialState: AppState = {
  session: {
    isAuthenticated: false,
    user: null
  },
  accounts: [],
  transactions: [],
  budgets: {},
  settings: {
    currency: 'USD',
    locale: 'en-US',
    name: ''
  }
}

// Action types
type AppAction =
  | { type: 'LOGIN'; payload: { user: { id: string; name: string; email: string } } }
  | { type: 'LOGOUT' }
  | { type: 'ADD_ACCOUNT'; payload: Account }
  | { type: 'UPDATE_ACCOUNT'; payload: Account }
  | { type: 'DELETE_ACCOUNT'; payload: string }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_BUDGET'; payload: { category: string; budget: Budget } }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<Settings> }
  | { type: 'LOAD_EXAMPLE_DATA' }
  | { type: 'RESET_DATA' }

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        session: {
          isAuthenticated: true,
          user: action.payload.user
        }
      }
    
    case 'LOGOUT':
      return {
        ...state,
        session: {
          isAuthenticated: false,
          user: null
        }
      }
    
    case 'ADD_ACCOUNT':
      return {
        ...state,
        accounts: [...state.accounts, action.payload]
      }
    
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.map(account =>
          account.id === action.payload.id ? action.payload : account
        )
      }
    
    case 'DELETE_ACCOUNT':
      return {
        ...state,
        accounts: state.accounts.filter(account => account.id !== action.payload)
      }
    
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        )
      }
    
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      }
    
    case 'SET_BUDGET':
      return {
        ...state,
        budgets: {
          ...state.budgets,
          [action.payload.category]: action.payload.budget
        }
      }
    
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      }
    
    case 'LOAD_EXAMPLE_DATA':
      return {
        ...state,
        accounts: [
          { id: 'a1', name: 'Checking', type: 'checking', currency: 'USD' },
          { id: 'a2', name: 'Savings', type: 'savings', currency: 'USD' },
          { id: 'a3', name: 'Credit Card', type: 'credit', currency: 'USD' }
        ],
        transactions: [
          {
            id: 't1',
            date: new Date().toISOString().split('T')[0],
            accountId: 'a1',
            type: 'income',
            amountCents: 500000, // $5000
            category: 'Salary',
            notes: 'Monthly salary',
            tags: ['work', 'salary']
          },
          {
            id: 't2',
            date: new Date().toISOString().split('T')[0],
            accountId: 'a1',
            type: 'expense',
            amountCents: 15000, // $150
            category: 'Food',
            notes: 'Grocery shopping',
            tags: ['grocery', 'food']
          },
          {
            id: 't3',
            date: new Date().toISOString().split('T')[0],
            accountId: 'a1',
            type: 'expense',
            amountCents: 8000, // $80
            category: 'Transport',
            notes: 'Gas and parking',
            tags: ['transport', 'gas']
          }
        ],
        budgets: {
          'Food': { amountCents: 50000, month: new Date().toISOString().slice(0, 7) }, // $500
          'Transport': { amountCents: 20000, month: new Date().toISOString().slice(0, 7) }, // $200
          'Entertainment': { amountCents: 10000, month: new Date().toISOString().slice(0, 7) } // $100
        },
        settings: {
          currency: 'USD',
          locale: 'en-US',
          name: 'Alex Doe'
        }
      }
    
    case 'RESET_DATA':
      return initialState
    
    default:
      return state
  }
}

// Context
const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

// Provider
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('trackmyfinances-state')
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        if (parsedState.session?.isAuthenticated) {
          dispatch({ type: 'LOGIN', payload: { user: parsedState.session.user } })
        }
        if (parsedState.accounts?.length > 0) {
          parsedState.accounts.forEach((account: Account) => {
            dispatch({ type: 'ADD_ACCOUNT', payload: account })
          })
        }
        if (parsedState.transactions?.length > 0) {
          parsedState.transactions.forEach((transaction: Transaction) => {
            dispatch({ type: 'ADD_TRANSACTION', payload: transaction })
          })
        }
        if (parsedState.budgets) {
          Object.entries(parsedState.budgets).forEach(([category, budget]) => {
            dispatch({ type: 'SET_BUDGET', payload: { category, budget: budget as Budget } })
          })
        }
        if (parsedState.settings) {
          dispatch({ type: 'UPDATE_SETTINGS', payload: parsedState.settings })
        }
      } catch (error) {
        console.error('Failed to load saved state:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trackmyfinances-state', JSON.stringify(state))
  }, [state])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// Hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

