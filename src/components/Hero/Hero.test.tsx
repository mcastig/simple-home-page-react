import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  describe('Badge', () => {
    it('renders the badge text', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByText(/simple way to communicate/i)).toBeInTheDocument();
    });

    it('badge text is uppercase', () => {
      render(<Hero isDark={false} />);
      const badge = screen.getByText(/simple way to communicate/i);
      expect(badge).toHaveClass('hero__badge-text');
    });
  });

  describe('Heading', () => {
    it('renders the h1 element', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('h1 contains "Actions for"', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/actions for/i);
    });

    it('h1 contains "Accessibility"', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/accessibility/i);
    });

    it('h1 contains "in Design"', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/in design/i);
    });
  });

  describe('Body text', () => {
    it('renders the description paragraph', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByText(/fastest way to build and deploy/i)).toBeInTheDocument();
    });
  });

  describe('CTA buttons', () => {
    it('renders the Get Started link', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('link', { name: /get started/i })).toBeInTheDocument();
    });

    it('Get Started link has primary button class', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('link', { name: /get started/i })).toHaveClass('hero__btn-primary');
    });

    it('renders the Get live demo link', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('link', { name: /get live demo/i })).toBeInTheDocument();
    });

    it('Get live demo link has demo class', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('link', { name: /get live demo/i })).toHaveClass('hero__btn-demo');
    });
  });

  describe('Trust badges', () => {
    it('renders "No credit card required"', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByText(/no credit card required/i)).toBeInTheDocument();
    });

    it('renders "No software to install"', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByText(/no software to install/i)).toBeInTheDocument();
    });

    it('trust list has two items', () => {
      render(<Hero isDark={false} />);
      const list = screen.getByRole('list', { name: /no commitments needed/i });
      expect(list.querySelectorAll('li')).toHaveLength(2);
    });
  });

  describe('Hero image', () => {
    it('renders the hero image', () => {
      render(<Hero isDark={false} />);
      const img = screen.getByAltText(/alarado dashboard illustration/i);
      expect(img).toBeInTheDocument();
    });

    it('hero image has correct src', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByAltText(/alarado dashboard illustration/i)).toHaveAttribute(
        'src',
        '/hero-image-simple-homepage.png'
      );
    });

    it('hero image has 2x srcset', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByAltText(/alarado dashboard illustration/i)).toHaveAttribute(
        'srcset',
        '/hero-image-simple-homepage@2x.png 2x'
      );
    });
  });

  describe('Accessibility', () => {
    it('renders inside a main landmark', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('trust list has an accessible label', () => {
      render(<Hero isDark={false} />);
      expect(screen.getByRole('list', { name: /no commitments needed/i })).toBeInTheDocument();
    });
  });
});
