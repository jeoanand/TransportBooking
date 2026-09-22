import { Outlet, Link, useLocation } from 'react-router';
import { MapPin, Package, Ship, BarChart3, FileText, Calendar, DollarSign, ClipboardList, FileBarChart } from 'lucide-react';

export default function RootLayout() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-indigo-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Ship className="w-6 h-6 text-indigo-900" />
            </div>
            <span className="font-bold text-xl">GEODIS</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-xs uppercase tracking-wider text-indigo-300 px-3 py-2 font-medium">
            Administration
          </div>

          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive('/') && location.pathname === '/'
                ? 'bg-indigo-700 text-white'
                : 'text-indigo-100 hover:bg-indigo-700/50'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Tracking</span>
          </Link>

          {/* Tracking Submenu */}
          {isActive('/') && (
            <div className="ml-8 mt-1 space-y-1">
              <Link
                to="/"
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === '/'
                    ? 'bg-indigo-600 text-white'
                    : 'text-indigo-200 hover:bg-indigo-700/30'
                }`}
              >
                Shipment List
              </Link>
              <Link
                to="/container-visibility"
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === '/container-visibility'
                    ? 'bg-indigo-600 text-white'
                    : 'text-indigo-200 hover:bg-indigo-700/30'
                }`}
              >
                Container Visibility
              </Link>
              <Link
                to="/transport-bookings"
                className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === '/transport-bookings'
                    ? 'bg-indigo-600 text-white'
                    : 'text-indigo-200 hover:bg-indigo-700/30'
                }`}
              >
                Transport Bookings
              </Link>
            </div>
          )}

          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-100 hover:bg-indigo-700/50 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-100 hover:bg-indigo-700/50 transition-colors"
          >
            <FileText className="w-5 h-5" />
            <span>Quotation</span>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-100 hover:bg-indigo-700/50 transition-colors"
          >
            <Package className="w-5 h-5" />
            <span>Booking</span>
          </Link>

          <Link
            to="/milestone-entry"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
              isActive('/milestone-entry')
                ? 'bg-indigo-700 text-white'
                : 'text-indigo-100 hover:bg-indigo-700/50'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span>Milestone Entry</span>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-100 hover:bg-indigo-700/50 transition-colors"
          >
            <DollarSign className="w-5 h-5" />
            <span>Finance</span>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-100 hover:bg-indigo-700/50 transition-colors"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Order Management</span>
          </Link>

          <Link
            to="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-indigo-100 hover:bg-indigo-700/50 transition-colors"
          >
            <FileBarChart className="w-5 h-5" />
            <span>Reporting</span>
          </Link>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-indigo-700">
          <div className="text-xs text-indigo-300">Logged in as</div>
          <div className="text-sm font-medium mt-1">Customer Portal</div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
