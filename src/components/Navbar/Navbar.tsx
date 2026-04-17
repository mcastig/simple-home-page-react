import { useState, useCallback } from 'react';
import MobileDrawer from '../MobileDrawer/MobileDrawer';
import './Navbar.css';

interface NavbarProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ isDark, onToggleTheme }: NavbarProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <>
      <header className="navbar" role="banner">
        <div className="navbar__inner">
          {/* Logo */}
          <a href="/" className="navbar__logo" aria-label="Alarado home">
            <img
              src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
              alt="Alarado"
              width={141}
              height={24}
            />
          </a>

          {/* Desktop nav links */}
          <nav className="navbar__links" aria-label="Main navigation">
            <a href="#" className="navbar__link navbar__link--active" aria-current="page">
              About us
            </a>
            <a href="#" className="navbar__link">
              Product
            </a>
            <a href="#" className="navbar__link">
              Resource
            </a>
            <a href="#" className="navbar__link">
              Contact
            </a>
          </nav>

          {/* Desktop theme toggle */}
          <div className="navbar__right">
            <button
              className={`theme-toggle${isDark ? ' theme-toggle--dark' : ''}`}
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              <span className="theme-toggle__indicator" aria-hidden="true" />
              <img
                src={isDark ? '/Moon_fill.svg' : '/Moon_fill_light.svg'}
                alt=""
                aria-hidden="true"
                className="theme-toggle__icon theme-toggle__icon--moon"
                width={14}
                height={14}
              />
              <img
                src="/Sun_fill.svg"
                alt=""
                aria-hidden="true"
                className="theme-toggle__icon theme-toggle__icon--sun"
                width={14}
                height={14}
              />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar__hamburger"
            onClick={openDrawer}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-drawer"
          >
            <img src="/hamburger-button.svg" alt="" aria-hidden="true" width={24} height={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        isDark={isDark}
        onClose={closeDrawer}
        onToggleTheme={onToggleTheme}
      />
    </>
  );
}
