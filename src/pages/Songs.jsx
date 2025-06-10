// src/pages/Songs.jsx
import React, { useEffect, useState } from 'react';
import SongCard from '../components/SongCard';
import { FaSearch, FaMusic } from 'react-icons/fa';
import ChordFetcher from '../utils/ChordFetcher';

const fetcher = new ChordFetcher();

export default function Songs() {
  const [search, setSearch] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher.getSongList(search);
      const mapped = Object.entries(result).map(([title, value]) => ({
        id: value.id,
        title,
        artist: value.artist
      }));
      setSongs(mapped);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search.length >= 3) handleSearch();
    else setSongs([]);
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2">
          <FaMusic /> Koleksi Lagu Gitar
        </h2>
        <p className="text-base-content">Cari lagu & tampilkan chord secara otomatis dari API.</p>
      </div>

      <div className="form-control">
        <label className="input input-bordered flex items-center gap-2">
          <FaSearch className="text-base-content" />
          <input
            type="text"
            className="grow"
            placeholder="Ketik judul lagu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
      </div>

      {loading && <div className="text-center text-sm text-base-content">Memuat lagu...</div>}
      {error && <div className="text-center text-red-500 text-sm">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {songs.length > 0 ? (
          songs.map((song, i) => <SongCard key={i} song={song} fetcher={fetcher} />)
        ) : !loading && (
          <div className="col-span-full text-center text-neutral">Tidak ada lagu ditemukan.</div>
        )}
      </div>
    </div>
  );
}
