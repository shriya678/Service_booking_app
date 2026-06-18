// Shared top bar with animated active-link pill (layoutId magic).
//   logged out → logo + "Sign in" / "Get started"
//   logged in  → logo + nav links + user name + logout

import { Link, NavLink } from 'react-router-dom';
import { Calendar, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 border-b border-slate-200 sticky top-0 z-20 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-9 h-9 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-md shadow-violet-500/30"
          >
            <Calendar className="w-4 h-4 text-white" />
          </motion.div>
          <span className="font-bold text-slate-900 tracking-tight">Bookly</span>
        </Link>

        {user ? (
          <nav className="flex items-center gap-1">
            <NavItem to="/dashboard">Dashboard</NavItem>
            <NavItem to="/providers">Browse</NavItem>
            {user.role === 'PROVIDER' && (
              <NavItem to="/my-provider">My profile</NavItem>
            )}
            <div className="ml-2 flex items-center gap-2 pl-3 border-l border-slate-200">
              <span className="hidden sm:block text-sm text-slate-600">
                {user.name}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={logout}
                title="Logout"
                className="p-2 hover:bg-slate-100 rounded-md text-slate-500 hover:text-slate-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </motion.button>
            </div>
          </nav>
        ) : (
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-violet-600 px-3 py-1.5 transition-colors"
            >
              Sign in
            </Link>
            <Link to="/signup">
              <Button size="sm">Get started</Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

// NavItem renders an active "pill" that slides between nav links thanks
// to `layoutId`. When the active route changes, motion animates the pill
// from old position to new — without us writing any code for that.
function NavItem({ to, children }) {
  return (
    <NavLink to={to} className="relative inline-block px-3 py-1.5 text-sm font-medium">
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="active-nav-pill"
              className="absolute inset-0 bg-violet-100 rounded-md"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span
            className={`relative z-10 transition-colors ${
              isActive ? 'text-violet-700' : 'text-slate-700 hover:text-violet-700'
            }`}
          >
            {children}
          </span>
        </>
      )}
    </NavLink>
  );
}
