import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Package, MapPin, FileText, Calendar, Info } from 'lucide-react';
import { getTransportBooking, getShipment, getVisibleMilestones, ShipmentType } from '../data/mockData';
import { getStatusColor } from '../utils/statusHelpers';

export default function TransportBookingDetail() {
  const { tbRef } = useParams<{ tbRef: string }>();
  const tb = tbRef ? getTransportBooking(tbRef) : undefined;
  const shipment = tb?.bookingFor ? getShipment(tb.bookingFor) : undefined;
  const [activeTab, setActiveTab] = useState('details');
  const [instructionView, setInstructionView] = useState<'standard' | 'instruction'>('standard');

  if (!tb) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-slate-900 mb-2">Transport Booking not found</h2>
          <Link to="/transport-bookings" className="text-indigo-600 hover:text-indigo-800">
            Back to Transport Bookings
          </Link>
        </div>
      </div>
    );
  }

  const isStandalone = !tb.bookingFor;
  const visibleMilestones = getVisibleMilestones(tb, shipment?.type as ShipmentType | undefined);

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'instructions', label: 'Instructions' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'edocs', label: 'eDocs' },
  ];

  if (isStandalone) {
    tabs.push({ id: 'packing', label: 'Packing' });
    tabs.push({ id: 'additional', label: 'Additional Details' });
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <Link
          to="/transport-bookings"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Transport Bookings
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900">{tb.tbReference}</h1>
                <div className="text-sm text-slate-600">{tb.template}</div>
              </div>
            </div>

            {tb.bookingFor && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Booking for:</span>
                <Link
                  to={`/shipment/${tb.bookingFor}`}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Shipment {tb.bookingFor}
                </Link>
                {shipment && (
                  <span
                    className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      shipment.type === 'Export'
                        ? 'bg-blue-100 text-blue-800'
                        : shipment.type === 'Import'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {shipment.type}
                  </span>
                )}
              </div>
            )}
            {isStandalone && (
              <div className="text-sm">
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-amber-100 text-amber-800 font-medium">
                  Standalone TB
                </span>
              </div>
            )}
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-500 mb-1">Status</div>
            <div className={`inline-flex items-center px-3 py-1 rounded-lg font-medium ${getStatusColor(tb.allocatedPackages.status)}`}>
              {tb.allocatedPackages.status.replace(/_/g, ' ')}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-8">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-1 py-3 text-sm font-medium border-b-2 transition-colors ${
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
        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Job Details */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="font-medium text-slate-900 mb-4">Job Details</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Template</div>
                  <div className="text-slate-900">{tb.template}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Freight Mode</div>
                  <div className="text-slate-900">{tb.freightModeDesc}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Waybill Number</div>
                  <div className="text-slate-900">{tb.waybillNumber}</div>
                </div>
                <div className="col-span-3">
                  <div className="text-sm text-slate-500 mb-1">Goods Description</div>
                  <div className="text-slate-900">{tb.goodsDescription}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Branch</div>
                  <div className="text-slate-900">{tb.branchDesc}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Service Level</div>
                  <div className="text-slate-900">{tb.serviceLevelDesc}</div>
                </div>
                {tb.requestedDate && (
                  <div>
                    <div className="text-sm text-slate-500 mb-1">Requested Date</div>
                    <div className="text-slate-900">{tb.requestedDate}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Allocated Packages */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h2 className="font-medium text-slate-900 mb-4">Allocated Packages</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Allocated Packs</div>
                  <div className="text-slate-900">
                    {tb.allocatedPackages.packs} {tb.allocatedPackages.packsUnit}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Allocated Weight</div>
                  <div className="text-slate-900">
                    {tb.allocatedPackages.weight} {tb.allocatedPackages.weightUnit}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Allocated Volume</div>
                  <div className="text-slate-900">
                    {tb.allocatedPackages.volume} {tb.allocatedPackages.volumeUnit}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Volume Weight</div>
                  <div className="text-slate-900">
                    {tb.allocatedPackages.volumeWeight} {tb.allocatedPackages.volumeWeightUnit}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Chargeable Weight</div>
                  <div className="text-slate-900">
                    {tb.allocatedPackages.chargeableWeight}{' '}
                    {tb.allocatedPackages.chargeableWeightUnit}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">Special Handling</div>
                  <div className="flex gap-2">
                    {tb.allocatedPackages.refrigeration && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Refrigeration
                      </span>
                    )}
                    {tb.allocatedPackages.hazardous && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        Hazardous
                      </span>
                    )}
                    {!tb.allocatedPackages.refrigeration && !tb.allocatedPackages.hazardous && (
                      <span className="text-slate-400">None</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions Tab */}
        {activeTab === 'instructions' && (
          <div className="space-y-6">
            {/* Sub-tabs */}
            <div className="flex gap-4 border-b border-slate-200">
              <button
                onClick={() => setInstructionView('standard')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  instructionView === 'standard'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Standard View
              </button>
              <button
                onClick={() => setInstructionView('instruction')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  instructionView === 'instruction'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Instruction View
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {tb.addresses.map((address, idx) => (
                <div key={idx} className="bg-white rounded-lg border border-slate-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-medium text-slate-900">{address.type}</h3>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Organization</div>
                      <div className="text-slate-900">{address.organization}</div>
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 mb-1">Address</div>
                      <div className="text-slate-900">
                        {address.address}
                        <br />
                        {address.city}, {address.state} {address.zip}
                        <br />
                        {address.country}
                      </div>
                    </div>

                    {instructionView === 'instruction' && (
                      <>
                        {address.packageType && (
                          <div>
                            <div className="text-sm text-slate-500 mb-1">Package Type</div>
                            <div className="text-slate-900">{address.packageType}</div>
                          </div>
                        )}
                        {address.dropMode && (
                          <div>
                            <div className="text-sm text-slate-500 mb-1">Drop Mode</div>
                            <div className="text-slate-900">{address.dropMode}</div>
                          </div>
                        )}
                        {(address.picEstimated || address.dlvEstimated) && (
                          <div>
                            <div className="text-sm text-slate-500 mb-1">Estimated</div>
                            <div className="text-slate-900">
                              {address.picEstimated || address.dlvEstimated}
                            </div>
                          </div>
                        )}
                        {address.instructionNotes && (
                          <div>
                            <div className="text-sm text-slate-500 mb-1">Instruction Notes</div>
                            <div className="text-slate-900 bg-amber-50 p-2 rounded border border-amber-200">
                              {address.instructionNotes}
                            </div>
                          </div>
                        )}
                        {address.status && (
                          <div>
                            <div className="text-sm text-slate-500 mb-1">Status</div>
                            <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              {address.status}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <h2 className="font-medium text-slate-900">Transport Booking Milestones</h2>
                {shipment && (
                  <p className="text-sm text-slate-600 mt-1">
                    Showing milestones for {shipment.type} shipment
                  </p>
                )}
              </div>
              <Link
                to="/milestone-entry"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                <Calendar className="w-4 h-4" />
                Add Milestone Entry
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                      Seq
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                      Description
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                      Event
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                      Estimated
                    </th>
                    <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                      Actual
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {visibleMilestones.map((milestone, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-6 py-4 text-sm text-slate-700">{milestone.seq}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                        {milestone.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700">
                          {milestone.event}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-700">
                        {milestone.estimated || (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {milestone.actual ? (
                          <span className="text-green-700 font-medium">{milestone.actual}</span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* eDocs Tab */}
        {activeTab === 'edocs' && (
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h2 className="font-medium text-slate-900">Electronic Documents</h2>
              <p className="text-sm text-slate-600 mt-1">
                POD and related transport documents
              </p>
            </div>
            {tb.documents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                        Date (UTC)
                      </th>
                      <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                        Date (Local)
                      </th>
                      <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                        Document Type
                      </th>
                      <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                        Description
                      </th>
                      <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                        File Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {tb.documents.map((doc, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm text-slate-700">{doc.dateUTC}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{doc.dateLocal}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                            {doc.documentType}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{doc.docDesc}</td>
                        <td className="px-6 py-4">
                          <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {doc.fileName}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500">
                <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>No documents available yet</p>
              </div>
            )}
          </div>
        )}

        {/* Packing Tab (Standalone only) */}
        {activeTab === 'packing' && isStandalone && (
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h2 className="font-medium text-slate-900">Packing Details</h2>
            </div>
            {tb.packingData && tb.packingData.length > 0 ? (
              <div className="p-6">
                {tb.packingData.map((pack, idx) => (
                  <div key={idx} className="mb-4 last:mb-0">
                    <div className="text-sm text-slate-500 mb-1">{pack.booking}</div>
                    <div className="text-slate-900">
                      {pack.cartonID} - {pack.weight} {pack.weightUnit}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p>No packing data available</p>
              </div>
            )}
          </div>
        )}

        {/* Additional Details Tab (Standalone only) */}
        {activeTab === 'additional' && isStandalone && (
          <div className="bg-white rounded-lg border border-slate-200">
            <div className="p-6 border-b border-slate-200 bg-slate-50">
              <h2 className="font-medium text-slate-900">Additional Details</h2>
            </div>
            <div className="p-6">
              <h3 className="text-sm font-medium text-slate-900 mb-3">Reference Numbers</h3>
              {tb.referenceNumbers && tb.referenceNumbers.length > 0 ? (
                <div className="space-y-3">
                  {tb.referenceNumbers.map((ref, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <div>
                        <div className="text-sm text-slate-500">{ref.numberType}</div>
                        <div className="text-slate-900 font-medium">{ref.number}</div>
                      </div>
                      {ref.thisTBOnly && (
                        <span className="text-xs px-2 py-1 rounded bg-indigo-100 text-indigo-800">
                          This TB Only
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Info className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>No additional reference numbers</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
