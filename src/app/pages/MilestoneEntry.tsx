import { useState } from 'react';
import { Search, Plus, Calendar, MapPin, X, Save, ChevronDown } from 'lucide-react';
import { mockTransportBookings, getTransportBooking, Milestone } from '../data/mockData';

interface MilestoneForm {
  description: string;
  seq: number;
  event: string;
  estimated?: string;
  actual?: string;
}

export default function MilestoneEntry() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTB, setSelectedTB] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [milestoneForm, setMilestoneForm] = useState<MilestoneForm>({
    description: '',
    seq: 0,
    event: '',
    estimated: '',
    actual: '',
  });
  const [localMilestones, setLocalMilestones] = useState<Record<string, Milestone[]>>({});

  const searchResults = searchTerm
    ? mockTransportBookings.filter(
        (tb) =>
          tb.tbReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tb.waybillNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const selectedTBData = selectedTB ? getTransportBooking(selectedTB) : null;
  const currentMilestones = selectedTBData
    ? [...selectedTBData.milestones, ...(localMilestones[selectedTB] || [])]
    : [];

  const handleSelectTB = (tbRef: string) => {
    setSelectedTB(tbRef);
    setSearchTerm('');
  };

  const handleAddMilestone = () => {
    if (!selectedTB || !milestoneForm.description || !milestoneForm.event) {
      return;
    }

    const newMilestone: Milestone = {
      description: milestoneForm.description,
      seq: milestoneForm.seq || currentMilestones.length + 1,
      event: milestoneForm.event,
      estimated: milestoneForm.estimated || undefined,
      actual: milestoneForm.actual || undefined,
    };

    setLocalMilestones((prev) => ({
      ...prev,
      [selectedTB]: [...(prev[selectedTB] || []), newMilestone],
    }));

    // Reset form
    setMilestoneForm({
      description: '',
      seq: 0,
      event: '',
      estimated: '',
      actual: '',
    });
    setShowAddModal(false);
  };

  const commonMilestoneTypes = [
    { event: 'BKC', description: 'Booking Confirmed', seq: 12 },
    { event: 'BKQ', description: 'Booking Requested with Transport Company', seq: 96 },
    { event: 'PCF', description: 'Goods Picked-up', seq: 200 },
    { event: 'DCF', description: 'Goods delivered to Consignee', seq: 950 },
    { event: 'DDV', description: 'Send Delivery Document to Transport Company', seq: 5006 },
    { event: 'REJ', description: 'Booking Rejected', seq: 14 },
  ];

  const handleQuickSelect = (milestone: typeof commonMilestoneTypes[0]) => {
    setMilestoneForm({
      ...milestoneForm,
      description: milestone.description,
      event: milestone.event,
      seq: milestone.seq,
    });
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-semibold text-slate-900">Milestone Entry</h1>
            <p className="text-sm text-slate-600 mt-1">
              Search for transport bookings and manage milestones
            </p>
          </div>
          {selectedTB && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Milestone
            </button>
          )}
        </div>

        {/* TB Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Enter TB reference or waybill number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          {/* Search Results Dropdown */}
          {searchTerm && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg max-h-96 overflow-auto">
              {searchResults.map((tb) => (
                <button
                  key={tb.tbReference}
                  onClick={() => handleSelectTB(tb.tbReference)}
                  className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                >
                  <div className="font-medium text-slate-900">{tb.tbReference}</div>
                  <div className="text-sm text-slate-600 mt-1">
                    {tb.waybillNumber} • {tb.goodsDescription}
                  </div>
                  {tb.bookingFor && (
                    <div className="text-xs text-slate-500 mt-1">
                      Booking for: {tb.bookingFor}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {searchTerm && searchResults.length === 0 && (
            <div className="absolute z-10 w-full mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-slate-500">
              No transport bookings found
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        {!selectedTB && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500">
            <Search className="w-16 h-16 text-slate-300 mb-4" />
            <p className="text-lg font-medium">Search for a Transport Booking</p>
            <p className="text-sm mt-2">Enter a TB reference or waybill number to get started</p>
          </div>
        )}

        {selectedTB && selectedTBData && (
          <div className="space-y-6">
            {/* Selected TB Info */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-semibold text-slate-900 text-lg">
                      {selectedTBData.tbReference}
                    </h2>
                    <span className="text-sm px-2.5 py-0.5 rounded bg-indigo-100 text-indigo-800 font-medium">
                      {selectedTBData.allocatedPackages.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-sm text-slate-600">
                    {selectedTBData.waybillNumber} • {selectedTBData.template}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTB(null)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-xs text-slate-500 mb-1">Goods Description</div>
                  <div className="text-sm text-slate-900">
                    {selectedTBData.goodsDescription}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Service Level</div>
                  <div className="text-sm text-slate-900">
                    {selectedTBData.serviceLevelDesc}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-1">Requested Date</div>
                  <div className="text-sm text-slate-900">
                    {selectedTBData.requestedDate || 'Not set'}
                  </div>
                </div>
              </div>

              {selectedTBData.bookingFor && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <div className="text-xs text-slate-500 mb-1">Booking For</div>
                  <div className="text-sm font-medium text-indigo-600">
                    Shipment {selectedTBData.bookingFor}
                  </div>
                </div>
              )}
            </div>

            {/* Milestones Table */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-slate-50">
                <h3 className="font-medium text-slate-900">
                  Milestones ({currentMilestones.length})
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  View and manage all milestone entries for this transport booking
                </p>
              </div>

              {currentMilestones.length > 0 ? (
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
                        <th className="text-left px-6 py-3 text-xs uppercase tracking-wider text-slate-600 font-medium">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {currentMilestones
                        .sort((a, b) => a.seq - b.seq)
                        .map((milestone, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="px-6 py-4 text-sm text-slate-700">
                              {milestone.seq}
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                              {milestone.description}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono bg-slate-100 text-slate-700">
                                {milestone.event}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-700">
                              {milestone.estimated ? (
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-slate-400" />
                                  {milestone.estimated}
                                </div>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              {milestone.actual ? (
                                <div className="flex items-center gap-2 text-green-700">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-medium">{milestone.actual}</span>
                                </div>
                              ) : (
                                <span className="text-slate-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {milestone.actual ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Completed
                                </span>
                              ) : milestone.estimated ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Scheduled
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600">
                                  Pending
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center text-slate-500">
                  <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>No milestones recorded yet</p>
                  <p className="text-sm mt-1">Click "Add Milestone" to create the first entry</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-900">Add New Milestone</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-600 mt-1">
                Add a milestone entry for {selectedTB}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Quick Select Common Milestones */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quick Select Common Milestone
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {commonMilestoneTypes.map((milestone) => (
                    <button
                      key={milestone.event}
                      onClick={() => handleQuickSelect(milestone)}
                      className="px-3 py-2 text-left text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="font-medium text-slate-900">
                        {milestone.event} - {milestone.description}
                      </div>
                      <div className="text-xs text-slate-500">Seq: {milestone.seq}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Event Code *
                    </label>
                    <input
                      type="text"
                      value={milestoneForm.event}
                      onChange={(e) =>
                        setMilestoneForm({ ...milestoneForm, event: e.target.value.toUpperCase() })
                      }
                      placeholder="e.g., BKC, PCF, DCF"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sequence Number
                    </label>
                    <input
                      type="number"
                      value={milestoneForm.seq || ''}
                      onChange={(e) =>
                        setMilestoneForm({ ...milestoneForm, seq: parseInt(e.target.value) || 0 })
                      }
                      placeholder="Auto-assigned"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description *
                  </label>
                  <input
                    type="text"
                    value={milestoneForm.description}
                    onChange={(e) =>
                      setMilestoneForm({ ...milestoneForm, description: e.target.value })
                    }
                    placeholder="Enter milestone description"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Estimated Date/Time
                    </label>
                    <input
                      type="datetime-local"
                      value={milestoneForm.estimated}
                      onChange={(e) =>
                        setMilestoneForm({ ...milestoneForm, estimated: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Actual Date/Time
                    </label>
                    <input
                      type="datetime-local"
                      value={milestoneForm.actual}
                      onChange={(e) =>
                        setMilestoneForm({ ...milestoneForm, actual: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMilestone}
                disabled={!milestoneForm.description || !milestoneForm.event}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                Save Milestone
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
