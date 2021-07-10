const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.getElementsByClassName('btn__reset'); 
const buttonSelected = document.getElementsByTagName('button');
const livesLeft = document.querySelectorAll('li.tries img');
const overlay = document.querySelector('#overlay');
let missed = 0;
const phrases = [
    'keep your eyes peeled',
    'happy as a clam',
    'there is no i in team',
    'swinging for the fences',
    'in a pickle'
];

//LISTEN FOR START GAME
startButton[0].addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// RETURNS A RANDOM PHRASE FROM THE ARRAY
const getRandomPhraseAsArray = (arr) => {
    let numberOfPhrases = phrases.length
    const randomNum = Math.floor(Math.random() * numberOfPhrases);
    phrasesAsArray = arr [randomNum].split('');
    return phrasesAsArray;
} 

// ADDS THE LETTER OF A STRING TO THE DISPLAY 
const addPhraseToDisplay = (arr) => {
    let ul = document.querySelector('ul');
    for (let i = 0; i < arr.length; i++) {
        let li = document.createElement('li');
        li.textContent = arr [i];
        if (li.textContent === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
        ul.appendChild(li);
    }
}

const phraseData = addPhraseToDisplay(getRandomPhraseAsArray(phrases));

//CHECK IF A LETTER IS LOCATED IN THE PHRASE

const checkLetter = (btn) => {
    const letters = document.querySelectorAll('.letter');
    let match = null;
    for (let i = 0; i < letters.length; i++){
        if (letters [i].textContent == btn) {
            letters [i].className = 'show letter';
            match = letters[i].textContent;
        }
    }
    if (match == null) {
        let missedAttempts = livesLeft[missed];
        missedAttempts.src = 'images/lostHeart.png';
        missed ++
    }
    checkWin();
    return match;
}

//WIN OR LOSE

const checkWin = () => {
    const liLetter = document.querySelectorAll('li.letter');
    const liShow = document.querySelectorAll('li.show');
    if (liLetter.length === liShow.length) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'Great Job!';
        resizeTo();
    } else if (missed > 4) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'You are too young to know any of these phrases!';
        reset();
    }
}

//LISTEN FOR KEYBOARD TO BE PRESSED

qwerty.addEventListener('click', (event) => {
    if (event.target.tagName !=='BUTTON' || event.target.className == 'chosen'){
        alert('Please click a key that has not been selected')
    }
    else if(event.target.tagName == 'BUTTON'){
        const keyPressed = event.target.textContent;
        event.target.className = 'chosen';
        checkLetter(keyPressed);
    }
   
});

//RESET FUNCTION
const reset = () => {
    startButton[0].textContent = 'Play Again';
    startButton[0].addEventListener('click', () => {
    document.location.reload();
    });
  }