import './App.css';
import Home from './pages/Home';
import { useEffect } from 'react';
function App() {
  useEffect(() => {
    // NOTE: This should be set based on some kind of toggle or theme selector.
    // I've added this here for demonstration purposes
    localStorage.setItem('theme', 'light');

    // If the user has selected a theme, use that
    const selectedTheme = localStorage.getItem('theme');

    if (selectedTheme) {
      document.body.classList.add(selectedTheme);

      // Else if the users OS preferences prefers dark mode
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');

      // Else use light mode
    } else {
      document.body.classList.add('light');
    }
  }, []);
  
  return (
    <>
      <Home />
    </>
  );
}

export default App;
