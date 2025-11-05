# Vyapaar Accounting App - Design Guidelines

## Design Approach
**Reference-Based Approach**: Modern SaaS accounting platforms with emphasis on data clarity and financial operations (inspired by QuickBooks, Zoho Books, FreshBooks) with a darker, more modern aesthetic.

## Core Design Principles
- **Data-First Interface**: Financial information takes priority with clear hierarchy
- **Efficiency-Focused**: Quick access to common accounting tasks
- **Professional Aesthetic**: Dark, clean, business-appropriate styling

---

## Color Palette (User-Specified)
```
Background: #0E1626 (Dark navy)
Accent/Primary: #14B8A6 (Teal)
Card Background: #1A2332 (Lighter navy)
Text Primary: #F9FAFB (Near white)
Text Secondary: #9CA3AF (Gray)
Success: #10B981 (Green)
Warning: #F59E0B (Amber)
Danger: #EF4444 (Red)
Border: #2D3748 (Subtle gray)
```

---

## Typography System

**Font Families**:
- Primary: Inter or System UI fonts via CDN
- Monospace: JetBrains Mono for invoice IDs, amounts

**Hierarchy**:
- Page Titles: text-2xl font-semibold
- Section Headers: text-lg font-medium
- Card Titles: text-base font-medium
- Body Text: text-sm
- Captions/Labels: text-xs text-gray-400
- Currency Amounts: text-lg font-semibold (larger for KPIs: text-3xl)

---

## Layout System

**Spacing Units** (Tailwind):
Primary spacing: 4, 6, 8 units (p-4, p-6, p-8, gap-4, gap-6)
Consistent card padding: p-6
Section spacing: space-y-6

**Container Widths**:
- Full app: max-w-7xl mx-auto
- Forms: max-w-2xl
- Modals: max-w-lg

**Grid Patterns**:
- KPI Cards: grid-cols-1 md:grid-cols-3 gap-6
- Invoice Table: Full-width with horizontal scroll on mobile
- Form Sections: Single column stacked layout

---

## Component Library

### Navigation
**Bottom Tab Bar** (Mobile Primary):
- Fixed bottom position with 4 tabs: Dashboard | Invoices | Inventory | Settings
- Icons from Lucide React
- Active state: Accent color (#14B8A6)
- Height: h-16, backdrop-blur effect

**Top Header** (Desktop):
- Company logo/name left
- User profile right
- Height: h-16, sticky top-0

### Cards
- Base: `bg-[#1A2332] rounded-2xl shadow-sm p-6`
- Hover: subtle scale transform (scale-[1.01])
- Border: border border-gray-700 (optional for emphasis)

### Buttons
**Primary**: `bg-[#14B8A6] hover:bg-[#0F9B8E] text-white px-4 py-2 rounded-lg font-medium`
**Secondary**: `bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg`
**Ghost**: `text-[#14B8A6] hover:bg-gray-800 px-4 py-2 rounded-lg`
**Danger**: `bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg`

### Form Inputs
- Base: `bg-[#0E1626] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#14B8A6] focus:ring-1 focus:ring-[#14B8A6]`
- Labels: `text-sm font-medium text-gray-300 mb-2`
- Dropdowns: Same styling as inputs with chevron icon

### Tables
- Header: `bg-gray-800 text-gray-300 text-xs font-semibold uppercase`
- Rows: `border-b border-gray-700 hover:bg-gray-800/50`
- Cell padding: `px-4 py-3`
- Responsive: Horizontal scroll on mobile with sticky first column

### Status Badges
- Paid: `bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-medium`
- Pending: `bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-xs font-medium`
- Overdue: `bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-medium`

### KPI Cards
- Large currency amount (text-3xl font-bold)
- Small label above (text-xs text-gray-400)
- Optional trend indicator with arrow icon
- Subtle gradient background option

### Toast Notifications
- Position: top-right, fixed
- Success: Green accent with checkmark icon
- Error: Red accent with X icon
- Duration: 3 seconds auto-dismiss

---

## Page-Specific Layouts

### Auth Page
- Centered card (max-w-md) on dark background
- Logo at top
- Form inputs stacked with consistent spacing
- Social login button with border
- Toggle between Login/Signup modes

### Company Setup
- Multi-section form in single scrollable card
- Section headers with dividers
- 2-column grid for compact fields (Name/Legal Name)
- Save button sticky at bottom on mobile

### Dashboard
- 3-column KPI grid at top
- Quick action buttons in 2x2 grid below KPIs
- Chart section (full-width card)
- Low stock alert list (compact table)

### Invoices List
- Filter pills at top (All/Paid/Pending/Overdue)
- Aging summary cards (4-column grid)
- Full-width invoice table
- "New Invoice" FAB button (bottom-right on mobile)

### New Invoice Page
- Customer selection at top
- Line items table with "Add Item" row
- Auto-calculated totals section (right-aligned)
- Action buttons at bottom (Save Draft | Create Invoice)

---

## Icons
**Library**: Lucide React (via npm)
Common icons: Home, FileText, Package, Settings, Plus, Download, ChevronDown, AlertCircle, TrendingUp

---

## Responsive Behavior
- Mobile-first approach
- Bottom navigation visible only on <768px
- Tables scroll horizontally on mobile
- KPI cards stack to single column on mobile
- Forms maintain single column on all screens

---

## Currency Formatting
- All amounts prefixed with ₹ symbol
- Comma-separated thousands (₹1,24,500)
- 2 decimal places for precision (₹1,234.50)

---

## Images
**No hero images required** - This is a data-focused business application. All visual interest comes from charts, cards, and data visualization rather than photography.