(() => {
  // Define a mapping of music notes to frequencies.
  const noteFrequencies = {
    C: 261.63,
    "C#": 277.18,
    Db: 277.18,
    D: 293.66,
    "D#": 311.13,
    Eb: 311.13,
    E: 329.63,
    F: 349.23,
    "F#": 369.99,
    Gb: 369.99,
    G: 392.0,
    "G#": 415.3,
    Ab: 415.3,
    A: 440.0,
    "A#": 466.16,
    Bb: 466.16,
    B: 493.88,
    C2: 523.25,
    "C#2": 554.37,
    Db2: 554.37,
    D2: 587.33,
    "D#2": 622.25,
    Eb2: 622.25,
    E2: 659.25,
    F2: 698.46,
    "F#2": 739.99,
    Gb2: 739.99,
    G2: 783.99,
    "G#2": 830.61,
    Ab2: 830.61,
    A2: 880.0,
    "A#2": 932.33,
    Bb2: 932.33,
    B2: 987.77,
    C3: 1046.5,
    "C#3": 1108.73,
    Db3: 1108.73,
    D3: 1174.66,
    "D#3": 1244.51,
    Eb3: 1244.51,
    E3: 1318.51,
    F3: 1396.91,
    "F#3": 1479.98,
    Gb3: 1479.98,
    G3: 1567.98,
    "G#3": 1661.22,
    Ab3: 1661.22,
    A3: 1760.0,
    "A#3": 1864.66,
    Bb3: 1864.66,
    B3: 1975.53,
    C4: 2093.0,
    "C#4": 2217.46,
    Db4: 2217.46,
    D4: 2349.32,
    "D#4": 2489.02,
    Eb4: 2489.02,
    E4: 2637.02,
    F4: 2793.83,
    "F#4": 2959.96,
    Gb4: 2959.96,
    G4: 3135.96,
    "G#4": 3322.44,
    Ab4: 3322.44,
    A4: 3520.0,
    "A#4": 3729.31,
    Bb4: 3729.31,
    B4: 3951.07,
    C5: 4186.01,
    "C#5": 4434.92,
    Db5: 4434.92,
    D5: 4698.63,
    "D#5": 4978.03,
    Eb5: 4978.03,
    E5: 5274.04,
    F5: 5587.65,
    "F#5": 5919.91,
    Gb5: 5919.91,
    G5: 6271.93,
    "G#5": 6644.88,
    Ab5: 6644.88,
    A5: 7040.0,
    "A#5": 7458.62,
    Bb5: 7458.62,
    B5: 7902.13,
    C6: 8372.02,
    "C#6": 8869.84,
    Db6: 8869.84,
    D6: 9397.27,
    "D#6": 9956.06,
    Eb6: 9956.06,
    E6: 10548.08,
    F6: 11175.3,
    "F#6": 11839.82,
    Gb6: 11839.82,
    G6: 12543.85,
    "G#6": 13289.75,
    Ab6: 13289.75,
    A6: 14080.0,
    "A#6": 14917.24,
    Bb6: 14917.24,
    B6: 15804.26,
    C7: 16744.04,
    "C#7": 17739.68,
    Db7: 17739.68,
    D7: 18794.55,
    "D#7": 19912.13,
    Eb7: 19912.13,
    E7: 21096.16,
    F7: 22350.61,
    "F#7": 23679.64,
    Gb7: 23679.64,
    G7: 25087.71,
    "G#7": 26579.5,
    Ab7: 26579.5,
    A7: 28160.0,
    "A#7": 29834.48,
    Bb7: 29834.48,
    B7: 31608.53,
    C8: 33488.07,
    "C#8": 35479.37,
    Db8: 35479.37,
    D8: 37589.1,
    "D#8": 39824.26,
    Eb8: 39824.26,
    E8: 42192.33,
    F8: 44701.21,
    "F#8": 47359.29,
    Gb8: 47359.29,
    G8: 50175.42,
    "G#8": 53159.01,
    Ab8: 53159.01,
    A8: 56320.0,
    "A#8": 59668.97,
    Bb8: 59668.97,
    B8: 63217.06,
  };

  // Define a mapping of note lengths to durations.
  const noteLengths = {
    '1': 1.0,
    "1/2": 0.5,
    "1/4": 0.25,
    "1/8": 0.125,
  };

  const instruments = {
    piano: {
      oscillatorType: "square",
      filterType: "lowpass",
      filterFrequency: 8000,
    },
    guitar: {
      oscillatorType: "sawtooth",
      filterType: "lowpass",
      filterFrequency: 3500,
    },
    flute: {
      oscillatorType: "sine",
      filterType: "lowpass",
      filterFrequency: 1000,
    },
    violin: {
      oscillatorType: "sawtooth",
      filterType: "bandpass",
      filterFrequency: 5000,
    },
    xylophone: {
      oscillatorType: "square",
      filterType: "highpass",
      filterFrequency: 7000,
    }
  };

  let playing = false;

  // Function to play a note.
  // Function to play a note.
  function playNote(audioContext, note, length) {
    // if the note is `-` then it's a pause
    if (note === '-') {
      return new Promise((resolve) => {
        setTimeout(resolve, length * 1000);
      });
    }
    // Create an ADSR envelope.
    let attack = parseFloat(document.querySelector("#attack").value); // Attack time in seconds.
    let decay = parseFloat(document.querySelector("#decay").value); // Decay time in seconds.
    let sustain = parseFloat(document.querySelector("#sustain").value); // Sustain level.
    let release = parseFloat(document.querySelector("#release").value); // Release time in seconds.
    let instrument = document.querySelector('input[name="instrument"]:checked').value;
    let { oscillatorType, filterType, filterFrequency } = instruments[instrument];

    console.log(
      `Instrument: ${instrument}. Oscillator type: ${oscillatorType}. Filter type: ${filterType}. Filter frequency: ${filterFrequency}.`
    );
    console.log(
      `Playing note ${note} for ${length} seconds. Attack: ${attack}, decay: ${decay}, sustain: ${sustain}, release: ${release}.`
    );

    return new Promise((resolve) => {
      let oscillator = audioContext.createOscillator();
      let gainNode = audioContext.createGain();
      let filter = audioContext.createBiquadFilter();

      oscillator.type = oscillatorType;
      if (noteFrequencies.hasOwnProperty(note)) {
        oscillator.frequency.value = noteFrequencies[note];
      } else {
        console.log(`Note ${note} does not exist.`);
        resolve();
        return;
      }
      filter.type = filterType;
      filter.frequency.value = filterFrequency;

      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        1,
        audioContext.currentTime + attack
      );
      gainNode.gain.linearRampToValueAtTime(
        sustain,
        audioContext.currentTime + attack + decay
      );
      gainNode.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + attack + decay + length + release
      );

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();

      setTimeout(function () {
        oscillator.stop();
        resolve();
      }, length * 1000);
    });
  }

  // Play the notes.
  document.querySelector("#play").addEventListener("click", async function (event) {
    event.target.disabled = true;
    event.target.classList.add('opacity-25');
    // Parse the music sheet.
    try {
      let musicSheet = document.querySelector("#music-sheet").value.trim().replaceAll('\n', ' ');
      let notes = musicSheet.split(", ");
      // Create an audio context.
      let audioContext = new (window.AudioContext || window.webkitAudioContext)();

      playing = true;

      while (playing) {
        for (let i = 0; i < notes.length; i++) {
          if (!playing) {
            break;
          }
          let noteParts = notes[i].split(" ");
          document.querySelector("#current-note").innerHTML = noteParts[0];
          await playNote(audioContext, noteParts[0], noteLengths[noteParts[1]]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  document.querySelector("#stop").addEventListener("click", function () {
    console.log("Stopping playback.");
    playing = false;
    document.querySelector("#play").disabled = false;
    document.querySelector("#play").classList.remove('opacity-25');
    document.querySelector("#current-note").innerHTML = '🎼';
  });
})();
