// src/App.jsx
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import Navbar from './components/Navbar';
import DockMenu from './components/DockMenu';

export default function App() {
  const element = useRoutes(routes);
  return (
    <div className="min-h-screen flex flex-col pb-16 pt-16">
      <Navbar />
      <main className="flex-grow p-4">{element}</main>
      <DockMenu />
    </div>
  );
}