export interface User {
  id: number;
  email: string;
  password: string;
  companyIds: number[];
}

export interface Company {
  id: number;
  name: string;
  legalName: string;
  address: string;
  businessType: string;
  gst: string;
  gstType: string;
  state: string;
  bank: {
    name: string;
    ifsc: string;
    branch: string;
    account: string;
  };
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface InvoiceItem {
  name: string;
  qty: number;
  price: number;
  tax: number;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  customerId: number;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface InventoryItem {
  id: number;
  name: string;
  qty: number;
  threshold: number;
  price: number;
}

export interface DashboardData {
  kpis: {
    sales: number;
    expenses: number;
    profit: number;
  };
  trends: Array<{
    month: string;
    sales: number;
    expenses: number;
  }>;
}

const STORAGE_KEYS = {
  USERS: 'vyapaar_users',
  COMPANIES: 'vyapaar_companies',
  CUSTOMERS: 'vyapaar_customers',
  INVOICES: 'vyapaar_invoices',
  INVENTORY: 'vyapaar_inventory',
  DASHBOARD: 'vyapaar_dashboard',
  CURRENT_USER: 'vyapaar_current_user',
  CURRENT_COMPANY: 'vyapaar_current_company',
};

function getFromStorage<T>(key: string, defaultValue: T): T {
  const stored = localStorage.getItem(key);
  if (!stored) return defaultValue;
  try {
    return JSON.parse(stored);
  } catch {
    return defaultValue;
  }
}

function setToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  getUsers: (): User[] => getFromStorage(STORAGE_KEYS.USERS, []),
  setUsers: (users: User[]): void => setToStorage(STORAGE_KEYS.USERS, users),
  
  getCompanies: (): Company[] => getFromStorage(STORAGE_KEYS.COMPANIES, []),
  setCompanies: (companies: Company[]): void => setToStorage(STORAGE_KEYS.COMPANIES, companies),
  
  getCustomers: (): Customer[] => getFromStorage(STORAGE_KEYS.CUSTOMERS, []),
  setCustomers: (customers: Customer[]): void => setToStorage(STORAGE_KEYS.CUSTOMERS, customers),
  
  getInvoices: (): Invoice[] => getFromStorage(STORAGE_KEYS.INVOICES, []),
  setInvoices: (invoices: Invoice[]): void => setToStorage(STORAGE_KEYS.INVOICES, invoices),
  
  getInventory: (): InventoryItem[] => getFromStorage(STORAGE_KEYS.INVENTORY, []),
  setInventory: (inventory: InventoryItem[]): void => setToStorage(STORAGE_KEYS.INVENTORY, inventory),
  
  getDashboard: (): DashboardData => getFromStorage(STORAGE_KEYS.DASHBOARD, {
    kpis: { sales: 0, expenses: 0, profit: 0 },
    trends: [],
  }),
  setDashboard: (dashboard: DashboardData): void => setToStorage(STORAGE_KEYS.DASHBOARD, dashboard),
  
  getCurrentUser: (): User | null => getFromStorage(STORAGE_KEYS.CURRENT_USER, null),
  setCurrentUser: (user: User | null): void => setToStorage(STORAGE_KEYS.CURRENT_USER, user),
  
  getCurrentCompany: (): Company | null => getFromStorage(STORAGE_KEYS.CURRENT_COMPANY, null),
  setCurrentCompany: (company: Company | null): void => setToStorage(STORAGE_KEYS.CURRENT_COMPANY, company),
};

export function initializeSeedData() {
  if (storage.getUsers().length === 0) {
    storage.setUsers([
      { id: 1, email: 'test@vyapaar.com', password: '123456', companyIds: [1] },
    ]);
  }

  if (storage.getCompanies().length === 0) {
    storage.setCompanies([
      {
        id: 1,
        name: 'Acme Corp',
        legalName: 'Acme Corporation Private Limited',
        address: 'Mumbai, Maharashtra',
        businessType: 'Services',
        gst: '27ABCDE1234F1Z5',
        gstType: 'Regular',
        state: 'Maharashtra',
        bank: {
          name: 'HDFC Bank',
          ifsc: 'HDFC0001234',
          branch: 'Mumbai Main',
          account: '123456789012',
        },
      },
    ]);
  }

  if (storage.getCustomers().length === 0) {
    storage.setCustomers([
      { id: 1, name: 'Tommy Anderson', email: 'tommy@example.com', phone: '9876543210' },
      { id: 2, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '9876543211' },
      { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '9876543212' },
    ]);
  }

  if (storage.getInvoices().length === 0) {
    storage.setInvoices([
      {
        id: 1,
        invoiceNumber: 'INV-001',
        customerId: 1,
        date: '2025-10-15',
        dueDate: '2025-11-15',
        items: [{ name: 'Web Development Service', qty: 1, price: 50000, tax: 18 }],
        subtotal: 50000,
        tax: 9000,
        total: 59000,
        status: 'Paid',
      },
      {
        id: 2,
        invoiceNumber: 'INV-002',
        customerId: 2,
        date: '2025-10-20',
        dueDate: '2025-11-20',
        items: [{ name: 'Design Consultation', qty: 2, price: 15000, tax: 18 }],
        subtotal: 30000,
        tax: 5400,
        total: 35400,
        status: 'Pending',
      },
      {
        id: 3,
        invoiceNumber: 'INV-003',
        customerId: 3,
        date: '2025-09-10',
        dueDate: '2025-10-10',
        items: [{ name: 'Marketing Services', qty: 1, price: 40000, tax: 18 }],
        subtotal: 40000,
        tax: 7200,
        total: 47200,
        status: 'Overdue',
      },
    ]);
  }

  if (storage.getInventory().length === 0) {
    storage.setInventory([
      { id: 1, name: 'Product A', qty: 8, threshold: 10, price: 1200 },
      { id: 2, name: 'Product B', qty: 3, threshold: 5, price: 2500 },
      { id: 3, name: 'Product C', qty: 25, threshold: 10, price: 850 },
    ]);
  }

  if (!storage.getDashboard().kpis.sales) {
    storage.setDashboard({
      kpis: {
        sales: 124500,
        expenses: 54320,
        profit: 70180,
      },
      trends: [
        { month: 'Jul', sales: 45000, expenses: 20000 },
        { month: 'Aug', sales: 52000, expenses: 18000 },
        { month: 'Sep', sales: 48000, expenses: 22000 },
        { month: 'Oct', sales: 65000, expenses: 25000 },
        { month: 'Nov', sales: 58000, expenses: 21000 },
      ],
    });
  }
}
