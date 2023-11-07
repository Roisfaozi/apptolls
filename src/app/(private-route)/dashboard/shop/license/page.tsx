import Link from 'next/link'

function page() {
  return (
    <div className="col-span-full bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
        <header>
          <h2 className="font-semibold text-slate-800 text-xl">Licenses</h2>
        </header>
        <div>
          <Link className="btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white" href="/shop/products">Add License</Link>
        </div>
      </div>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Product</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Sources</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">User</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Purchased At</div>
                </th>

              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {/* Row */}
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="shrink-0 rounded-full mr-2 sm:mr-3 bg-sky-500">
                      <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                        <path d="M18 26a8 8 0 118-8 8.009 8.009 0 01-8 8zm0-14a6 6 0 100 12 6 6 0 000-12z" />
                      </svg>
                    </div>
                    <div className="font-medium text-slate-800">Digital Marketing Course</div>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex shrink-0 -space-x-3 -ml-px">
                    <p className="text-base">LELE</p>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 fill-current text-slate-400 shrink-0 mr-2" viewBox="0 0 16 16">
                      <path d="M4.3 4.5c1.9-1.9 5.1-1.9 7 0 .7.7 1.2 1.7 1.4 2.7l2-.3c-.2-1.5-.9-2.8-1.9-3.8C10.1.4 5.7.4 2.9 3.1L.7.9 0 7.3l6.4-.7-2.1-2.1zM15.6 8.7l-6.4.7 2.1 2.1c-1.9 1.9-5.1 1.9-7 0-.7-.7-1.2-1.7-1.4-2.7l-2 .3c.2 1.5.9 2.8 1.9 3.8 1.4 1.4 3.1 2 4.9 2 1.8 0 3.6-.7 4.9-2l2.2 2.2.8-6.4z" />
                    </svg>
                    <div>Subscription</div>
                  </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                  <div className="text-center">12,996</div>
                </td>

              </tr>

            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default page