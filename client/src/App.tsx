import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
      <Route path="/company-setup" component={CompanySetup} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/billing-hub" component={BillingHub} />
      <Route path="/invoices" component={InvoicesList} />
      <Route path="/new-invoice" component={NewInvoice} />
      <Route path="/inventory" component={Inventory} />
      <Route path="/settings" component={Settings} />
      <Route component={Auth} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
