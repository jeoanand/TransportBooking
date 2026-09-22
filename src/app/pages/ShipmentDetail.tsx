import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, ChevronDown, ChevronUp, Plane, Package, FileText } from 'lucide-react';
import { getShipment, getTBsByShipment } from '../data/mockData';

export default function ShipmentDetail() {
  const { shipmentRef } = useParams<{ shipmentRef: string }>();
  const shipment = shipmentRef ? getShipment(shipmentRef) : undefined;
  const transportBookings = shipmentRef ? getTBsByShipment(shipmentRef) : [];
  const [tbsExpanded, setTbsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  if (!shipment) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-slate-900 mb-2">Shipment not found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">
            Back to Shipment List
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'details', label: 'DETAILS' },
    { id: 'goods', label: 'GOODS' },
    { id: 'milestones', label: 'MILESTONES' },
    { id: 'routing', label: 'ROUTING A/S' },
    { id: 'documents', label: 'DOCUMENTS' },
    { id: 'invoices', label: 'COMMERCIAL INVOICES' },
    { id: 'declarations', label: 'EXPORT DECLARATIONS' },
    { id: 'hf', label: 'HF' },
    { id: 'references', label: 'REFERENCES' },
    { id: 'history', label: 'HISTORY' },
    { id: 'changes', label: 'CHANGES' },
    { id: 'transport', label: 'TRANSPORT BOOKINGS' },
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to results
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                !
              </div>
              <h1 className="font-semibold text-slate-900">{shipment.shipmentRef}</h1>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-slate-400" />
                <span className="text-slate-700">
                  {shipment.origin} → {shipment.destination}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="space-y-1">
              <div>
                <span className="text-xs text-slate-500">Last Milestone</span>
                <div className="font-medium text-slate-900">{shipment.lastMilestone}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500">ETD / ATD</span>
                  <div className="text-slate-700">{shipment.etd}</div>
                </div>
                <div>
                  <span className="text-slate-500">ETA / ATA</span>
                  <div className="text-slate-700">{shipment.eta}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-8">
        <div className="flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-1 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {/* Linked Transport Bookings Section */}
        {transportBookings.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 mb-6 overflow-hidden">
            <button
              onClick={() => setTbsExpanded(!tbsExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-indigo-600" />
                <span className="font-medium text-slate-900">
                  Linked Transport Bookings ({transportBookings.length})
                </span>
              </div>
              {tbsExpanded ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {tbsExpanded && (
              <div className="border-t border-slate-200">
                {transportBookings.map((tb) => (
                  <Link
                    key={tb.tbReference}
                    to={`/transport-booking/${tb.tbReference}`}
                    className="block px-6 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0 group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-indigo-600 group-hover:text-indigo-800 mb-1">
                          {tb.tbReference}
                        </div>
                        <div className="text-sm text-slate-600">
                          {tb.waybillNumber} • {tb.serviceLevelDesc}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-700 mb-1">
                          {tb.allocatedPackages.packs} {tb.allocatedPackages.packsUnit} •{' '}
                          {tb.allocatedPackages.weight} {tb.allocatedPackages.weightUnit}
                        </div>
                        <div className="text-xs text-slate-500">
                          {tb.requestedDate || 'Date pending'}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Shipment Details Content */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          {activeTab === 'details' && (
            <div>
              <h2 className="font-medium text-slate-900 mb-4">Shipment Details</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Shipment Reference</div>
                  <div className="text-slate-900">{shipment.shipmentRef}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Type</div>
                  <div>
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
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Origin</div>
                  <div className="text-slate-900">{shipment.origin}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Destination</div>
                  <div className="text-slate-900">{shipment.destination}</div>
                </div>
                {shipment.deliveryAddress && (
                  <div className="col-span-2">
                    <div className="text-sm text-slate-500 mb-1">Delivery Address</div>
                    <div className="text-slate-900">{shipment.deliveryAddress}</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'transport' && (
            <div>
              <h2 className="font-medium text-slate-900 mb-4">Transport Bookings</h2>
              {transportBookings.length > 0 ? (
                <div className="space-y-4">
                  {transportBookings.map((tb) => (
                    <div
                      key={tb.tbReference}
                      className="border border-slate-200 rounded-lg p-4"
                    >
                      <Link
                        to={`/transport-booking/${tb.tbReference}`}
                        className="font-medium text-indigo-600 hover:text-indigo-800 mb-2 block"
                      >
                        {tb.tbReference}
                      </Link>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-500">Waybill: </span>
                          <span className="text-slate-700">{tb.waybillNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Service: </span>
                          <span className="text-slate-700">{tb.serviceLevelDesc}</span>
                        </div>
                        <div>
                          <span className="text-slate-500">Status: </span>
                          <span className="text-slate-700">
                            {tb.allocatedPackages.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  No transport bookings linked to this shipment
                </div>
              )}
            </div>
          )}

          {activeTab !== 'details' && activeTab !== 'transport' && (
            <div className="text-center py-12 text-slate-500">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p>Content for {tabs.find((t) => t.id === activeTab)?.label}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
