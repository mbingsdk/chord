// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const themes = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset', 'caramellatte', 'abyss', 'silk'
]

export default function Navbar() {
  const [theme, setTheme] = useState('light')
  const [scrolled, setScrolled] = useState(false);

  const changeTheme = t => {
    document.documentElement.setAttribute('data-theme', t)
    setTheme(t)
  }

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const localTheme = themes.includes(saved) ? saved : 'light'
    changeTheme(localTheme)
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <div className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-base-100/50 backdrop-blur-sm shadow-sm' : 'bg-base-100'}`}>
      {/* <div className="flex-none lg:hidden">
        <label htmlFor="main-drawer" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </label>
      </div> */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          West-Sect
        </Link>
      </div>
      <div className='navbar-end flex items-center gap-3'>
        <div className='dropdown dropdown-left'>
          <label tabIndex={0} className='btn btn-circle btn-sm border border-base-300'>
            <div
              data-theme={theme}
              className='bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm'
            >
              <div className='bg-base-content size-1 rounded-full'></div>
              <div className='bg-primary size-1 rounded-full'></div>
              <div className='bg-secondary size-1 rounded-full'></div>
              <div className='bg-accent size-1 rounded-full'></div>
            </div>
          </label>
          <div
            tabIndex={0}
            className='dropdown-content p-2 shadow bg-base-100 rounded-box w-64 max-h-[60vh] overflow-y-auto overflow-x-hidden'
          >
            <div className='grid grid-cols-1 gap-1'>
              {themes.map(t => (
                <button
                  key={t}
                  data-set-theme={t}
                  data-act-class='[&_svg]:visible'
                  className='gap-3 px-2 py-1 flex items-center justify-between rounded hover:bg-base-200 transition-all'
                  onClick={() => changeTheme(t)}
                >
                  <div className='flex items-center gap-2'>
                    <div
                      data-theme={t}
                      className='bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm'
                    >
                      <div className='bg-base-content size-1 rounded-full'></div>
                      <div className='bg-primary size-1 rounded-full'></div>
                      <div className='bg-secondary size-1 rounded-full'></div>
                      <div className='bg-accent size-1 rounded-full'></div>
                    </div>
                    <span className='text-sm capitalize'>{t}</span>
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`${
                      theme === t ? 'visible' : 'invisible'
                    } h-3 w-3 shrink-0`}
                  >
                    <path d='M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z'></path>
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}