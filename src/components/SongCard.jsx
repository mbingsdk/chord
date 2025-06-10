import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import ChordFetcher from '../utils/ChordFetcher';

const fetcher = new ChordFetcher();

export default function SongCard({ song }) {
  const [expanded, setExpanded] = useState(false);
  const [chord, setChord] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChord = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher.getChordDetail(song.id);
      console.log(result);
      setChord(result.chord);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(expanded) {
      handleChord();
    }
  }, [expanded]);

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition">
      <div className="card-body space-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="card-title text-lg font-semibold">{song.title}</h3>
            <p className="text-sm text-base-content/70">{song.artist}</p>
          </div>
          <button className="btn btn-xs btn-outline btn-circle text-pink-500 hover:text-pink-700">
            <FaHeart />
          </button>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="btn btn-xs btn-outline"
        >
          {expanded ? 'Hide Chord' : 'Show Chord'}
        </button>

        {expanded && (
          <div className="mt-2 text-xs font-mono bg-base-200 p-2 rounded whitespace-pre-wrap">
            {chord}
          </div>
        )}
      </div>
    </div>
  );
}
