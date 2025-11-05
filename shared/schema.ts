import { z } from "zod";

// Company Types
export const companySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Company name is required"),
  gst: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  createdAt: z.string(),
});

export type Company = z.infer<typeof companySchema>;

// Customer Types
export const customerSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Customer name is required"),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  gstNumber: z.string().optional(),
  billingAddress: z.string().optional(),
  companyId: z.string(),
  createdAt: z.string(),
});

export const insertCustomerSchema = customerSchema.omit({ id: true, createdAt: true });

export type Customer = z.infer<typeof customerSchema>;
export type InsertCustomer = z.infer<typeof insertCustomerSchema>;

// Inventory Item Types
export const inventoryItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Item name is required"),
  sku: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().min(0),
  price: z.number().min(0),
  lowStockThreshold: z.number().min(0).default(10),
  companyId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertInventoryItemSchema = inventoryItemSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type InventoryItem = z.infer<typeof inventoryItemSchema>;
export type InsertInventoryItem = z.infer<typeof insertInventoryItemSchema>;

// Invoice Item Types
export const invoiceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Item name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  rate: z.number().min(0, "Rate must be positive"),
  tax: z.number().min(0).max(100).default(0),
  total: z.number(),
});

export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

// Invoice Types
export const invoiceStatusSchema = z.enum(["paid", "pending", "overdue", "cancelled"]);

export const invoiceSchema = z.object({
  id: z.string(),
  invoiceNumber: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  date: z.string(),
  dueDate: z.string(),
  items: z.array(invoiceItemSchema),
  subtotal: z.number(),
  tax: z.number(),
  total: z.number(),
  status: invoiceStatusSchema,
  notes: z.string().optional(),
  companyId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const insertInvoiceSchema = invoiceSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type Invoice = z.infer<typeof invoiceSchema>;
export type InsertInvoice = z.infer<typeof insertInvoiceSchema>;
export type InvoiceStatus = z.infer<typeof invoiceStatusSchema>;

// Transaction Types
export const transactionTypeSchema = z.enum(["income", "expense"]);

export const transactionSchema = z.object({
  id: z.string(),
  type: transactionTypeSchema,
  amount: z.number(),
  description: z.string(),
  category: z.string(),
  date: z.string(),
  invoiceId: z.string().optional(),
  companyId: z.string(),
  createdAt: z.string(),
});

export const insertTransactionSchema = transactionSchema.omit({ id: true, createdAt: true });

export type Transaction = z.infer<typeof transactionSchema>;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type TransactionType = z.infer<typeof transactionTypeSchema>;

// User Types (for authentication)
export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export const insertUserSchema = userSchema.pick({
  username: true,
  password: true,
});

export type User = z.infer<typeof userSchema>;
export type InsertUser = z.infer<typeof insertUserSchema>;
