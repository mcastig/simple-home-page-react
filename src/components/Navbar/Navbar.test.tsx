import { vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import Navbar from './Navbar';

const defaultProps = {
  isDark: false,
  onToggleTheme: vi.fn(),
};

const getMainNav = () => screen.getByRole('navigation', { name: /main navigation/i });

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Logo', () => {
    it('renders light logo in light mode', () => {
      render(<Navbar {...defaultProps} />);
      expect(screen.getByAltText('Alarado')).toHaveAttribute('src', '/logo-light.svg');
    });

    it('renders dark logo in dark mode', () => {
      render(<Navbar {...defaultProps} isDark={true} />);
      expect(screen.getByAltText('Alarado')).toHaveAttribute('src', '/logo-dark.svg');
    });

    it('logo links to home', () => {
      render(<Navbar {...defaultProps} />);
      expect(screen.getByRole('link', { name: /alarado home/i })).toHaveAttribute('href', '/');
    });
  });

  describe('Navigation links', () => {
    it('renders all four nav links', () => {
      render(<Navbar {...defaultProps} />);
      const nav = getMainNav();
      expect(within(nav).getByText('About us')).toBeInTheDocument();
      expect(within(nav).getByText('Product')).toBeInTheDocument();
      expect(within(nav).getByText('Resource')).toBeInTheDocument();
      expect(within(nav).getByText('Contact')).toBeInTheDocument();
    });

    it('"About us" has the active class', () => {
      render(<Navbar {...defaultProps} />);
      expect(within(getMainNav()).getByText('About us')).toHaveClass('navbar__link--active');
    });

    it('"About us" has aria-current="page"', () => {
      render(<Navbar {...defaultProps} />);
      expect(within(getMainNav()).getByText('About us')).toHaveAttribute('aria-current', 'page');
    });

    it('other links do not have active class', () => {
      render(<Navbar {...defaultProps} />);
      const nav = getMainNav();
      expect(within(nav).getByText('Product')).not.toHaveClass('navbar__link--active');
      expect(within(nav).getByText('Resource')).not.toHaveClass('navbar__link--active');
      expect(within(nav).getByText('Contact')).not.toHaveClass('navbar__link--active');
    });
  });

  describe('Theme toggle', () => {
    it('renders the toggle button', () => {
      render(<Navbar {...defaultProps} />);
      expect(screen.getByRole('button', { name: /switch to dark mode/i })).toBeInTheDocument();
    });

    it('calls onToggleTheme when clicked', () => {
      const onToggleTheme = vi.fn();
      render(<Navbar {...defaultProps} onToggleTheme={onToggleTheme} />);
      fireEvent.click(screen.getByRole('button', { name: /switch to dark mode/i }));
      expect(onToggleTheme).toHaveBeenCalledOnce();
    });

    it('has dark class when isDark is true', () => {
      render(<Navbar {...defaultProps} isDark={true} />);
      expect(screen.getByRole('button', { name: /switch to light mode/i })).toHaveClass('theme-toggle--dark');
    });

    it('does not have dark class when isDark is false', () => {
      render(<Navbar {...defaultProps} isDark={false} />);
      expect(screen.getByRole('button', { name: /switch to dark mode/i })).not.toHaveClass('theme-toggle--dark');
    });

    it('aria-pressed reflects isDark state', () => {
      const { rerender } = render(<Navbar {...defaultProps} isDark={false} />);
      expect(screen.getByRole('button', { name: /switch to dark mode/i })).toHaveAttribute('aria-pressed', 'false');

      rerender(<Navbar {...defaultProps} isDark={true} />);
      expect(screen.getByRole('button', { name: /switch to light mode/i })).toHaveAttribute('aria-pressed', 'true');
    });
  });

  describe('Mobile hamburger', () => {
    it('renders the hamburger button', () => {
      render(<Navbar {...defaultProps} />);
      expect(screen.getByRole('button', { name: /open navigation menu/i })).toBeInTheDocument();
    });

    it('opens the mobile drawer when hamburger is clicked', () => {
      render(<Navbar {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));
      expect(document.querySelector('.drawer')).toHaveClass('drawer--open');
    });

    it('hamburger aria-expanded is false by default', () => {
      render(<Navbar {...defaultProps} />);
      expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute('aria-expanded', 'false');
    });

    it('hamburger aria-expanded becomes true when drawer opens', () => {
      render(<Navbar {...defaultProps} />);
      fireEvent.click(screen.getByRole('button', { name: /open navigation menu/i }));
      expect(screen.getByRole('button', { name: /open navigation menu/i })).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
