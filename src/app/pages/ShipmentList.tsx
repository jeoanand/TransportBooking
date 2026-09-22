import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Search, ChevronRight, Ship, TrendingUp, TrendingDown, Shuffle } from 'lucide-react';
import { mockShipments } from '../data/mockData';

export default function ShipmentList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const filteredShipments = mockShipments.filter((shipment) => {
    const matchesSearch = shipment.shipmentRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'ALL' || shipment.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const stats = useMemo(() => {
    const total = mockShipments.length;
    const imports = mockShipments.filter(s => s.type === 'Import').length;
    const exports = mockShipments.filter(s => s.type === 'Export').length;
    const domestic = mockShipments.filter(s => s.type === 'Domestic').length;

    return { total, imports, exports, domestic };
  }, []);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="font-semibold text-slate-900 mb-6">Shipment List</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <Ship className="w-8 h-8 text-slate-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                <div className="text-xs text-slate-600">Total Shipments</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.imports}</div>
                <div className="text-xs text-green-700">Imports</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.exports}</div>
                <div className="text-xs text-blue-700">Exports</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-3">
              <Shuffle className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">{stats.domestic}</div>
                <div className="text-xs text-purple-700">Domestic</div>
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
              placeholder="Search by shipment reference, origin, or destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-2">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white min-w-[160px]"
            >
              <option value="ALL">All Types</option>
              <option value="Import">Import</option>
              <option value="Export">Export</option>
              <option value="Domestic">Domestic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipment Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="mb-4 text-sm text-slate-600">
          Showing <span className="font-medium text-slate-900">{filteredShipments.length}</span> of{' '}
          <span className="font-medium text-slate-900">{mockShipments.length}</span> shipments
        </div>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Shipment Reference
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Route
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Last Milestone
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  ETD / ATD
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  ETA / ATA
                </th>
                <th className="w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredShipments.map((shipment) => (
                <tr
                  key={shipment.shipmentRef}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/shipment/${shipment.shipmentRef}`}
                      className="font-medium text-indigo-600 hover:text-indigo-800"
                    >
                      {shipment.shipmentRef}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                        shipment.type === 'Export'
                          ? 'bg-blue-100 text-blue-800'
                          : shipment.type === 'Import'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {shipment.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">
                    {shipment.origin} → {shipment.destination}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{shipment.lastMilestone}</td>
                  <td className="px-6 py-4 text-slate-700">{shipment.etd}</td>
                  <td className="px-6 py-4 text-slate-700">{shipment.eta}</td>
                  <td className="px-6 py-4">
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredShipments.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No shipments found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
