// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { FaGuitar, FaMusic, FaSlidersH, FaInfoCircle, FaPlay } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="p-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold leading-tight text-primary">
          Belajar Gitar Jadi Mudah
        </h1>
        <p className="max-w-2xl mx-auto text-base-content text-lg">
          Pelajari chord, lagu, dan tuning gitar langsung dari browser kamu. Cocok untuk semua level.
        </p>
        <Link to="/articles" className="btn btn-primary gap-2 mt-2">
          <FaPlay /> Mulai Belajar
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <Link to="/chords" className="card bg-base-200 shadow-sm hover:shadow-md transition">
          <div className="card-body items-center text-center">
            <FaGuitar className="text-4xl text-primary" />
            <h2 className="card-title">Chord Gitar</h2>
            <p className="text-sm">Belajar bentuk dan variasi chord dari dasar sampai lanjutan.</p>
          </div>
        </Link>

        <Link to="/songs" className="card bg-base-200 shadow-sm hover:shadow-md transition">
          <div className="card-body items-center text-center">
            <FaMusic className="text-4xl text-primary" />
            <h2 className="card-title">Kumpulan Lagu</h2>
            <p className="text-sm">Mainkan lagu-lagu populer lengkap dengan chord-nya.</p>
          </div>
        </Link>

        <Link to="/tuner" className="card bg-base-200 shadow-sm hover:shadow-md transition">
          <div className="card-body items-center text-center">
            <FaSlidersH className="text-4xl text-primary" />
            <h2 className="card-title">Tuner Gitar</h2>
            <p className="text-sm">Setem gitar secara real-time dengan tuner presisi tinggi.</p>
          </div>
        </Link>

        <Link to="/about" className="card bg-base-200 shadow-sm hover:shadow-md transition">
          <div className="card-body items-center text-center">
            <FaInfoCircle className="text-4xl text-primary" />
            <h2 className="card-title">Tentang</h2>
            <p className="text-sm">Cari tahu lebih lanjut tentang fitur & pengembang situs ini.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}