import { CreditCard } from 'lucide-react';
import { Invoice } from '../../types/subscription';

interface BillingHistoryListProps {
  invoices: Invoice[];
}

export function BillingHistoryList({ invoices }: BillingHistoryListProps) {
  return (
    <div className="rounded-2xl bg-[#F0EEE8] p-6">
      <h2 className="text-lg font-semibold text-[#121D33]">Billing History</h2>

      {invoices.length === 0 ? (
        <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-white py-12 text-center">
          <CreditCard className="h-6 w-6 text-[#8A93A6]" />
          <p className="mt-3 text-sm font-medium text-[#121D33]">No billing history yet</p>
          <p className="mt-1 text-xs text-[#8A93A6]">Your invoices will appear here once you upgrade.</p>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-[#E5E2DA] rounded-xl bg-white">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between px-5 py-4 text-sm">
              <span className="text-[#121D33]">{new Date(invoice.date).toLocaleDateString('en-GB')}</span>
              <span className="capitalize text-[#8A93A6]">{invoice.planId}</span>
              <span className="font-medium text-[#121D33]">₦{invoice.amount.toLocaleString('en-NG')}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  invoice.status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : invoice.status === 'failed'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-[#F7F5F0] text-[#8A93A6]'
                }`}
              >
                {invoice.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}