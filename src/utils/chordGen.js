export const calculateChord = (params) => {
  // 1. Dekomposisi parameter input
  const { 
    tonality,       // Nada dasar (D)
    type,           // Jenis chord (7M)
    extension,    // Inversi {bass: "C"}
  } = params.naming;

  const { alterations } = params;

  const inversions = params.inversions;

  // 2. Mapping interval chord
  const intervalMap = {
    '': [0, 4, 7],                 // Mayor
    'm': [0, 3, 7],                // Minor
    '7': [0, 4, 7, 10],            // Dominant 7th
    '7M': [0, 4, 7, 11],           // Major 7th
    'm7': [0, 3, 7, 10],           // Minor 7th
    '9': [0, 4, 7, 10, 14],        // Dominant 9th
    'm9': [0, 3, 7, 10, 14],       // Minor 9th
    '7M9': [0, 4, 7, 11, 14]       // Major 9th
  };

  // 3. Proses alterasi
  const processAlterations = (intervals, alt) => {
    const altMap = {
      '/5+': intervals.map(i => i === 7 ? i + 1 : i),  // Augmented 5th
      '/5-': intervals.map(i => i === 7 ? i - 1 : i),  // Diminished 5th
      '/9+': intervals.map(i => i === 14 ? i + 1 : i), // Sharp 9th
      '/9-': intervals.map(i => i === 14 ? i - 1 : i)  // Flat 9th
    };
    return altMap[alt] || intervals;
  };

  // 4. Tambahkan ekstensi
  const addExtension = (intervals, ext) => {
    const extMap = {
      '9': 14,
      '11': 17,
      '13': 21
    };
    return ext ? [...intervals, extMap[ext]] : intervals;
  };

  // 5. Hitungan interval final
  let baseIntervals = intervalMap[type];
  baseIntervals = processAlterations(baseIntervals, alterations);
  baseIntervals = addExtension(baseIntervals, extension);

  // 6. Konversi ke notasi MIDI
  const rootMidi = 60 + (tonality.charCodeAt(0) - 67); // C4 = 60
  const chordNotes = baseIntervals.map(i => rootMidi + i);

  // 7. Proses inversi
  if(inversions.bass) {
    const bassMidi = 60 + (inversions.bass.charCodeAt(0) - 67);
    chordNotes.push(bassMidi - 12); // Pindah ke oktaf bawah
  }

  // 8. Mapping ke fretboard (Standard Tuning EADGBE)
  const standardTuning = [64, 59, 55, 50, 45, 40]; // MIDI note untuk setiap senar
  const fretPositions = standardTuning.map(stringNote => {
    const offsets = chordNotes.map(n => n - stringNote);
    return offsets.find(o => o >= 0 && o <= 24); // Batas fret 0-24
  });

  // 9. Penentuan fingering
  const fingers = fretPositions.map((fret, index) => {
    if(fret === -1) return 0;      // Senar tidak dimainkan
    if(fret === 0) return 0;       // Senar terbuka
    if(index < 2) return 1;        // Senar bass biasanya jari 1
    if(fret > 4) return 4;         // Fret tinggi pakai kelingking
    return Math.min(index + 1, 4); // Distribusi jari
  });

  return {
    frets: fretPositions,
    fingers: fingers
  };
}