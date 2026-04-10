import { Outlet, NavLink } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { User, Settings, HelpCircle, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';
import headphoneLogo from 'figma:asset/4b23c959b2d7a9a05308b717bf1f4fcd724d3d10.png';
import darkBg from 'figma:asset/47e1e9725b46efa508e7ab37949cd20c3a5c00fb.png';
import lightBg from 'figma:asset/3e5437e26d8e7d1bf5811dc356ddc8bc6a067ae7.png';
import { Toast } from './ui/toast';
import { useTheme } from '../contexts/ThemeContext';

export function Layout() {
  const { isDark, toggleTheme } = useTheme();
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
    }
    if (showAccountDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAccountDropdown]);

  const showDemoToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const navActive = `px-6 py-2 rounded-full transition-colors bg-[var(--brand-active)] border border-[var(--brand-active-border)] text-[var(--brand-text)]`;
  const navInactive = `px-6 py-2 rounded-full transition-colors text-[var(--brand-muted)] hover:text-[var(--brand-text)] hover:bg-[var(--brand-card)]`;

  return (
    <div className="flex flex-col h-screen overflow-hidden relative">
      {/* ── Background Image ── */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `url(${isDark ? darkBg : lightBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* ── Top Navigation Bar ── */}
      <header
        className="relative z-[10000] border-b backdrop-blur-md"
        style={{
          background: 'var(--brand-nav)',
          borderColor: 'var(--brand-nav-border)',
        }}
      >
        <div className="flex items-center justify-between px-8 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={headphoneLogo} 
              alt="AI Music Platform Logo"
              className="w-10 h-10"
              style={{
                filter: isDark ? 'brightness(0) invert(1)' : 'none',
              }}
            />
            <span
              className="text-sm tracking-wide"
              style={{ color: 'var(--brand-muted)', fontFamily: 'var(--font-body)' }}
            >
              AI Music Platform
            </span>
          </div>

          {/* Main Navigation */}
          <nav className="flex gap-2">
            <NavLink to="/" end className={({ isActive }) => isActive ? navActive : navInactive}>
              Create
            </NavLink>
            <NavLink to="/upload" className={({ isActive }) => isActive ? navActive : navInactive}>
              Upload
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? navActive : navInactive}>
              Projects
            </NavLink>
            <NavLink to="/student-models" className={({ isActive }) => isActive ? navActive : navInactive}>
              Student Models
            </NavLink>
            <NavLink to="/explore" className={({ isActive }) => isActive ? navActive : navInactive}>
              Explore
            </NavLink>
          </nav>

          {/* Right Side – Account Dropdown */}
          <div className="flex items-center gap-4 text-xs">
            <div className="relative z-[9999]" ref={dropdownRef}>
              <button
                onClick={() => setShowAccountDropdown(!showAccountDropdown)}
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{ color: 'var(--brand-muted)' }}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center border"
                  style={{
                    background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))',
                    borderColor: 'var(--brand-border)',
                  }}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--brand-text)' }}>Account</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform`}
                  style={{ transform: showAccountDropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              {/* Dropdown Menu */}
              {showAccountDropdown && (
                <div
                  className="absolute right-0 top-full mt-2 w-64 rounded-2xl shadow-2xl overflow-hidden border backdrop-blur-md"
                  style={{
                    background: 'var(--brand-modal)',
                    borderColor: 'var(--brand-border)',
                  }}
                >
                  {/* User Info */}
                  <div
                    className="p-4 border-b"
                    style={{ borderColor: 'var(--brand-border)' }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))',
                        }}
                      >
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm" style={{ color: 'var(--brand-text)' }}>User</div>
                        <div className="text-xs" style={{ color: 'var(--brand-muted)' }}>user@miami.edu</div>
                      </div>
                    </div>
                  </div>

                  {/* Theme Toggle */}
                  <div
                    className="px-4 py-3 border-b flex items-center justify-between"
                    style={{ borderColor: 'var(--brand-border)' }}
                  >
                    <span className="text-sm flex items-center gap-2" style={{ color: 'var(--brand-text)' }}>
                      {isDark ? <Moon className="w-4 h-4" style={{ color: 'var(--brand-accent)' }} /> : <Sun className="w-4 h-4" style={{ color: 'var(--brand-cta)' }} />}
                      {isDark ? 'Dark Theme' : 'Light Theme'}
                    </span>
                    <button
                      onClick={toggleTheme}
                      className="relative inline-flex items-center w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
                      style={{
                        background: isDark
                          ? 'linear-gradient(135deg, var(--brand-accent), var(--brand-warm))'
                          : 'rgba(150,130,180,0.3)',
                      }}
                    >
                      <span
                        className="inline-block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                        style={{ transform: isDark ? 'translateX(22px)' : 'translateX(2px)' }}
                      />
                    </button>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowAccountDropdown(false);
                        showDemoToast('This is an educational prototype.');
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors hover:bg-[var(--brand-card-hover)]"
                      style={{ color: 'var(--brand-text)' }}
                    >
                      <Settings className="w-4 h-4" style={{ color: 'var(--brand-muted)' }} />
                      Account Settings
                    </button>

                    <button
                      onClick={() => {
                        setShowAccountDropdown(false);
                        showDemoToast('This is an educational prototype.');
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors hover:bg-[var(--brand-card-hover)]"
                      style={{ color: 'var(--brand-text)' }}
                    >
                      <HelpCircle className="w-4 h-4" style={{ color: 'var(--brand-muted)' }} />
                      Help & Support
                    </button>

                    <div className="my-2 border-t" style={{ borderColor: 'var(--brand-border)' }} />

                    <button
                      onClick={() => {
                        setShowAccountDropdown(false);
                        showDemoToast('Logout functionality is part of the demo workflow.');
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors hover:bg-[var(--brand-card-hover)]"
                      style={{ color: 'var(--brand-cta)' }}
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* ── Toast Notifications ── */}
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}