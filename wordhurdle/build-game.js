#!/usr/bin/env node

const fs = require("fs");

function randomLetters(set, howMany) {
  const selectedLetters = [];
  while (selectedLetters.length < howMany) {
    const randomIndex = Math.floor(Math.random() * set.length);
    const vowel = set[randomIndex];
    if (!selectedLetters.includes(vowel)) {
      selectedLetters.push(vowel);
    }
  }
  return selectedLetters;
}

function buildGame() {
  // https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html
  const CONSONANT_COMMONNESS = {
    q: 1,
    j: 1,
    z: 1.39,
    x: 1.48,
    v: 5.13,
    k: 5.61,
    w: 6.57,
    y: 9.06,
    f: 9.24,
    b: 10.56,
    g: 12.59,
    h: 15.31,
    m: 15.36,
    p: 16.14,
    d: 17.25,
    c: 23.13,
    l: 27.98,
    s: 29.23,
    n: 33.92,
    t: 35.43,
    r: 38.64,
  };
  const ALL_CONSONANTS = Object.keys(CONSONANT_COMMONNESS).reduce((acc, key) => {
    const howMany = Math.round(Math.floor(CONSONANT_COMMONNESS[key]) );
    for (let i = 0; i < howMany; i++) {
      acc.push(key);
    }
    return acc;
  }, []);
  const ALL_VOWELS = "aeiou".split("");
  const HOW_MANY_CONSONANTS = 5;
  const HOW_MANY_VOWELS = 2;
  const MIN_WORD_LENGTH = 4;

  // Read a file with a dictionary of words
  // Each word is on a new line and I want to read it into an array
  const words = fs
    .readFileSync("words.txt", "utf-8")
    .split('\n')
    .map((word) => word.toLowerCase())
    .filter((word) => word.length >= MIN_WORD_LENGTH);

  function dailyGame() {
    // Pick 5 consonants
    const selectedConsonants = randomLetters(ALL_CONSONANTS, HOW_MANY_CONSONANTS);

    // For all the words, find the ones that have only the selected consonants in any order
    const matches = words.filter((word) => {
      const letters = word.split('');
      // Find all the consonants in the word
      const consonants = letters.filter((letter) =>
        ALL_CONSONANTS.includes(letter)
      );
      // Drop the word if it contains consonants that are not in the selected consonants
      const extraConsonants = consonants.filter(
        (c) => !selectedConsonants.includes(c)
      );
      if (extraConsonants.length > 0) return false;
      return true;
    });

    // Pick 2 vowels
    const selectedVowels = randomLetters(ALL_VOWELS, HOW_MANY_VOWELS);

    // For all the matches, find the ones that have only the selected vowels in any order
    const finalMatches = matches.filter((word) => {
      const letters = word.split("");
      // Find all the vowels in the word
      const vowels = letters.filter((letter) => ALL_VOWELS.includes(letter));
      // Drop the word if it contains vowels that are not in the selected vowels
      const extraVowels = vowels.filter((v) => !selectedVowels.includes(v));
      if (extraVowels.length > 0) return false;
      return true;
    });

    if (finalMatches.length < 5) {
      console.log(`Found ${finalMatches.length} matches. Too hard. Try again.`);
      return false;
    }
    
    console.log(`Found ${finalMatches.length} matches`);

    return {
      consonants: selectedConsonants
    };
  }

  const games = [];
  for (let i = 0; i < 365; i++) {
    let game = dailyGame();
    while (game === false) {
      game = dailyGame();
    }
    games.push(game);
  }

  fs.writeFileSync("games.json", JSON.stringify({
    words,
    games
  }));
  // console.log(games[0]);
}

buildGame();
