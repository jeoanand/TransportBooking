import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Search, Ship, MapPin, Package, Archive } from 'lucide-react';
import { mockContainers, getTransportBooking } from '../data/mockData';

export default function ContainerVisibility() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: 'Dec. 14, 2025', to: 'Jan. 14, 2026' });

  const filteredContainers = mockContainers.filter(
    (container) =>
      container.containerNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      container.shipmentRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = useMemo(() => {
    const total = mockContainers.length;
    const withTB = mockContainers.filter(c => c.tbReference).length;
    const withoutTB = total - withTB;
    const types = {
      HC: mockContainers.filter(c => c.type === 'HC').length,
      STD: mockContainers.filter(c => c.type === 'STD').length,
      RF: mockContainers.filter(c => c.type === 'RF').length,
      OT: mockContainers.filter(c => c.type === 'OT').length,
    };

    return { total, withTB, withoutTB, types };
  }, []);

  // Helper function to get delivery address - pulls from TB if linked
  const getDeliveryAddress = (container: typeof mockContainers[0]) => {
    if (container.tbReference) {
      const tb = getTransportBooking(container.tbReference);
      if (tb) {
        const deliveryAddress = tb.addresses.find((addr) =>
          addr.type.toLowerCase().includes('delivery')
        );
        if (deliveryAddress) {
          return `${deliveryAddress.address}, ${deliveryAddress.city}`;
        }
      }
    }
    return container.deliveryAddress;
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <h1 className="font-semibold text-slate-900 mb-6">Container Visibility</h1>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <Archive className="w-8 h-8 text-slate-600" />
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
                <div className="text-xs text-slate-600">Total Containers</div>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center gap-3">
              <Package className="w-8 h-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">{stats.withTB}</div>
                <div className="text-xs text-green-700">Linked to TB</div>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center gap-3">
              <Ship className="w-8 h-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{stats.types.HC}</div>
                <div className="text-xs text-blue-700">High Cube (HC)</div>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center gap-3">
              <Ship className="w-8 h-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">{stats.types.STD}</div>
                <div className="text-xs text-purple-700">Standard (STD)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4 items-end">
          <div className="flex-1 max-w-md">
            <label className="block text-sm text-slate-600 mb-2">
              Filter containers
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Container or shipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div>
              <label className="block text-sm text-slate-600 mb-2">From</label>
              <input
                type="text"
                value={dateRange.from}
                onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">To</label>
              <input
                type="text"
                value={dateRange.to}
                onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Search
          </button>
        </div>
      </div>

      {/* Container Table */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <div className="mb-4 text-sm text-slate-600">
          Showing <span className="font-medium text-slate-900">{filteredContainers.length}</span> of{' '}
          <span className="font-medium text-slate-900">{mockContainers.length}</span> containers
        </div>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Container
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  References
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  POL
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  POD
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  ETA
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Consignee
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Destination
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Delivery Address
                </th>
                <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                  Shipment Ref.
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredContainers.map((container) => {
                const deliveryAddr = getDeliveryAddress(container);
                const hasTB = !!container.tbReference;

                return (
                  <tr
                    key={container.containerNo}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Ship className="w-4 h-4 text-indigo-600" />
                        <span className="font-medium text-slate-900">
                          {container.containerNo}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {container.size}' {container.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{container.type}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/shipment/${container.shipmentRef}`}
                        className="text-sm text-indigo-600 hover:text-indigo-800 block"
                      >
                        {container.shipmentRef}
                      </Link>
                      {container.tbReference && (
                        <Link
                          to={`/transport-booking/${container.tbReference}`}
                          className="text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1 mt-1"
                        >
                          <Package className="w-3 h-3" />
                          {container.tbReference}
                        </Link>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{container.pol}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{container.pod}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{container.eta}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{container.consignee}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{container.destination}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-2">
                        {hasTB && (
                          <div className="mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-green-600" />
                          </div>
                        )}
                        <div>
                          <div className="text-sm text-slate-700">{deliveryAddr}</div>
                          {hasTB && (
                            <div className="text-xs text-green-600 mt-0.5">
                              From TB record
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-700">{container.shipment}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredContainers.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Ship className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p>No containers found matching your search.</p>
            </div>
          )}
        </div>

        {/* Info Box */}
        {filteredContainers.some((c) => c.tbReference) && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium text-green-900 mb-1">
                  Address Override Active
                </div>
                <div className="text-sm text-green-700">
                  Containers linked to Transport Bookings display delivery addresses from the TB
                  record instead of the shipment delivery tab.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
