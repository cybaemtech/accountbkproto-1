import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { storage, InvoiceItem } from '@/utils/storage';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import AddCustomerDialog from '@/components/AddCustomerDialog';

export default function NewInvoice() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [customers, setCustomers] = useState(storage.getCustomers());
  const [invoices] = useState(storage.getInvoices());
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { name: '', qty: 1, price: 0, tax: 18 }
  ]);

  const addItem = () => {
    setItems([...items, { name: '', qty: 1, price: 0, tax: 18 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const totalTax = items.reduce((sum, item) => sum + (item.qty * item.price * item.tax / 100), 0);
  const grandTotal = subtotal + totalTax;

  const handleCreate = () => {
    if (!customerId) {
      toast({
        title: 'Error',
        description: 'Please select a customer',
        variant: 'destructive',
      });
      return;
    }

    if (items.some(item => !item.name || item.qty <= 0 || item.price <= 0)) {
      toast({
        title: 'Error',
        description: 'Please fill in all item details correctly',
        variant: 'destructive',
      });
      return;
    }

    const currentCompany = storage.getCurrentCompany();
    if (!currentCompany) {
      toast({
        title: 'Error',
        description: 'No company selected',
        variant: 'destructive',
      });
      return;
    }

    const allInvoices = storage.getAllInvoices();
    const companyInvoices = allInvoices.filter(i => i.companyId === currentCompany.id);
    const invoiceNumber = `INV-${String(companyInvoices.length + 1).padStart(3, '0')}`;
    
    const finalDueDate = dueDate || date;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDateObj = new Date(finalDueDate);
    dueDateObj.setHours(0, 0, 0, 0);
    
    const isOverdue = dueDateObj < today;
    const invoiceStatus: 'Overdue' | 'Pending' = isOverdue ? 'Overdue' : 'Pending';
    
    const newInvoice = {
      id: allInvoices.length + 1,
      companyId: currentCompany.id,
      invoiceNumber,
      customerId,
      date,
      dueDate: finalDueDate,
      items,
      subtotal,
      tax: totalTax,
      total: grandTotal,
      status: invoiceStatus,
    };

    storage.setInvoices([...allInvoices, newInvoice]);

    toast({
      title: 'Invoice created',
      description: `Invoice ${invoiceNumber} has been created successfully`,
    });

    setLocation('/invoices');
  };

  const handleCustomerAdded = () => {
    setCustomers(storage.getCustomers());
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-card-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setLocation('/invoices')}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-xl font-bold text-foreground">New Invoice</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        <Card className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="customer">Customer</Label>
              <div className="flex gap-2 mt-1">
                <Select 
                  value={customerId?.toString() || ''} 
                  onValueChange={(value) => setCustomerId(Number(value))}
                >
                  <SelectTrigger id="customer" data-testid="select-customer" className="flex-1">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddCustomer(true)}
                  data-testid="button-add-customer-quick"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={`INV-${String(invoices.length + 1).padStart(3, '0')}`}
                disabled
                className="mt-1 font-mono"
                data-testid="input-invoice-number"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1"
                data-testid="input-date"
              />
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1"
                data-testid="input-due-date"
              />
            </div>
          </div>

          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Line Items</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={addItem}
                data-testid="button-add-item"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-12 md:col-span-4">
                    <Label htmlFor={`item-name-${index}`} className="text-xs">Item Name</Label>
                    <Input
                      id={`item-name-${index}`}
                      value={item.name}
                      onChange={(e) => updateItem(index, 'name', e.target.value)}
                      placeholder="Service/Product"
                      data-testid={`input-item-name-${index}`}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label htmlFor={`item-qty-${index}`} className="text-xs">Qty</Label>
                    <Input
                      id={`item-qty-${index}`}
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateItem(index, 'qty', Number(e.target.value))}
                      data-testid={`input-item-qty-${index}`}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-4 md:col-span-2">
                    <Label htmlFor={`item-price-${index}`} className="text-xs">Price</Label>
                    <Input
                      id={`item-price-${index}`}
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(index, 'price', Number(e.target.value))}
                      data-testid={`input-item-price-${index}`}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-3 md:col-span-2">
                    <Label htmlFor={`item-tax-${index}`} className="text-xs">Tax %</Label>
                    <Input
                      id={`item-tax-${index}`}
                      type="number"
                      value={item.tax}
                      onChange={(e) => updateItem(index, 'tax', Number(e.target.value))}
                      data-testid={`input-item-tax-${index}`}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(index)}
                      disabled={items.length === 1}
                      data-testid={`button-remove-item-${index}`}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 mt-6">
            <div className="max-w-sm ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-mono font-semibold text-foreground">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax:</span>
                <span className="font-mono font-semibold text-foreground">{formatCurrency(totalTax)}</span>
              </div>
              <div className="flex justify-between text-lg border-t border-border pt-2">
                <span className="font-semibold text-foreground">Grand Total:</span>
                <span className="font-mono font-bold text-foreground">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => console.log('Save draft')}
              data-testid="button-save-draft"
            >
              Save Draft
            </Button>
            <Button
              className="flex-1"
              onClick={handleCreate}
              data-testid="button-create-invoice"
            >
              Create Invoice
            </Button>
          </div>
        </Card>
      </main>

      <AddCustomerDialog
        open={showAddCustomer}
        onOpenChange={setShowAddCustomer}
        onCustomerAdded={handleCustomerAdded}
      />
    </div>
  );
}
