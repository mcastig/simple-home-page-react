import { beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });

  it('sets data-theme to light by default', () => {
    render(<App />);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('switches to dark mode when toggle is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: /switch to dark mode/i })[0]);
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });

  it('switches back to light mode on second toggle click', () => {
    render(<App />);
    const toggle = screen.getAllByRole('button', { name: /switch to dark mode/i })[0];
    fireEvent.click(toggle);
    fireEvent.click(screen.getAllByRole('button', { name: /switch to light mode/i })[0]);
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('renders the Navbar', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders the Hero section', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
});
