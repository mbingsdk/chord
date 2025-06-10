// src/components/DockMenu.jsx
import React from 'react';
import { FaHome, FaGuitar, FaMusic, FaInfo } from "react-icons/fa";
import { GiGuitarHead } from "react-icons/gi";
import { useLocation, useNavigate } from 'react-router-dom';

export default function DockMenu() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      label: 'Home',
      icon: (
        <FaHome className="size-[1.2em] text-primary" />
      ),
      path: '/',
    },
    {
      label: 'Chords',
      icon: (
        <FaGuitar className="size-[1.2em] text-primary" />
      ),
      path: '/chords',
    },
    {
      label: 'Songs',
      icon: (
        <FaMusic className="size-[1.2em] text-primary" />
      ),
      path: '/songs',
    },
    {
      label: 'Tuner',
      icon: (
        <GiGuitarHead className="size-[1.2em] text-primary" />
      ),
      path: '/tuner',
    },
    {
      label: 'About',
      icon: (
        <FaInfo className="size-[1.2em] text-primary" />
      ),
      path: '/about',
    },
  ];

  return (
    <div className="dock">
      {items.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={pathname === item.path ? 'dock-active' : ''}
        >
          {item.icon}
          <span className="dock-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}