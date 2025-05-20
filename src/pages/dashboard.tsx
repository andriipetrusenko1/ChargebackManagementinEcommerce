import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import AIAssistant from '@/components/AIAssistant';

// Mock chargeback data
const mockChargebacks = [
  { id: 'CB-001', customer: 'John Doe', amount: '$120.50', reason: 'Item not received', status: 'Open', date: '2023-09-15', email: 'john.doe@example.com' },
  { id: 'CB-002', customer: 'Jane Smith', amount: '$75.99', reason: 'Unauthorized transaction', status: 'Under review', date: '2023-09-18', email: 'jane.smith@example.com' },
  { id: 'CB-003', customer: 'Robert Johnson', amount: '$210.25', reason: 'Product damaged', status: 'Closed', date: '2023-09-10', email: 'robert.j@example.com' },
  { id: 'CB-004', customer: 'Emily Davis', amount: '$45.00', reason: 'Wrong item shipped', status: 'Open', date: '2023-09-20', email: 'emily.d@example.com' },
  { id: 'CB-005', customer: 'Michael Brown', amount: '$350.75', reason: 'Fraudulent charge', status: 'Under review', date: '2023-09-17', email: 'michael.b@example.com' },
  { id: 'CB-006', customer: 'Sarah Wilson', amount: '$89.99', reason: 'Item not as described', status: 'Open', date: '2023-09-21', email: 'sarah.w@example.com' },
  { id: 'CB-007', customer: 'David Miller', amount: '$129.50', reason: 'Duplicate charge', status: 'Closed', date: '2023-09-05', email: 'david.m@example.com' },
  { id: 'CB-008', customer: 'Jennifer Taylor', amount: '$67.25', reason: 'Subscription canceled', status: 'Under review', date: '2023-09-19', email: 'jennifer.t@example.com' },
];

// Mock summary data
const summaryData = {
  totalChargebacks: 8,
  openChargebacks: 3,
  underReviewChargebacks: 3,
  closedChargebacks: 2,
  totalAmount: '$1,089.23',
  winRate: '75%',
  averageResolutionTime: '5.2 days'
};

export default function Dashboard() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter chargebacks based on active tab and search term
  const filteredChargebacks = mockChargebacks
    .filter(chargeback => {
      if (activeTab === 'all') return true;
      if (activeTab === 'open') return chargeback.status === 'Open';
      if (activeTab === 'review') return chargeback.status === 'Under review';
      if (activeTab === 'closed') return chargeback.status === 'Closed';
      return true;
    })
    .filter(chargeback => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        chargeback.id.toLowerCase().includes(search) ||
        chargeback.customer.toLowerCase().includes(search) ||
        chargeback.reason.toLowerCase().includes(search) ||
        chargeback.status.toLowerCase().includes(search)
      );
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Dashboard | AI Chargeback Manager</title>
        <meta name="description" content="Manage and analyze your chargebacks" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                AI Chargeback Manager
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Home
              </Link>
              <Link href="/dashboard" className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600">
            Monitor and manage your chargebacks in real-time
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Chargebacks
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summaryData.totalChargebacks}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Open Chargebacks
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summaryData.openChargebacks}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Win Rate
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summaryData.winRate}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Amount
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {summaryData.totalAmount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Chargeback Status Distribution</h3>
              <div className="h-64 flex items-end justify-around">
                <div className="w-16 bg-yellow-500 rounded-t-lg" style={{ height: '40%' }}>
                  <div className="text-center mt-2 text-xs font-medium text-gray-700">Open</div>
                  <div className="text-center mt-1 text-sm font-semibold">{summaryData.openChargebacks}</div>
                </div>
                <div className="w-16 bg-blue-500 rounded-t-lg" style={{ height: '40%' }}>
                  <div className="text-center mt-2 text-xs font-medium text-gray-700">Review</div>
                  <div className="text-center mt-1 text-sm font-semibold">{summaryData.underReviewChargebacks}</div>
                </div>
                <div className="w-16 bg-green-500 rounded-t-lg" style={{ height: '25%' }}>
                  <div className="text-center mt-2 text-xs font-medium text-gray-700">Closed</div>
                  <div className="text-center mt-1 text-sm font-semibold">{summaryData.closedChargebacks}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Chargeback Reasons</h3>
              <div className="h-64 flex flex-col justify-center space-y-4">
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Item not received</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-gray-900">30%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Unauthorized</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-gray-900">25%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Product damaged</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-gray-900">20%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Wrong item</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-gray-900">15%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-gray-600">Other</div>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: '10%' }}></div>
                  </div>
                  <div className="ml-3 text-sm font-medium text-gray-900">10%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chargeback Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Chargebacks
              </h3>
              <div className="mt-2 sm:mt-0">
                <div className="flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full rounded-md sm:text-sm border-gray-300"
                    placeholder="Search chargebacks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                All ({mockChargebacks.length})
              </button>
              <button
                onClick={() => setActiveTab('open')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'open'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Open ({summaryData.openChargebacks})
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'review'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Under Review ({summaryData.underReviewChargebacks})
              </button>
              <button
                onClick={() => setActiveTab('closed')}
                className={`px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'closed'
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Closed ({summaryData.closedChargebacks})
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChargebacks.length > 0 ? (
                  filteredChargebacks.map((chargeback) => (
                    <tr key={chargeback.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {chargeback.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{chargeback.customer}</div>
                        <div className="text-sm text-gray-500">{chargeback.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {chargeback.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chargeback.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {chargeback.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            chargeback.status === 'Open'
                              ? 'bg-yellow-100 text-yellow-800'
                              : chargeback.status === 'Under review'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {chargeback.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          Respond
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                      No chargebacks found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing <span className="font-medium">{filteredChargebacks.length}</span> of{' '}
                <span className="font-medium">{mockChargebacks.length}</span> chargebacks
              </div>
              <div className="flex-1 flex justify-end">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* AI Assistant Button */}
      <button
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full shadow-lg flex items-center"
      >
        <span className="mr-2">💬</span> AI Assistant
      </button>

      {/* AI Assistant Modal */}
      {isAssistantOpen && (
        <AIAssistant onClose={() => setIsAssistantOpen(false)} />
      )}
    </div>
  );
}