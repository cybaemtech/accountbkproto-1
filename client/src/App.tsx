import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/ProtectedRoute";
import Auth from "@/pages/Auth";
import CompanySetup from "@/pages/CompanySetup";
import Dashboard from "@/pages/Dashboard";
import BillingHub from "@/pages/BillingHub";
import InvoicesList from "@/pages/InvoicesList";
import NewInvoice from "@/pages/NewInvoice";
import Inventory from "@/pages/Inventory";
import Settings from "@/pages/Settings";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Auth} />
      <Route path="/company-setup">
        <ProtectedRoute requireCompany={false}>
          <CompanySetup />
        </ProtectedRoute>
      </Route>
      <Route path="/dashboard">
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/billing-hub">
        <ProtectedRoute>
          <BillingHub />
        </ProtectedRoute>
      </Route>
      <Route path="/invoices">
        <ProtectedRoute>
          <InvoicesList />
        </ProtectedRoute>
      </Route>
      <Route path="/new-invoice">
        <ProtectedRoute>
          <NewInvoice />
        </ProtectedRoute>
      </Route>
      <Route path="/inventory">
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      </Route>
      <Route component={Auth} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
