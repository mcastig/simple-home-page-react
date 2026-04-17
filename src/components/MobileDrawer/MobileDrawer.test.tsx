import { vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileDrawer from './MobileDrawer';

const defaultProps = {
  isOpen: false,
  isDark: false,
  onClose: vi.fn(),
  onToggleTheme: vi.fn(),
};

const getDrawer = () => document.querySelector('.drawer') as HTMLElement;

describe('MobileDrawer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = '';
  });

  describe('Open / closed state', () => {
    it('does not have drawer--open class when closed', () => {
      render(<MobileDrawer {...defaultProps} isOpen={false} />);
      expect(getDrawer()).not.toHaveClass('drawer--open');
    });

    it('has drawer--open class when open', () => {
      render(<MobileDrawer {...defaultProps} isOpen={true} />);
      expect(getDrawer()).toHaveClass('drawer--open');
    });

    it('is hidden from assistive technology when closed', () => {
      render(<MobileDrawer {...defaultProps} isOpen={false} />);
      expect(getDrawer()).toHaveAttribute('aria-hidden', 'true');
    });

    it('is visible to assistive technology when open', () => {
      render(<MobileDrawer {...defaultProps} isOpen={true} />);
      expect(getDrawer()).toHaveAttribute('aria-hidden', 'false');
    });
  });

  describe('Close behaviour', () => {
    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn();
      render(<MobileDrawer {...defaultProps} isOpen={true} onClose={onClose} />);
      fireEvent.click(screen.getByRole('button', { name: /close navigation menu/i }));
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('calls onClose when Escape key is pressed and drawer is open', () => {
      const onClose = vi.fn();
      render(<MobileDrawer {...defaultProps} isOpen={true} onClose={onClose} />);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledOnce();
    });

    it('does not call onClose on Escape when drawer is closed', () => {
      const onClose = vi.fn();
      render(<MobileDrawer {...defaultProps} isOpen={false} onClose={onClose} />);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose on other keys', () => {
      const onClose = vi.fn();
      render(<MobileDrawer {...defaultProps} isOpen={true} onClose={onClose} />);
      fireEvent.keyDown(document, { key: 'Enter' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Body scroll lock', () => {
    it('locks body scroll when open', () => {
      render(<MobileDrawer {...defaultProps} isOpen={true} />);
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll when closed', () => {
      const { rerender } = render(<MobileDrawer {...defaultProps} isOpen={true} />);
      rerender(<MobileDrawer {...defaultProps} isOpen={false} />);
      expect(document.body.style.overflow).toBe('');
    });

    it('restores body scroll on unmount', () => {
      const { unmount } = render(<MobileDrawer {...defaultProps} isOpen={true} />);
      unmount();
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('Navigation links', () => {
    it('renders all four links', () => {
      render(<MobileDrawer {...defaultProps} />);
      const drawer = getDrawer();
      expect(drawer).toHaveTextContent('About us');
      expect(drawer).toHaveTextContent('Product');
      expect(drawer).toHaveTextContent('Resource');
      expect(drawer).toHaveTextContent('Contact');
    });

    it('"About us" has the active class', () => {
      render(<MobileDrawer {...defaultProps} />);
      expect(getDrawer().querySelector('.drawer__link--active')).toHaveTextContent('About us');
    });

    it('"About us" has aria-current="page"', () => {
      render(<MobileDrawer {...defaultProps} />);
      expect(getDrawer().querySelector('[aria-current="page"]')).toHaveTextContent('About us');
    });

    it('only one link has the active class', () => {
      render(<MobileDrawer {...defaultProps} />);
      expect(getDrawer().querySelectorAll('.drawer__link--active')).toHaveLength(1);
    });
  });

  describe('Theme toggle', () => {
    it('calls onToggleTheme when toggle is clicked', () => {
      const onToggleTheme = vi.fn();
      render(<MobileDrawer {...defaultProps} isOpen={true} onToggleTheme={onToggleTheme} />);
      fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }));
      expect(onToggleTheme).toHaveBeenCalledOnce();
    });

    it('toggle has dark class when isDark is true', () => {
      render(<MobileDrawer {...defaultProps} isOpen={true} isDark={true} />);
      expect(screen.getByRole('button', { name: /switch to light mode/i })).toHaveClass('theme-toggle--dark');
    });

    it('toggle does not have dark class when isDark is false', () => {
      render(<MobileDrawer {...defaultProps} isOpen={true} isDark={false} />);
      expect(screen.getByRole('button', { name: /switch to dark mode/i })).not.toHaveClass('theme-toggle--dark');
    });
  });
});
