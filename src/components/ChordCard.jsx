// src/components/ChordCard.jsx
import React from 'react';

export default function ChordCard({ chord }) {
  const { name, frets = [], fingers = [] } = chord;
  const stringLabels = ['e', 'B', 'G', 'D', 'A', 'E'];

  const getBaseFret = () => {
    const min = Math.min(...frets.filter(f => f > 0));
    return isFinite(min) ? min : 1;
  };

  const baseFret = getBaseFret();

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body items-center">
        <h3 className="text-xl font-semibold text-center mb-2">{name}</h3>

        {/* Chord diagram grid */}
        <div className="relative w-24 h-36 flex flex-col justify-start items-center">
          {/* Fret number label if not open */}
          {baseFret > 1 && (
            <div className="absolute -left-5 top-7 text-xs text-base-content/60">{baseFret}fr</div>
          )}

          <div className="absolute inset-0 grid grid-rows-5 grid-cols-6 border border-base-content/20">
            {[...Array(6)].map((_, col) => (
              <div key={`v-${col}`} className="border-l border-base-content/10" />
            ))}
            {[...Array(5)].map((_, row) => (
              <div
                key={`h-${row}`}
                className={`border-t ${baseFret === 1 && row === 0 ? 'border-base-content' : 'border-base-content/10'} row-span-1 col-span-full`}
              />
            ))}
          </div>

          {/* Fret dots */}
          {frets.map((fret, i) => (
            fret > 0 && (
              <div
                key={`dot-${i}`}
                className={`absolute size-4 rounded-full text-white text-[9px] flex items-center justify-center ${fret === baseFret ? 'bg-accent' : 'bg-primary'}`}
                style={{
                  top: `${(fret - baseFret) * 29 + 35}px`,
                  left: `${i * 16 + 0}px`
                }}
              >
                {fingers[i] > 0 ? fingers[i] : ''}
              </div>
            )
          ))}

          {/* X / O indicators */}
          <div className="absolute -top-5 left-0 right-0 flex justify-between px-[2px]">
            {frets.map((fret, i) => (
              <span key={`xo-${i}`} className="text-xs w-4 text-center">
                {fret === 0 ? 'O' : fret === -1 ? 'X' : ''}
              </span>
            ))}
          </div>

          {/* String labels */}
          <div className="absolute -bottom-5 left-0 right-0 flex justify-between px-[2px]">
            {stringLabels.map((s, i) => (
              <span key={`label-${i}`} className="text-[10px] text-base-content/50 w-4 text-center">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}