// src/pages/Tuner.jsx
import React, { useRef, useState } from 'react';
import { GiGuitarHead } from 'react-icons/gi';

const TUNINGS = {
  Standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  DropD: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
  DoubleDropD: ['D2', 'A2', 'D3', 'G3', 'B3', 'D4'],
  HalfDown: ['Eb2', 'Ab2', 'Db3', 'Gb3', 'Bb3', 'Eb4'],
  FullDown: ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
  DropC: ['C2', 'G2', 'C3', 'F3', 'A3', 'D4'],
  DropB: ['B1', 'F#2', 'B2', 'E3', 'G#3', 'C#4'],
  OpenG: ['D2', 'G2', 'D3', 'G3', 'B3', 'D4'],
  OpenD: ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4'],
  OpenC: ['C2', 'G2', 'C3', 'G3', 'C4', 'E4'],
  DADGAD: ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
  Nashville: ['E3', 'A3', 'D4', 'G4', 'B3', 'E4'],
};

const NOTE_TO_FREQ = {
  C2: 65.41, C3: 130.81, C4: 261.63, 'C#4': 277.18,
  D2: 73.42, D3: 146.83, D4: 293.66,
  Eb2: 77.78, Eb4: 311.13,
  E2: 82.41, E3: 164.81, E4: 329.63,
  F2: 87.31, F3: 174.61, F4: 349.23,
  'F#2': 92.50, 'F#3': 185.00,
  G2: 98.00, G3: 196.00, G4: 392.00,
  'G#3': 207.65,
  A2: 110.00, A3: 220.00, A4: 440.00,
  Ab2: 103.83,
  B1: 61.74, B2: 123.47, B3: 246.94,
  Bb2: 116.54, Bb3: 233.08,
  Db3: 138.59,
  Gb3: 185.00,
};

export default function Tuner() {
  const [note, setNote] = useState('');
  const [freq, setFreq] = useState(0);
  const [cents, setCents] = useState(0);
  const [active, setActive] = useState(false);
  const [tuning, setTuning] = useState('Standard');
  const [target, setTarget] = useState(null);
  const [mode, setMode] = useState('auto');
  const [refA4, setRefA4] = useState(440);
  const analyserRef = useRef(null);
  const contextRef = useRef(null);
  const rafRef = useRef(null);

  const startTuning = async () => {
    if (active) return;
    setActive(true);
    contextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = contextRef.current.createMediaStreamSource(stream);
    analyserRef.current = contextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    const buffer = new Float32Array(analyserRef.current.fftSize);
    source.connect(analyserRef.current);
    detectPitch(buffer);
  };

  const stopTuning = () => {
    setActive(false);
    setNote('');
    setFreq(0);
    setCents(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (contextRef.current) contextRef.current.close();
  };

  const detectPitch = (buffer) => {
    analyserRef.current.getFloatTimeDomainData(buffer);
    const pitch = autoCorrelate(buffer, contextRef.current.sampleRate);
    if (pitch !== -1) {
      const noteInfo = frequencyToNote(pitch);
      setNote(noteInfo.note);
      setFreq(Math.round(pitch));
      if (mode === 'manual' && target) {
        const centsOff = 1200 * Math.log2(pitch / NOTE_TO_FREQ[target]);
        setCents(Math.round(centsOff));
      } else {
        setCents(noteInfo.cents);
      }
    } else {
      setNote('');
      setFreq(0);
      setCents(0);
    }
    rafRef.current = requestAnimationFrame(() => detectPitch(buffer));
  };

  function autoCorrelate(buf, sampleRate) {
    let SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;
    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }
    buf = buf.slice(r1, r2);
    SIZE = buf.length;
    let c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buf[j] * buf[j + i];
      }
    }
    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
    }
    let T0 = maxpos;
    return sampleRate / T0;
  }

  function frequencyToNote(freq) {
    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteNumber = 12 * (Math.log(freq / refA4) / Math.log(2));
    const rounded = Math.round(noteNumber);
    const index = rounded + 69;
    const note = noteStrings[index % 12];
    const octave = Math.floor(index / 12) - 1;
    const standardFreq = refA4 * Math.pow(2, (rounded) / 12);
    const cents = Math.floor(1200 * Math.log2(freq / standardFreq));
    return { note: `${note}${octave}`, cents };
  }

  const getBarColor = () => {
    if (!note) return 'bg-base-300';
    if (Math.abs(cents) < 5) return 'bg-green-500';
    if (Math.abs(cents) < 15) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="p-6 text-center space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2"><GiGuitarHead /> Tuner</h2>
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={() => setMode('auto')} className={`btn btn-sm ${mode === 'auto' ? 'btn-primary' : 'btn-outline'}`}>Auto</button>
        <button onClick={() => setMode('manual')} className={`btn btn-sm ${mode === 'manual' ? 'btn-primary' : 'btn-outline'}`}>Manual</button>
      </div>
      {mode === 'manual' && (
        <>
          <div className="form-control max-w-xs mx-auto">
            <label className="label"><span className="label-text">Pilih Tuning</span></label>
            <select className="select select-bordered" value={tuning} onChange={(e) => { setTuning(e.target.value); setTarget(null); }}>
              {Object.keys(TUNINGS).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center gap-1 flex-wrap">
            {TUNINGS[tuning].map((noteStr, i) => (
              <button
                key={i}
                className={`btn btn-xs ${target === noteStr ? 'btn-secondary' : 'btn-ghost'}`}
                onClick={() => setTarget(noteStr)}
              >{noteStr}</button>
            ))}
          </div>
        </>
      )}
      <div className="form-control w-48 mx-auto">
        <label className="label"><span className="label-text">Frekuensi A4 (Hz)</span></label>
        <input
          type="number"
          value={refA4}
          min={400}
          max={480}
          step={0.1}
          className="input input-bordered text-center"
          onChange={(e) => setRefA4(Number(e.target.value))}
        />
      </div>
      <div className="text-7xl font-extrabold tracking-wide text-primary">{note || '---'}</div>
      <div className="text-lg text-neutral">{freq > 0 ? `${freq} Hz` : '---'} | {cents} cent</div>
      <div className="relative h-4 w-full max-w-xl mx-auto bg-base-200 rounded">
        <div className="absolute inset-x-1/2 top-0 h-full border-l-2 border-neutral"></div>
        <div
          className={`absolute top-0 h-4 rounded ${getBarColor()} transition-all duration-150`}
          style={{ width: '4px', transform: `translateX(calc(${cents}px - 2px))`, left: '50%' }}
        ></div>
      </div>
      <div className="space-x-2">
        <button className="btn btn-primary" onClick={startTuning}>Mulai</button>
        <button className="btn btn-outline" onClick={stopTuning}>Stop</button>
      </div>
    </div>
  );
}
