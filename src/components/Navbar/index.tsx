import React from 'react';
import ThemeSwitcher from '../ThemeSwitcher/index';

const Navbar: React.FC = () => {
  return (
    <header className="flex flex-wrap justify-between items-center p-4  text-gray-600 text-lg dark:text-gray-200 container">
      <nav className="flex items-center space-x-4">
        <a href="/" className=" font-bold">
          Home
        </a>
        <a
          href="https://www.linkedin.com/in/cperdiansyah/"
          target="_blank"
          className=""
          rel="noopener noreferrer"
        >
          About Me
        </a>
      </nav>
      <div className="relative">
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default Navbar;
