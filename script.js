function getComputerChoice(arr){
    //function to print random weapon from computer.
    
    const randomIndex = Math.floor(Math.random() * arr.length);

    const item = arr[randomIndex];

    return item;
}

function playRound(playerSelection, computerSelection,playerScore,computerScore){

    //Function to print the result of game
    if (playerSelection == computerSelection) {
        var status = "(It's a draw.)"
    }else if ( playerSelection == 'rock' && computerSelection == 'paper'){
        var status = "(You Lose.)"
        computerScore++;
    }else if ( playerSelection == 'paper' && computerSelection == 'scissor'){
        var status = "(You Lose.)"
        computerScore++;
    }else if ( playerSelection == 'scissor' && computerSelection == 'rock'){
        var status = "(You Lose.)"
        computerScore++;
    }else if ( playerSelection == 'rock' && computerSelection == 'scissor'){
        var status = "(You Won.)"
        playerScore++;
    }else if ( playerSelection == 'paper' && computerSelection == 'rock'){
        var status = "(You Won.)"
        playerScore++;
    }else if ( playerSelection == 'scissor' && computerSelection == 'paper'){
        var status = "(You Won.)"
        playerScore++;
    }
    var result= status;
    return result

}


const weapons = ['rock','paper','scissor' ];
//Scores
var computerScore= 0;
var playerScore = 0;
const computerscore= document.getElementById('computerScore');
const playerscore= document.getElementById('playerScore');
computerscore.innerHTML = "Computer Score: " +computerScore;
playerscore.innerHTML = "Player Score: " +playerScore;


const resultDiv = document.getElementById('resultBox')
const computerWeaponResult =document.getElementById('ComputerWeaponResult')


let computerWeapon = getComputerChoice(weapons);
let playerWeapon = "";
const rock = document.getElementById('rockImg');

const paper = document.getElementById('paperImg');
const scissor = document.getElementById('scissorImg');
//aading value to playerWeapon,if clicked


rock.addEventListener('click', () => {
    playerWeapon += 'rock';  
    console.log('players weapon :'+playerWeapon) 
    let roundResult = playRound(playerWeapon, computerWeapon,playerScore,computerScore);

    computerWeaponResult.textContent = "Computer's Weapon : " + computerWeapon;
    resultDiv.textContent = "Result  is : "+ roundResult; 
        
    if(roundResult === '(You Won.)'){
        playerScore += 1;
    }
    else if(roundResult === '(You Lose.)'){
        computerScore += 1;
        }
    if(playerScore >= 5){
        playerscore.innerHTML = "Player Score: " +playerScore;
        alert("Congratulation on winning against the computer. Victory!!!!!!!!!");
        location.reload();
    }
    else if(computerScore >= 5)
    {
        computerscore.innerHTML = "Computer Score: " +computerScore;
        alert('YOU LOSE ... Try again!!!');
        location.reload();
    }

    computerscore.innerHTML = "Computer Score: " +computerScore;
    playerscore.innerHTML = "Player Score: " +playerScore;
    playerWeapon="";
    computerWeapon = getComputerChoice(weapons);
})

paper.addEventListener('click', () => {
    playerWeapon += 'paper';
    console.log('players weapon :'+playerWeapon)
    let roundResult = playRound(playerWeapon, computerWeapon);
    computerWeaponResult.textContent = "Computer's Weapon : " + computerWeapon;
    resultDiv.textContent = "Result  is : "+ roundResult; 

    if(roundResult === '(You Won.)'){
        playerScore += 1;
    }
    else if(roundResult === '(You Lose.)'){
        computerScore += 1;
    }

    if(playerScore >= 5){
        playerscore.innerHTML = "Player Score: " +playerScore;
        alert("Congratulation on winning against the computer. Victory!!!!!!!!!");
        location.reload();
    }
    else if(computerScore >= 5){
        computerscore.innerHTML = "Computer Score: " +computerScore;
        alert('YOU LOSE ... Try again!!!');
        location.reload();
    }

    computerscore.innerHTML = "Computer Score: " +computerScore;
    playerscore.innerHTML = "Player Score: " +playerScore;
    playerWeapon=""; 
     computerWeapon = getComputerChoice(weapons);
})
scissor.addEventListener('click', () => {
    playerWeapon += 'scissor'
    console.log('players weapon :'+playerWeapon)
    let roundResult = playRound(playerWeapon, computerWeapon);
    computerWeaponResult.textContent = "Computer's Weapon : " + computerWeapon;
    resultDiv.textContent = "Result  is : "+ roundResult; 
    if(roundResult === '(You Won.)'){
        playerScore += 1;
    }
    else if(roundResult === '(You Lose.)'){
        computerScore += 1;
    }
    if(playerScore >= 5){
        playerscore.innerHTML = "Player Score: " +playerScore;
        alert("Congratulation on winning against the computer. Victory!!!!!!!!!");
        location.reload();
    }
    else if(computerScore >= 5){
        computerscore.innerHTML = "Computer Score: " +computerScore;
        alert('YOU LOSE ... Try again!!!');
        location.reload();
    }

    computerscore.innerHTML = "Computer Score: " +computerScore;
    playerscore.innerHTML = "Player Score: " +playerScore;
    playerWeapon=""; 
        computerWeapon = getComputerChoice(weapons);
})
