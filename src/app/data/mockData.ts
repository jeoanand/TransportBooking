// Mock data based on TB_-_IRIS_Spec.pdf examples

export type ShipmentType = 'Export' | 'Import' | 'Domestic';
export type TBStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'PENDING' | 'CANCELLED' | 'ON_HOLD' | 'REJECTED';

export interface Address {
  type: string;
  organization: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  packageType?: string;
  dropMode?: string;
  picEstimated?: string;
  dlvEstimated?: string;
  picCFSAvailable?: string;
  dlvRequiredFrom?: string;
  picCFSStorage?: string;
  dlvRequiredTo?: string;
  picActual?: string;
  dlvActual?: string;
  instructionNotes?: string;
  signedBy?: string;
  status?: string;
  authorizedToLeave?: boolean;
}

export interface Milestone {
  description: string;
  seq: number;
  event: string;
  estimated?: string;
  actual?: string;
}

export interface AllocatedPackages {
  packs: number;
  packsUnit: string;
  weight: number;
  weightUnit: string;
  volume: number;
  volumeUnit: string;
  volumeWeight: number;
  volumeWeightUnit: string;
  chargeableWeight: number;
  chargeableWeightUnit: string;
  override: boolean;
  refrigeration: boolean;
  hazardous: boolean;
  status: TBStatus;
}

export interface TransportBooking {
  tbReference: string;
  bookingFor?: string; // Linked shipment/consol/declaration
  template: string;
  freightMode: string;
  freightModeDesc: string;
  waybillNumber: string;
  goodsDescription: string;
  branch: string;
  branchDesc: string;
  serviceLevel: string;
  serviceLevelDesc: string;
  tbConsol?: string;
  transportCompany: string; // Hidden from customer
  transportMode: string;
  transportModeDesc: string;
  transportRef?: string;
  requestedDate?: string;
  allocatedPackages: AllocatedPackages;
  addresses: Address[];
  milestones: Milestone[];
  documents: Document[];
  referenceNumbers?: ReferenceNumber[];
  packingData?: PackingData[];
}

export interface Document {
  dateUTC: string;
  dateLocal: string;
  documentType: string;
  docDesc: string;
  fileName: string;
}

export interface ReferenceNumber {
  numberType: string;
  number: string;
  thisTBOnly: boolean;
}

export interface PackingData {
  booking: string;
  cartonID: string;
  weight: number;
  weightUnit: string;
}

export interface Shipment {
  shipmentRef: string;
  type: ShipmentType;
  origin: string;
  destination: string;
  destCode: string;
  lastMilestone: string;
  etd: string;
  eta: string;
  transportBookings: string[]; // TB references
  deliveryAddress?: string;
}

export interface Container {
  containerNo: string;
  type: string;
  size: string;
  shipmentRef: string;
  tbReference?: string;
  pol: string;
  pod: string;
  eta: string;
  consignee: string;
  destination: string;
  deliveryAddress: string;
  shipment: string;
}

// Mock Transport Bookings
export const mockTransportBookings: TransportBooking[] = [
  {
    tbReference: 'TB01520209',
    bookingFor: 'SSTAA195583',
    template: 'ILDV - Import LCL/LSE/LTL D',
    freightMode: 'LSE',
    freightModeDesc: 'Rate Loose Only',
    waybillNumber: 'STAA25195583',
    goodsDescription: 'BLOCKED STREPTAVIDIN BEAD IN M',
    branch: 'EW2',
    branchDesc: 'US-New York (EWR)',
    serviceLevel: 'AF4',
    serviceLevelDesc: 'AirFast Airport to Door',
    transportCompany: 'GEODIS LOGISTICS, LLC',
    transportMode: 'ROA',
    transportModeDesc: 'Road Transport',
    requestedDate: '2026-01-15',
    allocatedPackages: {
      packs: 1,
      packsUnit: 'CTN',
      weight: 32.0,
      weightUnit: 'KG',
      volume: 0.22,
      volumeUnit: 'M3',
      volumeWeight: 73.33,
      volumeWeightUnit: 'KG',
      chargeableWeight: 73.33,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'AVAILABLE',
    },
    addresses: [
      {
        type: 'Pickup - CFS',
        organization: 'ATR GENERAL RDU',
        address: '1320 INTERNATIONAL DRIVE',
        city: 'MORRISVILLE',
        state: 'NC',
        zip: '27605',
        country: 'UNITED STATES',
        packageType: 'LOOSE OUTER PACKAGES',
        dropMode: 'PSL - Premise Supplies Li',
        instructionNotes: 'URGENT SHIPMENT',
        status: 'AVAILABLE',
      },
      {
        type: 'Delivery - Consignee',
        organization: 'GRAIL',
        address: 'RTP 4001 E NC 54 HW, ASSEMBLY, SUITE 1100, #40',
        city: 'DURHAM',
        state: 'NC',
        zip: '27709',
        country: 'UNITED STATES',
        packageType: 'LOOSE OUTER PACKAGES',
        dropMode: 'PSL - Premise Supplies Li',
        dlvEstimated: '15-JAN-26 09:15',
        instructionNotes: 'M-F (8AM - 5PM DELIVERIES), SATURDAY',
        status: 'AVAILABLE',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-01-10 14:30',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        estimated: '2026-01-13',
        actual: '2026-01-13 09:00',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
        estimated: '2026-01-16',
      },
    ],
    documents: [
      {
        dateUTC: '2026-01-16T10:30:00Z',
        dateLocal: '2026-01-16 05:30 AM',
        documentType: 'POD',
        docDesc: 'Proof of Delivery',
        fileName: 'POD_TB01520209.pdf',
      },
    ],
  },
  {
    tbReference: 'TB01520210',
    bookingFor: 'SEAA195584',
    template: 'Export Road Transport',
    freightMode: 'ROA',
    freightModeDesc: 'Road Transport',
    waybillNumber: 'STAA26195584',
    goodsDescription: 'ELECTRONICS EQUIPMENT',
    branch: 'EW2',
    branchDesc: 'US-New York (EWR)',
    serviceLevel: 'STD',
    serviceLevelDesc: 'Standard Service',
    transportCompany: 'GEODIS LOGISTICS, LLC',
    transportMode: 'ROA',
    transportModeDesc: 'Road Transport',
    requestedDate: '2026-01-20',
    allocatedPackages: {
      packs: 5,
      packsUnit: 'PLT',
      weight: 250.0,
      weightUnit: 'KG',
      volume: 2.5,
      volumeUnit: 'M3',
      volumeWeight: 416.67,
      volumeWeightUnit: 'KG',
      chargeableWeight: 416.67,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'AVAILABLE',
    },
    addresses: [
      {
        type: 'Pickup - Shipper',
        organization: 'TECH SOLUTIONS INC',
        address: '500 TECH PARK DR',
        city: 'ATLANTA',
        state: 'GA',
        zip: '30328',
        country: 'UNITED STATES',
        packageType: 'PALLETS',
        dropMode: 'STD - Standard',
        picEstimated: '2026-01-21 08:00',
        status: 'AVAILABLE',
      },
      {
        type: 'Delivery - Port',
        organization: 'PORT OF SAVANNAH',
        address: '1 OCEAN TERMINAL DR',
        city: 'SAVANNAH',
        state: 'GA',
        zip: '31401',
        country: 'UNITED STATES',
        packageType: 'PALLETS',
        dlvEstimated: '2026-01-22 14:00',
        status: 'AVAILABLE',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-01-15 11:00',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        estimated: '2026-01-20',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
        estimated: '2026-01-21',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
      },
    ],
    documents: [],
  },
  {
    tbReference: 'TB01520211',
    bookingFor: 'SDAA195585',
    template: 'Domestic LTL Service',
    freightMode: 'LTL',
    freightModeDesc: 'Less Than Truckload',
    waybillNumber: 'STAA27195585',
    goodsDescription: 'PHARMACEUTICAL SUPPLIES - TEMPERATURE CONTROLLED',
    branch: 'CHI1',
    branchDesc: 'US-Chicago (ORD)',
    serviceLevel: 'EXP',
    serviceLevelDesc: 'Express Service',
    transportCompany: 'FAST FREIGHT EXPRESS',
    transportMode: 'ROA',
    transportModeDesc: 'Road Transport',
    requestedDate: '2026-02-01',
    allocatedPackages: {
      packs: 12,
      packsUnit: 'CTN',
      weight: 145.5,
      weightUnit: 'KG',
      volume: 1.8,
      volumeUnit: 'M3',
      volumeWeight: 300.0,
      volumeWeightUnit: 'KG',
      chargeableWeight: 300.0,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: true,
      hazardous: false,
      status: 'IN_PROGRESS',
    },
    addresses: [
      {
        type: 'Pickup - Warehouse',
        organization: 'MIDWEST PHARMA DISTRIBUTION',
        address: '2500 W INDUSTRIAL BLVD',
        city: 'CHICAGO',
        state: 'IL',
        zip: '60612',
        country: 'UNITED STATES',
        packageType: 'CARTONS',
        dropMode: 'EXP - Express Pickup',
        picEstimated: '2026-02-02 06:00',
        picActual: '2026-02-02 06:15',
        instructionNotes: 'TEMPERATURE CONTROLLED - KEEP AT 2-8°C',
        status: 'COMPLETED',
      },
      {
        type: 'Delivery - Hospital',
        organization: 'MEMORIAL HOSPITAL',
        address: '850 MEDICAL CENTER DR',
        city: 'INDIANAPOLIS',
        state: 'IN',
        zip: '46202',
        country: 'UNITED STATES',
        packageType: 'CARTONS',
        dropMode: 'EXP - Express Delivery',
        dlvEstimated: '2026-02-02 18:00',
        instructionNotes: 'DELIVER TO RECEIVING DOCK - LOADING BAY 3',
        status: 'IN_PROGRESS',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-01-28 09:30',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        actual: '2026-02-01 08:00',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
        estimated: '2026-02-02 06:00',
        actual: '2026-02-02 06:15',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
        estimated: '2026-02-02 18:00',
      },
    ],
    documents: [],
  },
  {
    tbReference: 'TB01520212',
    template: 'Standalone Domestic Delivery',
    freightMode: 'ROA',
    freightModeDesc: 'Road Transport',
    waybillNumber: 'STAA28195586',
    goodsDescription: 'CONSTRUCTION MATERIALS - STEEL BEAMS',
    branch: 'HOU1',
    branchDesc: 'US-Houston (IAH)',
    serviceLevel: 'HVY',
    serviceLevelDesc: 'Heavy Haul Service',
    transportCompany: 'HEAVY TRANSPORT INC',
    transportMode: 'FLT',
    transportModeDesc: 'Flatbed Transport',
    requestedDate: '2026-02-10',
    allocatedPackages: {
      packs: 8,
      packsUnit: 'PCS',
      weight: 5200.0,
      weightUnit: 'KG',
      volume: 15.5,
      volumeUnit: 'M3',
      volumeWeight: 2583.33,
      volumeWeightUnit: 'KG',
      chargeableWeight: 5200.0,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'COMPLETED',
    },
    addresses: [
      {
        type: 'Pickup - Manufacturer',
        organization: 'TEXAS STEEL WORKS',
        address: '1200 INDUSTRIAL WAY',
        city: 'HOUSTON',
        state: 'TX',
        zip: '77020',
        country: 'UNITED STATES',
        packageType: 'LOOSE',
        dropMode: 'HVY - Heavy Equipment',
        picEstimated: '2026-02-11 07:00',
        picActual: '2026-02-11 07:30',
        instructionNotes: 'CRANE REQUIRED FOR LOADING',
        status: 'COMPLETED',
      },
      {
        type: 'Delivery - Construction Site',
        organization: 'METRO CONSTRUCTION LLC',
        address: '450 COMMERCE ST, SITE 12B',
        city: 'DALLAS',
        state: 'TX',
        zip: '75202',
        country: 'UNITED STATES',
        packageType: 'LOOSE',
        dropMode: 'HVY - Heavy Equipment',
        dlvEstimated: '2026-02-12 14:00',
        dlvActual: '2026-02-12 13:45',
        instructionNotes: 'SITE FOREMAN: JOHN SMITH (555-0123)',
        status: 'COMPLETED',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-02-05 14:20',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        actual: '2026-02-10 10:00',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
        estimated: '2026-02-11 07:00',
        actual: '2026-02-11 07:30',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
        estimated: '2026-02-12 14:00',
        actual: '2026-02-12 13:45',
      },
    ],
    documents: [
      {
        dateUTC: '2026-02-12T19:45:00Z',
        dateLocal: '2026-02-12 01:45 PM',
        documentType: 'POD',
        docDesc: 'Proof of Delivery - Signed',
        fileName: 'POD_TB01520212.pdf',
      },
    ],
    referenceNumbers: [
      { numberType: 'HSB', number: 'STAA28195586', thisTBOnly: true },
      { numberType: 'PO', number: 'PO-2026-045672', thisTBOnly: true },
    ],
    packingData: [
      {
        booking: 'Standalone TB01520212',
        cartonID: '8x Steel Beams (Total Wgt: 5200 KG)',
        weight: 5200,
        weightUnit: 'KG',
      },
    ],
  },
  {
    tbReference: 'TB01520213',
    bookingFor: 'SIAA195586',
    template: 'Import Air Freight',
    freightMode: 'AIR',
    freightModeDesc: 'Air Freight',
    waybillNumber: 'STAA29195587',
    goodsDescription: 'AUTOMOTIVE PARTS - ENGINE COMPONENTS',
    branch: 'LAX1',
    branchDesc: 'US-Los Angeles (LAX)',
    serviceLevel: 'AF2',
    serviceLevelDesc: 'Airport to Airport',
    transportCompany: 'AIR CARGO EXPRESS',
    transportMode: 'AIR',
    transportModeDesc: 'Air Transport',
    requestedDate: '2026-03-05',
    allocatedPackages: {
      packs: 25,
      packsUnit: 'CTN',
      weight: 890.0,
      weightUnit: 'KG',
      volume: 4.2,
      volumeUnit: 'M3',
      volumeWeight: 700.0,
      volumeWeightUnit: 'KG',
      chargeableWeight: 890.0,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'PENDING',
    },
    addresses: [
      {
        type: 'Pickup - Airport',
        organization: 'LAX CARGO TERMINAL',
        address: '6151 W CENTURY BLVD',
        city: 'LOS ANGELES',
        state: 'CA',
        zip: '90045',
        country: 'UNITED STATES',
        packageType: 'CARTONS',
        dropMode: 'AIR - Air Freight',
        picEstimated: '2026-03-06 10:00',
        instructionNotes: 'CUSTOMS CLEARANCE REQUIRED',
        status: 'PENDING',
      },
      {
        type: 'Delivery - Consignee',
        organization: 'PACIFIC AUTO MANUFACTURING',
        address: '8900 INDUSTRIAL AVE',
        city: 'TORRANCE',
        state: 'CA',
        zip: '90501',
        country: 'UNITED STATES',
        packageType: 'CARTONS',
        dropMode: 'STD - Standard',
        dlvEstimated: '2026-03-07 15:00',
        instructionNotes: 'M-F 7AM-4PM DELIVERIES ONLY',
        status: 'PENDING',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-03-01 11:15',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        estimated: '2026-03-05',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
        estimated: '2026-03-07',
      },
    ],
    documents: [],
  },
  {
    tbReference: 'TB01520214',
    bookingFor: 'SEAA195587',
    template: 'Export Ocean Freight Drayage',
    freightMode: 'SEA',
    freightModeDesc: 'Ocean Freight',
    waybillNumber: 'STAA30195588',
    goodsDescription: 'TEXTILE PRODUCTS - COTTON FABRIC ROLLS',
    branch: 'SEA1',
    branchDesc: 'US-Seattle (SEA)',
    serviceLevel: 'DRY',
    serviceLevelDesc: 'Drayage Service',
    transportCompany: 'PORT DRAYAGE SERVICES',
    transportMode: 'ROA',
    transportModeDesc: 'Road Transport',
    requestedDate: '2026-02-20',
    allocatedPackages: {
      packs: 40,
      packsUnit: 'RLS',
      weight: 3500.0,
      weightUnit: 'KG',
      volume: 8.5,
      volumeUnit: 'M3',
      volumeWeight: 1416.67,
      volumeWeightUnit: 'KG',
      chargeableWeight: 3500.0,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'ON_HOLD',
    },
    addresses: [
      {
        type: 'Pickup - Warehouse',
        organization: 'NORTHWEST TEXTILES',
        address: '3200 MANUFACTURING DR',
        city: 'TACOMA',
        state: 'WA',
        zip: '98421',
        country: 'UNITED STATES',
        packageType: 'ROLLS',
        dropMode: 'STD - Standard',
        picEstimated: '2026-02-21 09:00',
        instructionNotes: 'CONTACT WAREHOUSE 24HRS PRIOR',
        status: 'ON_HOLD',
      },
      {
        type: 'Delivery - Port',
        organization: 'PORT OF SEATTLE - TERMINAL 5',
        address: '1101 ALASKAN WAY S',
        city: 'SEATTLE',
        state: 'WA',
        zip: '98134',
        country: 'UNITED STATES',
        packageType: 'ROLLS',
        dropMode: 'DRY - Drayage',
        dlvEstimated: '2026-02-22 11:00',
        instructionNotes: 'VGM WEIGHT VERIFICATION REQUIRED',
        status: 'ON_HOLD',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-02-15 16:45',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        estimated: '2026-02-20',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
        estimated: '2026-02-21',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
      },
    ],
    documents: [],
  },
  {
    tbReference: 'TB01520215',
    bookingFor: 'SIAA195588',
    template: 'Import LCL Delivery',
    freightMode: 'LCL',
    freightModeDesc: 'Less Container Load',
    waybillNumber: 'STAA31195589',
    goodsDescription: 'CONSUMER ELECTRONICS - LAPTOPS AND TABLETS',
    branch: 'MIA1',
    branchDesc: 'US-Miami (MIA)',
    serviceLevel: 'AF4',
    serviceLevelDesc: 'AirFast Airport to Door',
    transportCompany: 'RAPID DELIVERY LOGISTICS',
    transportMode: 'ROA',
    transportModeDesc: 'Road Transport',
    requestedDate: '2026-03-15',
    allocatedPackages: {
      packs: 150,
      packsUnit: 'CTN',
      weight: 1250.0,
      weightUnit: 'KG',
      volume: 12.8,
      volumeUnit: 'M3',
      volumeWeight: 2133.33,
      volumeWeightUnit: 'KG',
      chargeableWeight: 2133.33,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'CANCELLED',
    },
    addresses: [
      {
        type: 'Pickup - CFS',
        organization: 'MIAMI CFS FACILITY',
        address: '7500 NW 25TH ST',
        city: 'MIAMI',
        state: 'FL',
        zip: '33122',
        country: 'UNITED STATES',
        packageType: 'CARTONS',
        dropMode: 'STD - Standard',
        picEstimated: '2026-03-16 08:00',
        instructionNotes: 'CANCELLED - CUSTOMER REQUEST',
        status: 'CANCELLED',
      },
      {
        type: 'Delivery - Retailer',
        organization: 'TECH WORLD DISTRIBUTION',
        address: '1850 GRIFFIN RD',
        city: 'FORT LAUDERDALE',
        state: 'FL',
        zip: '33312',
        country: 'UNITED STATES',
        packageType: 'CARTONS',
        dropMode: 'STD - Standard',
        dlvEstimated: '2026-03-17 14:00',
        status: 'CANCELLED',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-03-10 13:22',
      },
      {
        description: 'Booking Rejected',
        seq: 14,
        event: 'REJ',
        actual: '2026-03-14 09:30',
      },
    ],
    documents: [],
  },
  {
    tbReference: 'TB01520216',
    bookingFor: 'SDAA195589',
    template: 'Domestic Intermodal',
    freightMode: 'IML',
    freightModeDesc: 'Intermodal Rail/Road',
    waybillNumber: 'STAA32195590',
    goodsDescription: 'FURNITURE - OFFICE DESKS AND CHAIRS',
    branch: 'DEN1',
    branchDesc: 'US-Denver (DEN)',
    serviceLevel: 'IML',
    serviceLevelDesc: 'Intermodal Service',
    transportCompany: 'CONTINENTAL INTERMODAL',
    transportMode: 'IML',
    transportModeDesc: 'Intermodal Transport',
    requestedDate: '2026-04-01',
    allocatedPackages: {
      packs: 18,
      packsUnit: 'PLT',
      weight: 4200.0,
      weightUnit: 'KG',
      volume: 22.5,
      volumeUnit: 'M3',
      volumeWeight: 3750.0,
      volumeWeightUnit: 'KG',
      chargeableWeight: 4200.0,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'IN_PROGRESS',
    },
    addresses: [
      {
        type: 'Pickup - Distribution Center',
        organization: 'OFFICE FURNITURE WAREHOUSE',
        address: '12500 E 39TH AVE',
        city: 'DENVER',
        state: 'CO',
        zip: '80239',
        country: 'UNITED STATES',
        packageType: 'PALLETS',
        dropMode: 'IML - Intermodal',
        picEstimated: '2026-04-02 10:00',
        picActual: '2026-04-02 09:45',
        instructionNotes: 'PALLETS SHRINK-WRAPPED',
        status: 'COMPLETED',
      },
      {
        type: 'Delivery - Office Complex',
        organization: 'CORPORATE PLAZA BUILDING',
        address: '500 W MADISON ST',
        city: 'CHICAGO',
        state: 'IL',
        zip: '60661',
        country: 'UNITED STATES',
        packageType: 'PALLETS',
        dropMode: 'IML - Intermodal',
        dlvEstimated: '2026-04-05 13:00',
        instructionNotes: 'LOADING DOCK B - AFTER 12PM ONLY',
        status: 'IN_PROGRESS',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-03-25 10:15',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        actual: '2026-04-01 07:30',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
        estimated: '2026-04-02 10:00',
        actual: '2026-04-02 09:45',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
        estimated: '2026-04-05 13:00',
      },
    ],
    documents: [],
  },
  {
    tbReference: 'TB01520217',
    bookingFor: 'SIAA195590',
    template: 'Import Hazmat Delivery',
    freightMode: 'HAZ',
    freightModeDesc: 'Hazardous Materials',
    waybillNumber: 'STAA33195591',
    goodsDescription: 'CHEMICAL REAGENTS - LAB SUPPLIES (CLASS 8)',
    branch: 'BOS1',
    branchDesc: 'US-Boston (BOS)',
    serviceLevel: 'HAZ',
    serviceLevelDesc: 'Hazmat Certified Service',
    transportCompany: 'HAZMAT TRANSPORT SPECIALISTS',
    transportMode: 'ROA',
    transportModeDesc: 'Road Transport',
    requestedDate: '2026-03-20',
    allocatedPackages: {
      packs: 8,
      packsUnit: 'DRM',
      weight: 320.0,
      weightUnit: 'KG',
      volume: 1.2,
      volumeUnit: 'M3',
      volumeWeight: 200.0,
      volumeWeightUnit: 'KG',
      chargeableWeight: 320.0,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: true,
      status: 'AVAILABLE',
    },
    addresses: [
      {
        type: 'Pickup - Port Warehouse',
        organization: 'BOSTON PORT AUTHORITY - HAZMAT',
        address: '88 BLACK FALCON AVE',
        city: 'BOSTON',
        state: 'MA',
        zip: '02210',
        country: 'UNITED STATES',
        packageType: 'DRUMS',
        dropMode: 'HAZ - Hazmat',
        picEstimated: '2026-03-21 07:00',
        instructionNotes: 'HAZMAT ENDORSEMENT REQUIRED - UN2809',
        status: 'AVAILABLE',
      },
      {
        type: 'Delivery - Laboratory',
        organization: 'BIOTECH RESEARCH LAB',
        address: '245 FIRST ST, BUILDING 3',
        city: 'CAMBRIDGE',
        state: 'MA',
        zip: '02142',
        country: 'UNITED STATES',
        packageType: 'DRUMS',
        dropMode: 'HAZ - Hazmat',
        dlvEstimated: '2026-03-21 14:00',
        instructionNotes: 'SAFETY OFFICER MUST BE PRESENT',
        status: 'AVAILABLE',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-03-18 15:10',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        estimated: '2026-03-20',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
        estimated: '2026-03-21',
      },
    ],
    documents: [],
  },
  {
    tbReference: 'TB01520218',
    template: 'Standalone Cross-Border Transport',
    freightMode: 'XBD',
    freightModeDesc: 'Cross-Border',
    waybillNumber: 'STAA34195592',
    goodsDescription: 'AUTOMOTIVE PARTS - TRANSMISSIONS',
    branch: 'DET1',
    branchDesc: 'US-Detroit (DTW)',
    serviceLevel: 'XBD',
    serviceLevelDesc: 'Cross-Border Direct',
    transportCompany: 'BORDER EXPRESS LOGISTICS',
    transportMode: 'ROA',
    transportModeDesc: 'Road Transport',
    requestedDate: '2026-04-08',
    allocatedPackages: {
      packs: 6,
      packsUnit: 'CRT',
      weight: 1800.0,
      weightUnit: 'KG',
      volume: 6.5,
      volumeUnit: 'M3',
      volumeWeight: 1083.33,
      volumeWeightUnit: 'KG',
      chargeableWeight: 1800.0,
      chargeableWeightUnit: 'KG',
      override: false,
      refrigeration: false,
      hazardous: false,
      status: 'AVAILABLE',
    },
    addresses: [
      {
        type: 'Pickup - Manufacturing Plant',
        organization: 'AUTO PARTS MANUFACTURING USA',
        address: '15000 MICHIGAN AVE',
        city: 'DEARBORN',
        state: 'MI',
        zip: '48126',
        country: 'UNITED STATES',
        packageType: 'CRATES',
        dropMode: 'XBD - Cross-Border',
        picEstimated: '2026-04-09 08:00',
        instructionNotes: 'COMMERCIAL INVOICE REQUIRED FOR CUSTOMS',
        status: 'AVAILABLE',
      },
      {
        type: 'Delivery - Assembly Plant',
        organization: 'CANADIAN AUTO ASSEMBLY',
        address: '1950 WALKER RD',
        city: 'WINDSOR',
        state: 'ON',
        zip: 'N8W 3K9',
        country: 'CANADA',
        packageType: 'CRATES',
        dropMode: 'XBD - Cross-Border',
        dlvEstimated: '2026-04-09 16:00',
        instructionNotes: 'NAFTA CERTIFICATE OF ORIGIN ATTACHED',
        status: 'AVAILABLE',
      },
    ],
    milestones: [
      {
        description: 'Booking Confirmed',
        seq: 12,
        event: 'BKC',
        actual: '2026-04-05 11:40',
      },
      {
        description: 'Booking Requested with Transport Company',
        seq: 96,
        event: 'BKQ',
        estimated: '2026-04-08',
      },
      {
        description: 'Goods Picked-up',
        seq: 200,
        event: 'PCF',
        estimated: '2026-04-09',
      },
      {
        description: 'Goods delivered to Consignee',
        seq: 950,
        event: 'DCF',
        estimated: '2026-04-09',
      },
    ],
    documents: [],
    referenceNumbers: [
      { numberType: 'INV', number: 'INV-2026-089234', thisTBOnly: true },
      { numberType: 'NAFTA', number: 'NAFTA-2026-04-089', thisTBOnly: true },
    ],
    packingData: [
      {
        booking: 'Standalone TB01520218',
        cartonID: '6x Crates (Total Wgt: 1800 KG)',
        weight: 1800,
        weightUnit: 'KG',
      },
    ],
  },
];

// Mock Shipments
export const mockShipments: Shipment[] = [
  {
    shipmentRef: 'SSTAA195583',
    type: 'Import',
    origin: 'AIR',
    destination: 'ARN - RDU',
    destCode: 'RDU',
    lastMilestone: 'Arrival',
    etd: 'Jan 13, 2026 6:12 AM',
    eta: 'Jan 14, 2026 6:48 PM',
    transportBookings: ['TB01520209'],
    deliveryAddress: 'RTP 4001 E NC 54 HW, ASSEMBLY, SUITE 1100',
  },
  {
    shipmentRef: 'SEAA195584',
    type: 'Export',
    origin: 'ATL',
    destination: 'SAV',
    destCode: 'SAV',
    lastMilestone: 'Booking Confirmed',
    etd: 'Jan 21, 2026 8:00 AM',
    eta: 'Jan 22, 2026 2:00 PM',
    transportBookings: ['TB01520210'],
  },
  {
    shipmentRef: 'SDAA195585',
    type: 'Domestic',
    origin: 'CHI',
    destination: 'IND',
    destCode: 'IND',
    lastMilestone: 'In Transit',
    etd: 'Feb 2, 2026 6:00 AM',
    eta: 'Feb 2, 2026 6:00 PM',
    transportBookings: ['TB01520211'],
    deliveryAddress: '850 MEDICAL CENTER DR, INDIANAPOLIS',
  },
  {
    shipmentRef: 'SIAA195586',
    type: 'Import',
    origin: 'NRT',
    destination: 'LAX',
    destCode: 'LAX',
    lastMilestone: 'Customs Hold',
    etd: 'Mar 4, 2026 10:30 PM',
    eta: 'Mar 5, 2026 2:15 PM',
    transportBookings: ['TB01520213'],
    deliveryAddress: '8900 INDUSTRIAL AVE, TORRANCE, CA',
  },
  {
    shipmentRef: 'SEAA195587',
    type: 'Export',
    origin: 'SEA',
    destination: 'SHA - Shanghai',
    destCode: 'SHA',
    lastMilestone: 'Documentation Hold',
    etd: 'Feb 24, 2026 11:00 AM',
    eta: 'Mar 10, 2026 9:00 AM',
    transportBookings: ['TB01520214'],
  },
  {
    shipmentRef: 'SIAA195588',
    type: 'Import',
    origin: 'GRU',
    destination: 'MIA',
    destCode: 'MIA',
    lastMilestone: 'Cancelled',
    etd: 'Mar 14, 2026 8:45 PM',
    eta: 'Mar 15, 2026 6:30 AM',
    transportBookings: ['TB01520215'],
    deliveryAddress: '1850 GRIFFIN RD, FORT LAUDERDALE, FL',
  },
  {
    shipmentRef: 'SDAA195589',
    type: 'Domestic',
    origin: 'DEN',
    destination: 'ORD - Chicago',
    destCode: 'ORD',
    lastMilestone: 'Loaded on Rail',
    etd: 'Apr 2, 2026 9:45 AM',
    eta: 'Apr 5, 2026 1:00 PM',
    transportBookings: ['TB01520216'],
    deliveryAddress: '500 W MADISON ST, CHICAGO, IL',
  },
  {
    shipmentRef: 'SIAA195590',
    type: 'Import',
    origin: 'FRA',
    destination: 'BOS',
    destCode: 'BOS',
    lastMilestone: 'Arrived at Port',
    etd: 'Mar 18, 2026 4:20 PM',
    eta: 'Mar 19, 2026 11:45 AM',
    transportBookings: ['TB01520217'],
    deliveryAddress: '245 FIRST ST, CAMBRIDGE, MA',
  },
  {
    shipmentRef: 'SEAA195591',
    type: 'Export',
    origin: 'NYC',
    destination: 'LHR - London',
    destCode: 'LHR',
    lastMilestone: 'Customs Cleared',
    etd: 'Apr 10, 2026 7:30 PM',
    eta: 'Apr 11, 2026 8:15 AM',
    transportBookings: [],
  },
  {
    shipmentRef: 'SIAA195592',
    type: 'Import',
    origin: 'HKG',
    destination: 'SFO',
    destCode: 'SFO',
    lastMilestone: 'Departed Origin',
    etd: 'Apr 7, 2026 11:20 PM',
    eta: 'Apr 8, 2026 9:45 AM',
    transportBookings: [],
    deliveryAddress: '1500 TECHNOLOGY DR, SAN JOSE, CA',
  },
  {
    shipmentRef: 'SDAA195593',
    type: 'Domestic',
    origin: 'PHX',
    destination: 'SAN - San Diego',
    destCode: 'SAN',
    lastMilestone: 'Booked',
    etd: 'Apr 12, 2026 6:00 AM',
    eta: 'Apr 12, 2026 3:00 PM',
    transportBookings: [],
  },
  {
    shipmentRef: 'SEAA195594',
    type: 'Export',
    origin: 'HOU',
    destination: 'MEX - Mexico City',
    destCode: 'MEX',
    lastMilestone: 'Ready for Pickup',
    etd: 'Apr 15, 2026 1:00 PM',
    eta: 'Apr 16, 2026 10:30 AM',
    transportBookings: [],
    deliveryAddress: 'CDMX CARGO TERMINAL',
  },
];

// Mock Containers
export const mockContainers: Container[] = [
  {
    containerNo: 'BEAU4015708',
    type: 'HC',
    size: '40',
    shipmentRef: 'SSTAA195583',
    tbReference: 'TB01520209',
    pol: 'DKTPM',
    pod: 'USRDU',
    eta: 'Jan 14, 2026',
    consignee: 'GRAIL',
    destination: 'DURHAM NC',
    deliveryAddress: 'RTP 4001 E NC 54 HW, ASSEMBLY, SUITE 1100',
    shipment: 'SSTAA195583',
  },
  {
    containerNo: 'BEAU4025247',
    type: 'STD',
    size: '20',
    shipmentRef: 'SEAA195584',
    tbReference: 'TB01520210',
    pol: 'USATL',
    pod: 'USSAV',
    eta: 'Jan 22, 2026',
    consignee: 'TRADE SPEC LIC',
    destination: 'SAVANNAH PORT',
    deliveryAddress: '1 OCEAN TERMINAL DR',
    shipment: 'SEAA195584',
  },
  {
    containerNo: 'CABU7043791',
    type: 'HC',
    size: '40',
    shipmentRef: 'SIAA195586',
    tbReference: 'TB01520213',
    pol: 'JPNRT',
    pod: 'USLAX',
    eta: 'Mar 5, 2026',
    consignee: 'PACIFIC AUTO MANUFACTURING',
    destination: 'TORRANCE CA',
    deliveryAddress: '8900 INDUSTRIAL AVE',
    shipment: 'SIAA195586',
  },
  {
    containerNo: 'CABU8848608',
    type: 'STD',
    size: '40',
    shipmentRef: 'SEAA195587',
    tbReference: 'TB01520214',
    pol: 'USSEA',
    pod: 'CNSHA',
    eta: 'Mar 10, 2026',
    consignee: 'SHANGHAI TEXTILES IMP',
    destination: 'SHANGHAI PORT',
    deliveryAddress: '1101 ALASKAN WAY S',
    shipment: 'SEAA195587',
  },
  {
    containerNo: 'CAXU5107903',
    type: 'HC',
    size: '40',
    shipmentRef: 'SIAA195588',
    pol: 'BRGRU',
    pod: 'USMIA',
    eta: 'Mar 15, 2026',
    consignee: 'TECH WORLD DISTRIBUTION',
    destination: 'FORT LAUDERDALE',
    deliveryAddress: '1850 GRIFFIN RD',
    shipment: 'SIAA195588',
  },
  {
    containerNo: 'CMAU4512367',
    type: 'HC',
    size: '45',
    shipmentRef: 'SDAA195589',
    tbReference: 'TB01520216',
    pol: 'USDEN',
    pod: 'USORD',
    eta: 'Apr 5, 2026',
    consignee: 'CORPORATE PLAZA BUILDING',
    destination: 'CHICAGO IL',
    deliveryAddress: '500 W MADISON ST',
    shipment: 'SDAA195589',
  },
  {
    containerNo: 'DFSU2398476',
    type: 'RF',
    size: '20',
    shipmentRef: 'SDAA195585',
    tbReference: 'TB01520211',
    pol: 'USCHI',
    pod: 'USIND',
    eta: 'Feb 2, 2026',
    consignee: 'MEMORIAL HOSPITAL',
    destination: 'INDIANAPOLIS',
    deliveryAddress: '850 MEDICAL CENTER DR',
    shipment: 'SDAA195585',
  },
  {
    containerNo: 'EGHU5672341',
    type: 'STD',
    size: '20',
    shipmentRef: 'SIAA195590',
    tbReference: 'TB01520217',
    pol: 'DEFRA',
    pod: 'USBOS',
    eta: 'Mar 19, 2026',
    consignee: 'BIOTECH RESEARCH LAB',
    destination: 'CAMBRIDGE MA',
    deliveryAddress: '245 FIRST ST, BUILDING 3',
    shipment: 'SIAA195590',
  },
  {
    containerNo: 'FCIU3847562',
    type: 'HC',
    size: '40',
    shipmentRef: 'SEAA195591',
    pol: 'USNYC',
    pod: 'GBLHR',
    eta: 'Apr 11, 2026',
    consignee: 'UK DISTRIBUTION LTD',
    destination: 'LONDON HEATHROW',
    deliveryAddress: 'HEATHROW CARGO TERMINAL',
    shipment: 'SEAA195591',
  },
  {
    containerNo: 'GCXU4729183',
    type: 'HC',
    size: '40',
    shipmentRef: 'SIAA195592',
    pol: 'HKHKG',
    pod: 'USSFO',
    eta: 'Apr 8, 2026',
    consignee: 'SILICON VALLEY TECH',
    destination: 'SAN JOSE CA',
    deliveryAddress: '1500 TECHNOLOGY DR',
    shipment: 'SIAA195592',
  },
  {
    containerNo: 'HLBU5839274',
    type: 'STD',
    size: '20',
    shipmentRef: 'SDAA195593',
    pol: 'USPHX',
    pod: 'USSAN',
    eta: 'Apr 12, 2026',
    consignee: 'PACIFIC LOGISTICS',
    destination: 'SAN DIEGO',
    deliveryAddress: '2500 HARBOR DR',
    shipment: 'SDAA195593',
  },
  {
    containerNo: 'INBU6294738',
    type: 'HC',
    size: '40',
    shipmentRef: 'SEAA195594',
    pol: 'USHOU',
    pod: 'MXMEX',
    eta: 'Apr 16, 2026',
    consignee: 'MEXICO CARGO SERVICES',
    destination: 'MEXICO CITY',
    deliveryAddress: 'CDMX CARGO TERMINAL',
    shipment: 'SEAA195594',
  },
  {
    containerNo: 'JKLU4857293',
    type: 'OT',
    size: '20',
    shipmentRef: 'SSTAA195583',
    pol: 'NLRTM',
    pod: 'USRDU',
    eta: 'Jan 14, 2026',
    consignee: 'GRAIL',
    destination: 'DURHAM NC',
    deliveryAddress: 'ALTERNATE DELIVERY SITE',
    shipment: 'SSTAA195583',
  },
  {
    containerNo: 'KKFU3847561',
    type: 'STD',
    size: '40',
    shipmentRef: 'SEAA195587',
    pol: 'USSEA',
    pod: 'CNSHA',
    eta: 'Mar 10, 2026',
    consignee: 'NORTHWEST TEXTILES',
    destination: 'SHANGHAI',
    deliveryAddress: '3200 MANUFACTURING DR',
    shipment: 'SEAA195587',
  },
  {
    containerNo: 'LMNU5729384',
    type: 'HC',
    size: '45',
    shipmentRef: 'SIAA195586',
    pol: 'JPNRT',
    pod: 'USLAX',
    eta: 'Mar 5, 2026',
    consignee: 'PACIFIC AUTO MANUFACTURING',
    destination: 'TORRANCE',
    deliveryAddress: '8900 INDUSTRIAL AVE',
    shipment: 'SIAA195586',
  },
];

export function getTransportBooking(tbRef: string): TransportBooking | undefined {
  return mockTransportBookings.find((tb) => tb.tbReference === tbRef);
}

export function getShipment(shipmentRef: string): Shipment | undefined {
  return mockShipments.find((s) => s.shipmentRef === shipmentRef);
}

export function getContainersByShipment(shipmentRef: string): Container[] {
  return mockContainers.filter((c) => c.shipmentRef === shipmentRef);
}

export function getTBsByShipment(shipmentRef: string): TransportBooking[] {
  const shipment = getShipment(shipmentRef);
  if (!shipment) return [];
  return mockTransportBookings.filter((tb) =>
    shipment.transportBookings.includes(tb.tbReference)
  );
}

// Helper to determine which milestones to show based on shipment type
export function getVisibleMilestones(
  tb: TransportBooking,
  shipmentType?: ShipmentType
): Milestone[] {
  if (!shipmentType) {
    // Standalone TB - show both pickup and delivery
    return tb.milestones;
  }

  return tb.milestones.filter((m) => {
    if (shipmentType === 'Export') {
      // Export: show only Goods Picked-up
      return m.event !== 'DCF';
    } else if (shipmentType === 'Import') {
      // Import: show only Goods Delivered
      return m.event !== 'PCF';
    } else {
      // Domestic: show both
      return true;
    }
  });
}
