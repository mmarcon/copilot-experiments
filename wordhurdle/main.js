(async () => {
  const ALL_VOWELS = 'aeiou'.split('');

  function randomVowels(howMany) {
    const selectedVowels = [];
    while (selectedVowels.length < howMany) {
      const randomIndex = Math.floor(Math.random() * ALL_VOWELS.length);
      const vowel = ALL_VOWELS[randomIndex];
      if (!selectedVowels.includes(vowel)) {
        selectedVowels.push(vowel);
      }
    }
    return selectedVowels;
  }

  // Day of the year
  const day = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  // Fetch games.json
  const {games, words} = await fetch('games.json').then((res) => res.json());
  window.words = words;
  // Get the game for today
  const { consonants } = games[day];
  const game = {
    consonants,
    vowels: randomVowels(2),
    newVowelsCounter: 0,
    foundWords: [],
    currentWord: '',
  };

  // Display the consonants inside the button elements that are present inside the #consonants div
  const consonantsDiv = document.querySelector('#consonants');
  consonants.forEach((consonant, i) => {
    const button = consonantsDiv.children[i];
    button.textContent = consonant.toUpperCase();
  });
  // Same for the vowels
  const vowelsDiv = document.querySelector('#vowels');
  game.vowels.forEach((vowel, i) => {
    const button = vowelsDiv.children[i];
    button.textContent = vowel.toUpperCase();
  });

  // Handle clicks on the consonants
  document.querySelector('#consonants').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const letter = e.target.textContent.toLowerCase();
    appendLetter(letter);
  });

  // Handle clicks on the vowels
  document.querySelector('#vowels').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    const letter = e.target.textContent.toLowerCase();
    appendLetter(letter);
  });

  function appendLetter(letter) {
    game.currentWord += letter;
    const wordDiv = document.querySelector('#word');
    const letterSpan = document.createElement('span');
    letterSpan.classList.add('bg-gray-100', 'text-gray-800', 'font-bold', 'py-2', 'px-4', 'rounded', 'mr-1', 'ml-1');
    letterSpan.textContent = letter.toUpperCase();
    wordDiv.appendChild(letterSpan);
  }

  function clear() {
    game.currentWord = '';
    const wordDiv = document.querySelector('#word');
    wordDiv.innerHTML = '';
  }

  function enter() {
    const wordDiv = document.querySelector('#word');
    const foundWordsUl = document.querySelector('#found-words-list');
    const word = game.currentWord;
    game.currentWord = '';
    if (words.includes(word) && !game.foundWords.includes(word)) {
      console.log(`Found ${word}`);
      game.foundWords.push(word);
      wordDiv.innerHTML = '';
      const li = document.createElement('li');
      li.textContent = word;
      foundWordsUl.appendChild(li);
    } else {
      console.log(`In dictionary: ${words.includes(word)}`, `Already found: ${game.foundWords.includes(word)}`);
    }
  }

  function deleteLastLetter(game) {
    const wordDiv = document.querySelector('#word');
    const word = game.currentWord;
    if (word.length > 0) {
      game.currentWord = word.slice(0, -1);
      wordDiv.removeChild(wordDiv.lastChild);
    }
  }

  function getNewVowels() {
    if (game.newVowelsCounter >= 2) {
      console.error('You can only change the vowels twice');
    }
    const vowelsDiv = document.querySelector('#vowels');
    game.vowels = randomVowels(2);
    game.newVowelsCounter++;
    game.vowels.forEach((vowel, i) => {
      const button = vowelsDiv.children[i];
      button.textContent = vowel.toUpperCase();
    });
  }

  // Handle clicks on the enter button
  document.querySelector('#enter').addEventListener('click', (e) => {
    enter();
  });

  // Handle clicks on the new vowels button
  document.querySelector('#new-vowels').addEventListener('click', (e) => {
    getNewVowels();
  });

  // Hamdle clicks on the delete button
  document.querySelector('#delete').addEventListener('click', (e) => {
    deleteLastLetter(game);
  });

  // Handle clicks on the clear button
  document.querySelector('#clear').addEventListener('click', (e) => {
    clear();
  });

  // Let's handle keyboard interation:
  // - Pressing a letter will add it to the current word if the letter is a consonant or a vowel in the respective lists
  // - Pressing Backspace will remove the last letter from the current word
  // - Pressing Enter will add the current word to the list of found words if it is in the dictionary and not already found
  // - Pressing Escape will clear the current word
  // - Pressing Space will change the vowels
  document.addEventListener('keydown', (e) => {
    const wordDiv = document.querySelector('#word');
    const foundWordsUl = document.querySelector('#found-words-list');
    const letter = e.key.toLowerCase();
    if (game.consonants.includes(letter) || game.vowels.includes(letter)) {
      appendLetter(letter);
    } else if (e.key === 'Backspace') {
      deleteLastLetter(game);
    } else if (e.key === 'Enter') {
      enter();
    } else if (e.key === 'Escape') {
      clear();
    } else if (e.key === ' ') {
      getNewVowels();
    }
  });
})();
