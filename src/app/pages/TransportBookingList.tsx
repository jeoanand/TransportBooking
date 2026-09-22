import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Search, ChevronRight, Package, CheckCircle, Clock, XCircle } from 'lucide-react';
import { mockTransportBookings } from '../data/mockData';
import { getStatusColor } from '../utils/statusHelpers';

export default function TransportBookingList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredTBs = mockTransportBookings.filter((tb) => {
    const matchesSearch = tb.tbReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tb.waybillNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tb.bookingFor && tb.bookingFor.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || tb.allocatedPackages.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = useMemo(() => {
    const total = mockTransportBookings.length;
    const available = mockTransportBookings.filter(tb => tb.allocatedPackages.status === 'AVAILABLE').length;
    const inProgress = mockTransportBookings.filter(tb => tb.allocatedPackages.status === 'IN_PROGRESS').length;
    const completed = mockTransportBookings.filter(tb => tb.allocatedPackages.status === 'COMPLETED').length;
    const pending = mockTransportBookings.filter(tb => tb.allocatedPackages.status === 'PENDING').length;

    return { total, available, inProgress, completed, pending };
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="font-semibold text-slate-900 mb-6">Transport Bookings</h1>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-slate-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                <div className="text-xs text-slate-600">Total TBs</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.available}</div>
                <div className="text-xs text-green-700">Available</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.inProgress}</div>
                <div className="text-xs text-blue-700">In Progress</div>
              </div>
            </div>
          </div>
          <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
              <div>
                <div className="text-2xl font-bold text-emerald-900">{stats.completed}</div>
                <div className="text-xs text-emerald-700">Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-3">
              <XCircle className="w-8 h-8 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
                <div className="text-xs text-yellow-700">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar and Filters */}
        <div className="flex gap-4 items-end">
          <div className="relative flex-1 max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by TB reference, waybill, or booking for..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white min-w-[180px]"
            >
              <option value="ALL">All Statuses</option>
              <option value="AVAILABLE">Available</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="PENDING">Pending</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* TB Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="mb-4 text-sm text-slate-600">
          Showing <span className="font-medium text-slate-900">{filteredTBs.length}</span> of{' '}
          <span className="font-medium text-slate-900">{mockTransportBookings.length}</span> transport bookings
        </div>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  TB Reference
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Waybill Number
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Booking For
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Service Level
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Requested Date
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTBs.map((tb) => (
                <tr
                  key={tb.tbReference}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/transport-booking/${tb.tbReference}`}
                      className="font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      {tb.tbReference}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{tb.waybillNumber}</td>
                  <td className="px-6 py-4">
                    {tb.bookingFor ? (
                      <Link
                        to={`/shipment/${tb.bookingFor}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        {tb.bookingFor}
                      </Link>
                    ) : (
                      <span className="text-slate-400 text-sm">Standalone</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{tb.serviceLevelDesc}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getStatusColor(tb.allocatedPackages.status)}`}>
                      {tb.allocatedPackages.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {tb.requestedDate || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredTBs.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No transport bookings found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
