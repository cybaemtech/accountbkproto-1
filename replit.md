# Vyapaar Accounting App

## Overview

Vyapaar is a modern business accounting application designed for managing invoices, inventory, customers, and expenses. The application provides a comprehensive financial management system with a focus on data clarity, operational efficiency, and a professional dark-themed aesthetic. Built as a full-stack TypeScript application, it features a React-based frontend with a Node.js/Express backend, designed to support multi-company accounting workflows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18** with TypeScript for type-safe component development
- **Vite** as the build tool and development server, configured for fast HMR and optimized production builds
- **Wouter** for lightweight client-side routing instead of React Router
- **TanStack Query (React Query)** for server state management and data fetching

**UI Component System**
- **shadcn/ui** component library with Radix UI primitives providing accessible, unstyled base components
- **Tailwind CSS** for utility-first styling with custom design system tokens
- **Design System**: Dark theme with custom color palette (navy background #0E1626, teal accent #14B8A6)
- Typography using Inter for UI text and JetBrains Mono for financial data/invoice IDs
- Responsive design with mobile-first approach, including dedicated bottom navigation for mobile devices

**State Management Strategy**
- Local storage-based persistence layer (`client/src/utils/storage.ts`) serving as the primary data interface
- In-memory data structures for users, companies, customers, invoices, and inventory
- Session-based authentication with current user and company tracking
- React hooks for component-level state management

### Backend Architecture

**Server Framework**
- **Express.js** with TypeScript for API routing and middleware
- Configured for ESM (ECMAScript Modules) with `type: "module"` in package.json
- Custom logging middleware for request/response tracking
- JSON body parsing with raw body preservation for webhook support

**Database Layer**
- **Drizzle ORM** configured for PostgreSQL compatibility
- **Neon Database** serverless PostgreSQL driver (`@neondatabase/serverless`)
- Schema defined in `shared/schema.ts` for type-safe database operations
- Migration system via `drizzle-kit` with migrations output to `./migrations`
- Currently implements minimal schema (users table) with extensibility for full accounting data model

**Architecture Pattern**
- **Shared type definitions** between client and server via `shared/` directory
- Storage abstraction interface (`IStorage`) allowing swap between in-memory and database implementations
- Separation of concerns: routing logic in `server/routes.ts`, storage layer in `server/storage.ts`

### Application Structure

**Route Organization**
- `/` - Authentication (login/signup)
- `/company-setup` - Company onboarding flow
- `/dashboard` - KPI overview with sales metrics and charts
- `/billing-hub` - Invoice management hub
- `/invoices` - Invoice list with filtering and export
- `/new-invoice` - Invoice creation form
- `/inventory` - Stock management and alerts
- `/settings` - User and company settings

**Protected Routes**
- `ProtectedRoute` component enforcing authentication
- Company context validation for multi-tenant support
- Conditional navigation based on setup completion state

**Data Models (with Multi-Company Isolation)**
- **User**: Authentication with email/password, associated companyIds array
- **Company**: Business details, GST info, bank details
- **Customer**: Contact information with companyId for multi-tenant isolation
- **Invoice**: companyId, line items, tax calculations, automatic status tracking (Paid/Pending/Overdue)
- **InventoryItem**: companyId, stock quantities, pricing, low-stock threshold alerts

**Multi-Company Architecture**
- All business entities (customers, invoices, inventory) include companyId field
- Storage layer filters all read operations by currentCompany automatically
- Each company's data is completely isolated from other companies
- Invoice numbering is scoped per company (INV-001, INV-002, etc.)
- Dashboard KPIs and trends compute only from current company's invoices

### External Dependencies

**UI Libraries**
- **Radix UI**: Complete suite of accessible headless components (dialogs, dropdowns, popovers, etc.)
- **Recharts**: Chart library for sales/expense visualization
- **lucide-react**: Icon system for consistent UI iconography
- **Embla Carousel**: Touch-friendly carousel component
- **date-fns**: Date formatting and manipulation
- **react-hook-form** with **@hookform/resolvers**: Form state management with validation
- **Zod**: Schema validation integrated with Drizzle ORM via `drizzle-zod`

**Development Tools**
- **Replit-specific plugins**: Cartographer (code navigation), dev banner, runtime error overlay
- **TypeScript**: Strict type checking with ESNext module resolution
- **PostCSS & Autoprefixer**: CSS processing pipeline
- **esbuild**: Production server bundling

**Database & ORM**
- **@neondatabase/serverless**: Serverless PostgreSQL driver optimized for edge/serverless environments
- **drizzle-orm**: TypeScript-first ORM with SQL-like query builder
- **drizzle-kit**: CLI tools for migrations and schema management
- **connect-pg-simple**: PostgreSQL session store for Express sessions (dependency present, likely for future session management)

**Key Architectural Decisions**
- **localStorage Persistence**: All data persists in browser localStorage with no backend/database (per project requirements)
- **Multi-Company Scoping**: Storage accessors automatically filter by currentCompany; creation flows attach active companyId
- **Real-Time KPI Calculation**: Dashboard computes all metrics from actual paid invoices; no mock or hardcoded values
- **Date-Based Status Updates**: Invoice statuses (Overdue/Pending) update automatically using proper Date object comparisons
- **Type Safety**: End-to-end TypeScript with strict typing across data models
- **Component-Driven**: Modular UI using shadcn/ui components with dark theme (#0E1626 background, #14B8A6 teal accent)
- **Mobile-First Design**: Responsive layouts with dedicated bottom navigation for mobile devices
- **Protected Routes**: ProtectedRoute component enforces authentication and company selection before accessing app pages