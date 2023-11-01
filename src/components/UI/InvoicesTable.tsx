import React, { useEffect, useState } from 'react';
import InvoicesTableItem from '../parts/InvoicesTableItem';

interface Invoice {
  id: string;
  invoice: string;
  total: string;
  status: string;
  customer: string;
  issueddate: string;
  paiddate: string;
  type: string;
}

interface InvoicesTableProps {
  selectedItems: (selected: string[]) => void;
}

function InvoicesTable({ selectedItems }: InvoicesTableProps) {
  const invoices: Invoice[] = [
    {
      id: '0',
      invoice: '#123567',
      total: '$129.00',
      status: 'Overdue',
      customer: 'Dominik Lamakani',
      issueddate: '22/07/2021',
      paiddate: '-',
      type: 'Subscription',
    },
    // ... (data lainnya)
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [list, setList] = useState<Invoice[]>([]);

  useEffect(() => {
    setList(invoices);
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map((invoice) => invoice.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck((prevIsCheck) =>
      checked ? [...prevIsCheck, id] : prevIsCheck.filter((item) => item !== id)
    );
  };

  useEffect(() => {
    selectedItems(isCheck);
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">
          Invoices <span className="text-slate-400 font-medium">67</span>
        </h2>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input
                        className="form-checkbox"
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </label>
                  </div>
                </th>
                {/* ... (kolom lainnya) */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {list.map((invoice) => (
                <InvoicesTableItem
                  key={invoice.id}
                  id={invoice.id}
                  invoice={invoice.invoice}
                  total={invoice.total}
                  status={invoice.status}
                  customer={invoice.customer}
                  issueddate={invoice.issueddate}
                  paiddate={invoice.paiddate}
                  type={invoice.type}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(invoice.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default InvoicesTable;
