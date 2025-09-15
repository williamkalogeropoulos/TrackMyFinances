import { Locale } from '../types'

export interface Translations {
  // Common
  common: {
    loading: string
    save: string
    cancel: string
    delete: string
    edit: string
    add: string
    close: string
    confirm: string
    yes: string
    no: string
    search: string
    filter: string
    clear: string
    total: string
    remaining: string
    spent: string
    budget: string
    amount: string
    date: string
    category: string
    notes: string
    tags: string
    type: string
    account: string
    name: string
    email: string
    password: string
    signIn: string
    signOut: string
    demo: string
    settings: string
    dashboard: string
    transactions: string
    budgets: string
    accounts: string
    welcome: string
  }
  
  // Navigation
  navigation: {
    dashboard: string
    transactions: string
    budgets: string
    accounts: string
    settings: string
    signOut: string
  }
  
  // Sign In Page
  signIn: {
    title: string
    subtitle: string
    welcomeBack: string
    signInToContinue: string
    emailAddress: string
    enterEmail: string
    enterPassword: string
    forgotPassword: string
    signInButton: string
    orContinueWith: string
    tryDemoAccount: string
    secureFastReliable: string
    signingIn: string
    loadingDemo: string
  }
  
  // Dashboard
  dashboard: {
    title: string
    accountsSummary: string
    quickAddTransaction: string
    monthlyOverview: string
    netCashFlow: string
    topSpendingCategories: string
    noSpendingThisMonth: string
    addTransaction: string
    viewAllTransactions: string
    manageBudgets: string
    manageAccounts: string
  }
  
  // Transactions
  transactions: {
    title: string
    allTransactions: string
    filters: string
    dateRange: string
    currentMonth: string
    lastMonth: string
    last3Months: string
    last6Months: string
    lastYear: string
    allTime: string
    transactionType: string
    income: string
    expense: string
    transfer: string
    selectAccount: string
    selectCategory: string
    addTransaction: string
    editTransaction: string
    deleteTransaction: string
    confirmDelete: string
    transactionDeleted: string
    noTransactions: string
    noTransactionsFound: string
    bulkImport: string
    postMvp: string
    incomeLabel: string
    expenseLabel: string
    transferLabel: string
  }
  
  // Budgets
  budgets: {
    title: string
    monthlyBudgets: string
    setBudget: string
    budgetSet: string
    overBudget: string
    overBudgetBy: string
    ofBudgetUsed: string
    totalBudget: string
    totalSpent: string
    remaining: string
    noBudgetsSet: string
    categories: string
    food: string
    bills: string
    transport: string
    entertainment: string
    salary: string
    other: string
  }
  
  // Accounts
  accounts: {
    title: string
    yourAccounts: string
    totalBalance: string
    addAccount: string
    editAccount: string
    deleteAccount: string
    accountName: string
    accountType: string
    checking: string
    savings: string
    credit: string
    currentBalance: string
    totalNetWorth: string
    noAccounts: string
    confirmDeleteAccount: string
    accountDeleted: string
    cannotDeleteAccount: string
    accountHasTransactions: string
  }
  
  // Settings
  settings: {
    title: string
    profileSettings: string
    manageProfile: string
    displayName: string
    emailAddress: string
    emailCannotBeChanged: string
    currency: string
    locale: string
    selectedCurrency: string
    selectedLocale: string
    saveSettings: string
    settingsSaved: string
  }
  
  // Categories
  categories: {
    food: string
    bills: string
    transport: string
    entertainment: string
    salary: string
    other: string
  }
  
  // Transaction Types
  transactionTypes: {
    income: string
    expense: string
    transfer: string
  }
  
  // Account Types
  accountTypes: {
    checking: string
    savings: string
    credit: string
  }
}

const translations: Record<Locale, Translations> = {
  'en-US': {
    common: {
      loading: 'Loading...',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      close: 'Close',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      total: 'Total',
      remaining: 'Remaining',
      spent: 'Spent',
      budget: 'Budget',
      amount: 'Amount',
      date: 'Date',
      category: 'Category',
      notes: 'Notes',
      tags: 'Tags',
      type: 'Type',
      account: 'Account',
      name: 'Name',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      signOut: 'Sign Out',
      demo: 'Demo',
      settings: 'Settings',
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      budgets: 'Budgets',
      accounts: 'Accounts',
      welcome: 'Welcome back',
      yourAccounts: 'Your account balances',
    },
    navigation: {
      dashboard: 'Dashboard',
      transactions: 'Transactions',
      budgets: 'Budgets',
      accounts: 'Accounts',
      settings: 'Settings',
      signOut: 'Sign Out',
    },
    signIn: {
      title: 'TrackMyFinances',
      subtitle: 'Take control of your financial future',
      welcomeBack: 'Welcome Back',
      signInToContinue: 'Sign in to access your financial dashboard',
      emailAddress: 'Email Address',
      enterEmail: 'Enter your email address',
      enterPassword: 'Enter your password',
      forgotPassword: 'Forgot password?',
      signInButton: 'Sign In',
      orContinueWith: 'Or continue with',
      tryDemoAccount: 'Try Demo Account',
      secureFastReliable: 'Secure • Fast • Reliable',
      signingIn: 'Signing In...',
      loadingDemo: 'Loading Demo...',
    },
    dashboard: {
      title: 'Dashboard',
      accountsSummary: 'Accounts Summary',
      quickAddTransaction: 'Quick Add Transaction',
      monthlyOverview: 'Monthly Overview',
      netCashFlow: 'Net Cash Flow',
      topSpendingCategories: 'Top Spending Categories',
      noSpendingThisMonth: 'No spending this month',
      addTransaction: 'Add Transaction',
      viewAllTransactions: 'View All Transactions',
      manageBudgets: 'Manage Budgets',
      manageAccounts: 'Manage Accounts',
    },
    transactions: {
      title: 'Transactions',
      allTransactions: 'All Transactions',
      filters: 'Filters',
      dateRange: 'Date Range',
      currentMonth: 'Current Month',
      lastMonth: 'Last Month',
      last3Months: 'Last 3 Months',
      last6Months: 'Last 6 Months',
      lastYear: 'Last Year',
      allTime: 'All Time',
      transactionType: 'Transaction Type',
      income: 'Income',
      expense: 'Expense',
      transfer: 'Transfer',
      selectAccount: 'Select Account',
      selectCategory: 'Select Category',
      addTransaction: 'Add Transaction',
      editTransaction: 'Edit Transaction',
      deleteTransaction: 'Delete Transaction',
      confirmDelete: 'Are you sure you want to delete this transaction?',
      transactionDeleted: 'Transaction deleted successfully',
      noTransactions: 'No transactions yet',
      noTransactionsFound: 'No transactions found',
      bulkImport: 'Bulk Import',
      postMvp: 'Post-MVP',
      incomeLabel: 'Income',
      expenseLabel: 'Expense',
      transferLabel: 'Transfer',
    },
    budgets: {
      title: 'Budgets',
      monthlyBudgets: 'Monthly Budgets',
      setBudget: 'Set Budget',
      budgetSet: 'Budget set successfully',
      overBudget: 'Over Budget',
      overBudgetBy: 'Over budget by',
      ofBudgetUsed: 'of budget used',
      totalBudget: 'Total Budget',
      totalSpent: 'Total Spent',
      remaining: 'Remaining',
      noBudgetsSet: 'No budgets set yet',
      categories: 'Categories',
      food: 'Food',
      bills: 'Bills',
      transport: 'Transport',
      entertainment: 'Entertainment',
      salary: 'Salary',
      other: 'Other',
    },
    accounts: {
      title: 'Accounts',
      yourAccounts: 'Your Accounts',
      totalBalance: 'Total Balance',
      addAccount: 'Add Account',
      editAccount: 'Edit Account',
      deleteAccount: 'Delete Account',
      accountName: 'Account Name',
      accountType: 'Account Type',
      checking: 'Checking',
      savings: 'Savings',
      credit: 'Credit Card',
      currentBalance: 'Current Balance',
      totalNetWorth: 'Total Net Worth',
      noAccounts: 'No accounts yet',
      confirmDeleteAccount: 'Are you sure you want to delete this account?',
      accountDeleted: 'Account deleted successfully',
      cannotDeleteAccount: 'Cannot delete account',
      accountHasTransactions: 'This account has transactions and cannot be deleted',
    },
    settings: {
      title: 'Settings',
      profileSettings: 'Profile Settings',
      manageProfile: 'Manage your profile information and preferences',
      displayName: 'Display Name',
      emailAddress: 'Email Address',
      emailCannotBeChanged: 'Email cannot be changed',
      currency: 'Currency',
      locale: 'Language & Region',
      selectedCurrency: 'Selected',
      selectedLocale: 'Selected',
      saveSettings: 'Save Settings',
      settingsSaved: 'Settings saved successfully',
    },
    categories: {
      food: 'Food',
      bills: 'Bills',
      transport: 'Transport',
      entertainment: 'Entertainment',
      salary: 'Salary',
      other: 'Other',
    },
    transactionTypes: {
      income: 'Income',
      expense: 'Expense',
      transfer: 'Transfer',
    },
    accountTypes: {
      checking: 'Checking',
      savings: 'Savings',
      credit: 'Credit Card',
    },
  },
  
  // Greek translations
  'el-GR': {
    common: {
      loading: 'Φόρτωση...',
      save: 'Αποθήκευση',
      cancel: 'Ακύρωση',
      delete: 'Διαγραφή',
      edit: 'Επεξεργασία',
      add: 'Προσθήκη',
      close: 'Κλείσιμο',
      confirm: 'Επιβεβαίωση',
      yes: 'Ναι',
      no: 'Όχι',
      search: 'Αναζήτηση',
      filter: 'Φίλτρο',
      clear: 'Εκκαθάριση',
      total: 'Σύνολο',
      remaining: 'Υπόλοιπο',
      spent: 'Ξοδεύτηκε',
      budget: 'Προϋπολογισμός',
      amount: 'Ποσό',
      date: 'Ημερομηνία',
      category: 'Κατηγορία',
      notes: 'Σημειώσεις',
      tags: 'Ετικέτες',
      type: 'Τύπος',
      account: 'Λογαριασμός',
      name: 'Όνομα',
      email: 'Email',
      password: 'Κωδικός',
      signIn: 'Σύνδεση',
      signOut: 'Αποσύνδεση',
      demo: 'Demo',
      settings: 'Ρυθμίσεις',
      dashboard: 'Πίνακας',
      transactions: 'Συναλλαγές',
      budgets: 'Προϋπολογισμοί',
      accounts: 'Λογαριασμοί',
      welcome: 'Καλώς ήρθατε',
      yourAccounts: 'Τα υπόλοιπα των λογαριασμών σας',
    },
    navigation: {
      dashboard: 'Πίνακας',
      transactions: 'Συναλλαγές',
      budgets: 'Προϋπολογισμοί',
      accounts: 'Λογαριασμοί',
      settings: 'Ρυθμίσεις',
      signOut: 'Αποσύνδεση',
    },
    signIn: {
      title: 'TrackMyFinances',
      subtitle: 'Πάρτε τον έλεγχο του οικονομικού σας μέλλοντος',
      welcomeBack: 'Καλώς ήρθατε',
      signInToContinue: 'Συνδεθείτε για να αποκτήσετε πρόσβαση στον οικονομικό σας πίνακα',
      emailAddress: 'Διεύθυνση Email',
      enterEmail: 'Εισάγετε τη διεύθυνση email σας',
      enterPassword: 'Εισάγετε τον κωδικό σας',
      forgotPassword: 'Ξεχάσατε τον κωδικό;',
      signInButton: 'Σύνδεση',
      orContinueWith: 'Ή συνεχίστε με',
      tryDemoAccount: 'Δοκιμάστε Demo Λογαριασμό',
      secureFastReliable: 'Ασφαλές • Γρήγορο • Αξιόπιστο',
      signingIn: 'Σύνδεση...',
      loadingDemo: 'Φόρτωση Demo...',
    },
    dashboard: {
      title: 'Πίνακας',
      accountsSummary: 'Σύνοψη Λογαριασμών',
      quickAddTransaction: 'Γρήγορη Προσθήκη Συναλλαγής',
      monthlyOverview: 'Μηνιαία Επισκόπηση',
      netCashFlow: 'Καθαρή Ταμειακή Ροή',
      topSpendingCategories: 'Κορυφαίες Κατηγορίες Δαπανών',
      noSpendingThisMonth: 'Δεν υπάρχουν δαπάνες αυτόν τον μήνα',
      addTransaction: 'Προσθήκη Συναλλαγής',
      viewAllTransactions: 'Προβολή Όλων των Συναλλαγών',
      manageBudgets: 'Διαχείριση Προϋπολογισμών',
      manageAccounts: 'Διαχείριση Λογαριασμών',
    },
    transactions: {
      title: 'Συναλλαγές',
      allTransactions: 'Όλες οι Συναλλαγές',
      filters: 'Φίλτρα',
      dateRange: 'Εύρος Ημερομηνιών',
      currentMonth: 'Τρέχων Μήνας',
      lastMonth: 'Προηγούμενος Μήνας',
      last3Months: 'Τελευταίοι 3 Μήνες',
      last6Months: 'Τελευταίοι 6 Μήνες',
      lastYear: 'Προηγούμενος Χρόνος',
      allTime: 'Όλοι οι Χρόνοι',
      transactionType: 'Τύπος Συναλλαγής',
      income: 'Έσοδα',
      expense: 'Έξοδα',
      transfer: 'Μεταφορά',
      selectAccount: 'Επιλέξτε Λογαριασμό',
      selectCategory: 'Επιλέξτε Κατηγορία',
      addTransaction: 'Προσθήκη Συναλλαγής',
      editTransaction: 'Επεξεργασία Συναλλαγής',
      deleteTransaction: 'Διαγραφή Συναλλαγής',
      confirmDelete: 'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή την συναλλαγή;',
      transactionDeleted: 'Η συναλλαγή διαγράφηκε επιτυχώς',
      noTransactions: 'Δεν υπάρχουν συναλλαγές ακόμα',
      noTransactionsFound: 'Δεν βρέθηκαν συναλλαγές',
      bulkImport: 'Μαζική Εισαγωγή',
      postMvp: 'Post-MVP',
      incomeLabel: 'Έσοδα',
      expenseLabel: 'Έξοδα',
      transferLabel: 'Μεταφορά',
    },
    budgets: {
      title: 'Προϋπολογισμοί',
      monthlyBudgets: 'Μηνιαίοι Προϋπολογισμοί',
      setBudget: 'Ορισμός Προϋπολογισμού',
      budgetSet: 'Ο προϋπολογισμός ορίστηκε επιτυχώς',
      overBudget: 'Υπέρβαση Προϋπολογισμού',
      overBudgetBy: 'Υπέρβαση προϋπολογισμού κατά',
      ofBudgetUsed: 'του προϋπολογισμού χρησιμοποιήθηκε',
      totalBudget: 'Συνολικός Προϋπολογισμός',
      totalSpent: 'Συνολικά Ξοδεύτηκε',
      remaining: 'Υπόλοιπο',
      noBudgetsSet: 'Δεν έχουν οριστεί προϋπολογισμοί ακόμα',
      categories: 'Κατηγορίες',
      food: 'Τροφή',
      bills: 'Λογαριασμοί',
      transport: 'Μεταφορές',
      entertainment: 'Ψυχαγωγία',
      salary: 'Μισθός',
      other: 'Άλλο',
    },
    accounts: {
      title: 'Λογαριασμοί',
      yourAccounts: 'Οι Λογαριασμοί σας',
      totalBalance: 'Συνολικό Υπόλοιπο',
      addAccount: 'Προσθήκη Λογαριασμού',
      editAccount: 'Επεξεργασία Λογαριασμού',
      deleteAccount: 'Διαγραφή Λογαριασμού',
      accountName: 'Όνομα Λογαριασμού',
      accountType: 'Τύπος Λογαριασμού',
      checking: 'Τρεχούμενος',
      savings: 'Αποταμιεύσεις',
      credit: 'Πιστωτική',
      currentBalance: 'Τρέχον Υπόλοιπο',
      totalNetWorth: 'Συνολική Αξία',
      noAccounts: 'Δεν υπάρχουν λογαριασμοί ακόμα',
      confirmDeleteAccount: 'Είστε σίγουροι ότι θέλετε να διαγράψετε αυτόν τον λογαριασμό;',
      accountDeleted: 'Ο λογαριασμός διαγράφηκε επιτυχώς',
      cannotDeleteAccount: 'Δεν μπορεί να διαγραφεί ο λογαριασμός',
      accountHasTransactions: 'Αυτός ο λογαριασμός έχει συναλλαγές και δεν μπορεί να διαγραφεί',
    },
    settings: {
      title: 'Ρυθμίσεις',
      profileSettings: 'Ρυθμίσεις Προφίλ',
      manageProfile: 'Διαχειριστείτε τις πληροφορίες και τις προτιμήσεις του προφίλ σας',
      displayName: 'Όνομα Εμφάνισης',
      emailAddress: 'Διεύθυνση Email',
      emailCannotBeChanged: 'Το email δεν μπορεί να αλλάξει',
      currency: 'Νόμισμα',
      locale: 'Γλώσσα & Περιοχή',
      selectedCurrency: 'Επιλεγμένο',
      selectedLocale: 'Επιλεγμένο',
      saveSettings: 'Αποθήκευση Ρυθμίσεων',
      settingsSaved: 'Οι ρυθμίσεις αποθηκεύτηκαν επιτυχώς',
    },
    categories: {
      food: 'Τροφή',
      bills: 'Λογαριασμοί',
      transport: 'Μεταφορές',
      entertainment: 'Ψυχαγωγία',
      salary: 'Μισθός',
      other: 'Άλλο',
    },
    transactionTypes: {
      income: 'Έσοδα',
      expense: 'Έξοδα',
      transfer: 'Μεταφορά',
    },
    accountTypes: {
      checking: 'Τρεχούμενος',
      savings: 'Αποταμιεύσεις',
      credit: 'Πιστωτική',
    },
  },
  
  // Add more languages as needed - for now, defaulting to English for other locales
  'en-GB': {} as Translations,
  'en-CA': {} as Translations,
  'en-AU': {} as Translations,
  'en-NZ': {} as Translations,
  'en-IN': {} as Translations,
  'en-SG': {} as Translations,
  'en-HK': {} as Translations,
  'fr-FR': {} as Translations,
  'fr-CA': {} as Translations,
  'fr-BE': {} as Translations,
  'fr-CH': {} as Translations,
  'de-DE': {} as Translations,
  'de-AT': {} as Translations,
  'de-CH': {} as Translations,
  'es-ES': {} as Translations,
  'es-MX': {} as Translations,
  'es-AR': {} as Translations,
  'es-CO': {} as Translations,
  'es-CL': {} as Translations,
  'es-PE': {} as Translations,
  'es-VE': {} as Translations,
  'it-IT': {} as Translations,
  'it-CH': {} as Translations,
  'pt-BR': {} as Translations,
  'pt-PT': {} as Translations,
  'nl-NL': {} as Translations,
  'nl-BE': {} as Translations,
  'sv-SE': {} as Translations,
  'no-NO': {} as Translations,
  'da-DK': {} as Translations,
  'fi-FI': {} as Translations,
  'pl-PL': {} as Translations,
  'cs-CZ': {} as Translations,
  'hu-HU': {} as Translations,
  'ru-RU': {} as Translations,
  'ja-JP': {} as Translations,
  'ko-KR': {} as Translations,
  'zh-CN': {} as Translations,
  'zh-TW': {} as Translations,
  'zh-HK': {} as Translations,
  'th-TH': {} as Translations,
  'vi-VN': {} as Translations,
  'id-ID': {} as Translations,
  'ms-MY': {} as Translations,
  'tl-PH': {} as Translations,
  'ar-SA': {} as Translations,
  'ar-AE': {} as Translations,
  'ar-EG': {} as Translations,
  'he-IL': {} as Translations,
  'tr-TR': {} as Translations,
  'uk-UA': {} as Translations,
  'ro-RO': {} as Translations,
  'bg-BG': {} as Translations,
  'hr-HR': {} as Translations,
  'sk-SK': {} as Translations,
  'sl-SI': {} as Translations,
  'et-EE': {} as Translations,
  'lv-LV': {} as Translations,
  'lt-LT': {} as Translations,
}

// Helper function to get translations for a locale, falling back to English
export function getTranslations(locale: Locale): Translations {
  const translation = translations[locale]
  if (translation && Object.keys(translation).length > 0) {
    return translation
  }
  return translations['en-US']
}

// Helper function to get a specific translation key
export function t(locale: Locale, key: string): string {
  const translation = getTranslations(locale)
  const keys = key.split('.')
  let value: any = translation
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      // Fallback to English if key not found
      const englishTranslation = translations['en-US']
      value = englishTranslation
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return key // Return the key itself if not found
        }
      }
      break
    }
  }
  
  return typeof value === 'string' ? value : key
}
