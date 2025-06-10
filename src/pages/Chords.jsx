// src/pages/Chords.jsx
import React, { useEffect, useState } from 'react';
import ChordCard from '../components/ChordCard';
import chords from '../data/chords.json';
import { FaGuitar, FaSearch } from 'react-icons/fa';

const allKeys = [...new Set(chords.map(c => c.key))].sort();
const allTypes = [...new Set(chords.map(c => c.type))].sort();

export default function Chords() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [keyFilter, setKeyFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    setList(chords);
  }, []);

  const filtered = list.filter(chord => {
    return (
      chord.name.toLowerCase().includes(search.toLowerCase()) &&
      (!keyFilter || chord.key === keyFilter) &&
      (!typeFilter || chord.type === typeFilter)
    );
  });

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2">
          <FaGuitar />Daftar Chord Gitar
        </h2>
        <p className="text-base-content">Cari dan filter chord berdasarkan nama, key, atau tipe.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <label className="input input-bordered flex items-center gap-2 col-span-2">
          <FaSearch className="text-base-content" />
          <input
            type="text"
            className="grow"
            placeholder="Cari chord..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <select className="select select-bordered" value={keyFilter} onChange={e => setKeyFilter(e.target.value)}>
          <option value="">Semua Key</option>
          {allKeys.map(key => <option key={key}>{key}</option>)}
        </select>

        <select className="select select-bordered" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="">Semua Tipe</option>
          {allTypes.map(type => <option key={type}>{type}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.length > 0 ? (
          filtered.map((chord, index) => (
            <ChordCard key={index} chord={chord} />
          ))
        ) : (
          <div className="col-span-full text-center text-neutral">Chord tidak ditemukan.</div>
        )}
      </div>
    </div>
  );
}