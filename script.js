document.querySelector('#generate').addEventListener("click", randomPokemon);
document.querySelector('#submitBtn').addEventListener("click", checkGuess);

const nameDisplay = document.querySelector('#pokemonName');
const results = document.createElement('p');
const giveUpBtn = document.createElement('button');
const answerReveal = document.createElement('p');

////// creating input group ////////



giveUpBtn.textContent = "I give up!";
giveUpBtn.addEventListener("click", revealAnswer);

let giveUp = false;

let answer;
let guess;

function randomNumber() {
    //generate a random number 1-151 -> will be used to get a random pokemon
    let num =  Math.floor(Math.random() * (151 - 1 + 1) + 1);
    console.log(num);
    return num;
}


function randomPokemon() {
    if (giveUp) {
        giveUpBtn.remove();
        answerReveal.remove();

    }
    results.textContent = '';

    let num =  Math.floor(Math.random() * (151 - 1 + 1) + 1);
    console.log(num);
    //generate the photo for the pokemon with that ID
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
    .then((response) => response.json())
    .then((data) => {
        answer = data.name;
        console.log(answer);
        nameDisplay.textContent = '????????????';
        document.querySelector('.img').innerHTML = 
        `
        
        <img 
            src="${data.sprites.other["official-artwork"].front_default}" 
            alt="${data.name}"
        />
        `;
    })
    .catch((err) => {
        console.log(err);
    });
}

function checkGuess(guess) {
    results.textContent = '';
    guess = document.querySelector('#guess').value.toLowerCase();
    guess = guess.trim();
    const guessing = document.querySelector('#guessing');

    console.log(guess.toLowerCase());
    if (guess === answer){
        giveUpBtn.remove();
        results.remove();
        console.log("correct");
        results.textContent = "Correct! Press the new game button to play again!"
        nameDisplay.textContent = answer.charAt(0).toUpperCase() + answer.slice(1);
        guessing.appendChild(results);
    } else {
        results.remove();
        console.log("false");
        results.textContent = "Incorrect, try again!"
        guessing.appendChild(results);
        guessing.appendChild(giveUpBtn);
    }
    document.getElementById("guess").value = '';
}

function revealAnswer() {
    giveUp = true;

    let capitalized = answer.charAt(0).toUpperCase() + answer.slice(1);
    nameDisplay.textContent = capitalized;

    answerReveal.textContent = `The correct answer was ${capitalized}, press the new game button to play again!`;
    guessing.appendChild(answerReveal);
    giveUpBtn.remove();
    results.remove();
}