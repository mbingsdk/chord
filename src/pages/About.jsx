// src/pages/About.jsx
import { Link } from 'react-router-dom';
import { FaInfoCircle, FaGuitar, FaMusic, FaSlidersH, FaInfo, FaCode } from 'react-icons/fa';

export default function About() {
  return (
    <div className="p-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2">
          <FaInfo /> Tentang Kegabutan
        </h2>
        <p className="max-w-2xl mx-auto text-base-content text-lg">
          Temukan lebih banyak kegabutan disini
        </p>
      </div>

      {/* Fitur Platform */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-sm">
          <div className="card-body items-center text-center">
            <FaInfoCircle className="text-4xl text-primary mb-2" />
            <h2 className="card-title text-2xl">Visi & Misi</h2>
            <p className="py-2">
              Membuat pembelajaran gitar menjadi mudah diakses, menyenangkan, dan efektif untuk semua kalangan
            </p>
          </div>
        </div>

        <div className="card bg-base-200 shadow-sm">
          <div className="card-body items-center text-center">
            <FaCode className="text-4xl text-primary mb-2" />
            <h2 className="card-title text-2xl">Teknologi</h2>
            <p className="py-2">
              Dibangun dengan React, Vite, Tailwind CSS, DaisyUI, menggunakan teknologi audio modern untuk tuner presisi
            </p>
          </div>
        </div>
      </div>

      {/* Fitur Utama */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-primary">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center">
              <FaGuitar className="text-3xl text-primary" />
              <h3 className="card-title mt-2">Database Chord Hampir Lengkap</h3>
              <p className="text-sm">Belajar chord dasar hingga variasi advanced</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center">
              <FaMusic className="text-3xl text-primary" />
              <h3 className="card-title mt-2">Lagu Populer</h3>
              <p className="text-sm">Koleksi lagu terkini dengan panduan chord interaktif</p>
            </div>
          </div>

          <div className="card bg-base-200 shadow-sm">
            <div className="card-body items-center text-center">
              <FaSlidersH className="text-3xl text-primary" />
              <h3 className="card-title mt-2">Tuner Cerdas</h3>
              <p className="text-sm">Alat tuning akurat dengan deteksi nada real-time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tim Pengembang */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-primary">Develemper</h2>
        <div className="card bg-base-200 shadow-sm max-w-md mx-auto">
          <div className="card-body items-center">
            <div className="avatar placeholder">
              <div className="bg-primary text-neutral-content p-3 rounded-full w-16">
                <span className="text-xl">DEV</span>
              </div>
            </div>
            <h3 className="card-title mt-2">Mbing SDK</h3>
            <p>Full-stack Develemper dengan passion di bidang random</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      {/* <div className="text-center">
        <Link to="/" className="btn btn-primary gap-2">
          Kembali ke Beranda
        </Link>
      </div> */}
    </div>
  );
}