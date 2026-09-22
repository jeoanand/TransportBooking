import { createBrowserRouter } from 'react-router';
import RootLayout from './layouts/RootLayout';
import ShipmentList from './pages/ShipmentList';
import ShipmentDetail from './pages/ShipmentDetail';
import TransportBookingDetail from './pages/TransportBookingDetail';
import ContainerVisibility from './pages/ContainerVisibility';
import TransportBookingList from './pages/TransportBookingList';
import MilestoneEntry from './pages/MilestoneEntry';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: ShipmentList },
      { path: 'shipment/:shipmentRef', Component: ShipmentDetail },
      { path: 'transport-booking/:tbRef', Component: TransportBookingDetail },
      { path: 'container-visibility', Component: ContainerVisibility },
      { path: 'transport-bookings', Component: TransportBookingList },
      { path: 'milestone-entry', Component: MilestoneEntry },
    ],
  },
]);
