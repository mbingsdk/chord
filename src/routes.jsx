// src/routes.jsx
import Home from './pages/Home';
import Chords from './pages/Chords';
import Songs from './pages/Songs';
import Tuner from './pages/Tuner';
import Articles from './pages/Articles';
import InteractiveArticle from './pages/InteractiveArticle';
import About from './pages/About';

export const routes = [
  { path: '/', element: <Home /> },
  { path: '/chords', element: <Chords /> },
  { path: '/songs', element: <Songs /> },
  { path: '/articles', element: <Articles /> },
  { path: '/articles/:id', element: <InteractiveArticle /> },
  { path: '/tuner', element: <Tuner /> },
  { path: '/about', element: <About /> },
];