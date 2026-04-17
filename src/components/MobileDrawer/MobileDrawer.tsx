import { useEffect, useCallback } from 'react';
import './MobileDrawer.css';

interface MobileDrawerProps {
  isOpen: boolean;
  isDark: boolean;
  onClose: () => void;
  onToggleTheme: () => void;
}

export default function MobileDrawer({
  isOpen,
  isDark,
  onClose,
  onToggleTheme,
}: MobileDrawerProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav
      className={`drawer${isOpen ? ' drawer--open' : ''}`}
      aria-label="Mobile navigation"
      aria-hidden={!isOpen}
    >
      <button
        className="drawer__close"
        onClick={onClose}
        aria-label="Close navigation menu"
      >
        <img src="/close-button.svg" alt="" aria-hidden="true" width={20} height={20} />
      </button>

      <ul className="drawer__links" role="list">
        <li>
          <a href="#" className="drawer__link drawer__link--active" aria-current="page">
            About us
          </a>
        </li>
        <li><a href="#" className="drawer__link">Product</a></li>
        <li><a href="#" className="drawer__link">Resource</a></li>
        <li><a href="#" className="drawer__link">Contact</a></li>
        <li className="drawer__toggle-item">
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
        </li>
      </ul>
    </nav>
  );
}
