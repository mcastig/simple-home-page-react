import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';

export default function App() {
  const [isDark, setIsDark] = useState(false);

  // Sync data-theme attribute on document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return (
    <>
      <Navbar isDark={isDark} onToggleTheme={toggleTheme} />
      <Hero isDark={isDark} />
    </>
  );
}
