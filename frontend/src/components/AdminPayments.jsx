// "use client"

// import { useState, useEffect } from "react"

// const AdminPayments = () => {
//   const [payments, setPayments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [filter, setFilter] = useState("all")

//   useEffect(() => {
//     fetchPayments()
//   }, [])

//   const fetchPayments = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/payments`)
//       const data = await res.json()
//       setPayments(data.reverse())
//     } catch (error) {
//       console.error("Error fetching payments:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const filteredPayments = payments.filter((payment) => {
//     if (filter === "all") return true
//     if (filter === "cashfree") return payment.gateway === "cashfree"
//     if (filter === "razorpay") return payment.gateway === "razorpay"
//     if (filter === "success") return payment.status === "SUCCESS"
//     if (filter === "pending") return payment.status === "PENDING"
//     return true
//   })

//   const getStatusBadge = (status) => {
//     const colors = {
//       SUCCESS: "bg-green-100 text-green-800",
//       PENDING: "bg-yellow-100 text-yellow-800",
//       FAILED: "bg-red-100 text-red-800",
//     }
//     return colors[status] || "bg-gray-100 text-gray-800"
//   }

//   const getGatewayBadge = (gateway) => {
//     const colors = {
//       cashfree: "bg-purple-100 text-purple-800",
//       razorpay: "bg-indigo-100 text-indigo-800",
//     }
//     return colors[gateway] || "bg-gray-100 text-gray-800"
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-xl text-gray-600">Loading payments...</div>
//       </div>
//     )
//   }

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Payment Records</h2>
//         <button
//           onClick={fetchPayments}
//           className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Refresh
//         </button>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow-md mb-6">
//         <div className="flex gap-2 flex-wrap">
//           <button
//             onClick={() => setFilter("all")}
//             className={`px-4 py-2 rounded-md transition ${
//               filter === "all" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilter("cashfree")}
//             className={`px-4 py-2 rounded-md transition ${
//               filter === "cashfree" ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Cashfree
//           </button>
//           <button
//             onClick={() => setFilter("razorpay")}
//             className={`px-4 py-2 rounded-md transition ${
//               filter === "razorpay" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Razorpay
//           </button>
//           <button
//             onClick={() => setFilter("success")}
//             className={`px-4 py-2 rounded-md transition ${
//               filter === "success" ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Success
//           </button>
//           <button
//             onClick={() => setFilter("pending")}
//             className={`px-4 py-2 rounded-md transition ${
//               filter === "pending" ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-700"
//             }`}
//           >
//             Pending
//           </button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gateway</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {filteredPayments.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
//                     No payments found
//                   </td>
//                 </tr>
//               ) : (
//                 filteredPayments.map((payment) => (
//                   <tr key={payment._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 text-sm text-gray-900">{payment.orderId}</td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900">{payment.customerName}</div>
//                       <div className="text-sm text-gray-500">{payment.customerEmail}</div>
//                       <div className="text-sm text-gray-500">{payment.customerPhone}</div>
//                     </td>
//                     <td className="px-6 py-4 text-sm font-semibold text-gray-900">
//                       ₹{payment.amount.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${getGatewayBadge(payment.gateway)}`}
//                       >
//                         {payment.gateway.toUpperCase()}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(payment.status)}`}
//                       >
//                         {payment.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-500">{new Date(payment.createdAt).toLocaleString()}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminPayments
"use client"

import { useState, useEffect } from "react"

const ITEMS_PER_PAGE = 10

export default function AdminPayments() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    setRefreshing(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/payments`)
      const data = await res.json()
      setPayments(data.reverse())
    } catch (error) {
      console.error("Error fetching payments:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true
    if (filter === "cashfree") return payment.gateway === "cashfree"
    if (filter === "razorpay") return payment.gateway === "razorpay"
    if (filter === "success") return payment.status === "SUCCESS"
    if (filter === "pending") return payment.status === "PENDING"
    return true
  })

  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPayments = filteredPayments.slice(startIndex, endIndex)

  useEffect(() => {
    setCurrentPage(1)
  }, [filter])

  const getStatusColor = (status) => {
    const colors = {
      SUCCESS: "bg-emerald-50 text-emerald-700 border-emerald-200",
      PENDING: "bg-amber-50 text-amber-700 border-amber-200",
      FAILED: "bg-red-50 text-red-700 border-red-200",
    }
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200"
  }

  const getGatewayColor = (gateway) => {
    const colors = {
      cashfree: "bg-violet-50 text-violet-700 border-violet-200",
      razorpay: "bg-blue-50 text-blue-700 border-blue-200",
    }
    return colors[gateway] || "bg-gray-50 text-gray-700 border-gray-200"
  }

  const downloadInvoice = (payment) => {
    const invoiceContent = `
INVOICE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Order ID: ${payment.orderId}
Date: ${new Date(payment.createdAt).toLocaleString()}

CUSTOMER DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${payment.customerName}
Email: ${payment.customerEmail}
Phone: ${payment.customerPhone}

PAYMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Amount: ₹${payment.amount.toLocaleString()}
Gateway: ${payment.gateway.toUpperCase()}
Status: ${payment.status}
Transaction ID: ${payment._id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Thank you for your payment!
    `.trim()

    const blob = new Blob([invoiceContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${payment.orderId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`min-w-[40px] h-10 px-4 rounded-lg text-sm font-medium transition-all ${
              currentPage === i
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {i}
          </button>,
        )
      }
    } else {
      items.push(
        <button
          key={1}
          onClick={() => setCurrentPage(1)}
          className={`min-w-[40px] h-10 px-4 rounded-lg text-sm font-medium transition-all ${
            currentPage === 1
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          1
        </button>,
      )

      if (currentPage > 3) {
        items.push(
          <span key="ellipsis-start" className="flex items-center px-2 text-gray-400">
            ...
          </span>,
        )
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`min-w-[40px] h-10 px-4 rounded-lg text-sm font-medium transition-all ${
              currentPage === i
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            }`}
          >
            {i}
          </button>,
        )
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <span key="ellipsis-end" className="flex items-center px-2 text-gray-400">
            ...
          </span>,
        )
      }

      items.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={`min-w-[40px] h-10 px-4 rounded-lg text-sm font-medium transition-all ${
            currentPage === totalPages
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          {totalPages}
        </button>,
      )
    }

    return items
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-sm text-gray-600">Loading payments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payment Records</h1>
            <p className="mt-1 text-sm text-gray-600">Manage and track all payment transactions</p>
          </div>
          <button
            onClick={fetchPayments}
            disabled={refreshing}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto shadow-sm"
          >
            <svg
              className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Total Payments</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">{payments.length}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Successful</p>
            <p className="mt-2 text-2xl font-bold text-emerald-600">
              {payments.filter((p) => p.status === "SUCCESS").length}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="mt-2 text-2xl font-bold text-amber-600">
              {payments.filter((p) => p.status === "PENDING").length}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="mt-2 text-2xl font-bold text-gray-900">
              ₹
              {payments
                .filter((p) => p.status === "SUCCESS")
                .reduce((sum, p) => sum + p.amount, 0)
                .toLocaleString()}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <h2 className="text-base font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "All" },
              { value: "cashfree", label: "Cashfree" },
              { value: "razorpay", label: "Razorpay" },
              { value: "success", label: "Success" },
              { value: "pending", label: "Pending" },
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  filter === filterOption.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Payments Table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
            <p className="mt-1 text-sm text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredPayments.length)} of {filteredPayments.length}{" "}
              payments
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Gateway
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <p className="text-sm text-gray-600">No payments found</p>
                    </td>
                  </tr>
                ) : (
                  currentPayments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-mono text-xs text-gray-700">{payment.orderId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-gray-900">{payment.customerName}</span>
                          <span className="text-xs text-gray-600">{payment.customerEmail}</span>
                          <span className="text-xs text-gray-600">{payment.customerPhone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="text-sm font-semibold text-gray-900">₹{payment.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${getGatewayColor(
                            payment.gateway,
                          )}`}
                        >
                          {payment.gateway.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium ${getStatusColor(
                            payment.status,
                          )}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-xs text-gray-600">
                          <div>{new Date(payment.createdAt).toLocaleDateString()}</div>
                          <div className="hidden sm:block">{new Date(payment.createdAt).toLocaleTimeString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => downloadInvoice(payment)}
                          className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all"
                          title="Download Invoice"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 h-10 px-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="hidden sm:inline">Previous</span>
              </button>
              {renderPaginationItems()}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 h-10 px-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
