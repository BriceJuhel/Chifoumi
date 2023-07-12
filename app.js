// On récupère tous les éléments dont on va avoir besoin par la suite

let resetBtn = document.getElementById("reset");
let playerScore = document.getElementById("player-score");
let computerScore = document.getElementById("computer-score");
// Ici on veut retourner un tableau d'éléments, on utilise le spread operator [...]
let btnPlayer = [...document.getElementsByClassName("btn-player")];
let cRockBtn = document.getElementById("c-rock");
let cPaperBtn = document.getElementById("c-paper");
let cScissorsBtn = document.getElementById("c-scissors");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

// On définit un évenement, ici le fait que lorsque l'on clique sur un élément, on récupère l'élément le plus proche donc la classe est btn-player, c'est à dire une div
const playRound = (event) => {
    let choice = event.target.closest(".btn-player")
    
    //On désactive tous les boutons et on retire l'event listener au clic car on ne veut pas que le joueur puisse cliquer sur un autre bouton
    btnPlayer.forEach(btn => {
        btn.classList.add("desactivated");
        btn.removeEventListener("click", playRound);
    });

    //Pour le bouton sélectionné, on lui met la class active pour le mettre en surbrillance
    choice.classList.remove("desactivated");
    choice.classList.add("active");

    //On récupère l'id de l'élement
    let playerChoice = choice.id;

    let computerChoice = doComputerChoice();

    verifyWinner(playerChoice, computerChoice);

    nextBtn.style.visibility = "visible";

}

const rock = "rock";
const paper = "paper";
const scissors = "scissors";

const doComputerChoice = () => {
    // 0 = rock
    // 1 = paper
    // 2 = scissors

    //On veut obtenir un chiffre aléatoire qui est soit 0, 1 ou 2.
    //Math.floor permet d'arrondir à l'entier inférieur, Math.random permet d'obtenir un nombre compris etre 0 et 1 non compris. Ici on multiplie par 3 pour obtenir jusqu'à 2,99 et donc 2 avec l'arrondi.
    let randomNb = Math.floor(Math.random() * 3);

    switch(randomNb){
        case 0 :
            cRockBtn.classList.add("active");
            return rock;
        case 1 :
            cPaperBtn.classList.add("active");
            return paper;
        default :
            cScissorsBtn.classList.add("active");
            return scissors;
    }
};

const verifyWinner = (playerChoice, computerChoice) => {
    if (playerChoice == computerChoice){
        message.textContent = "Egalité !";
        return;
    }

    if (playerChoice == rock){
        if(computerChoice == paper){
            return computerWin();
        } else if(computerChoice == scissors) {
            return playerWin();
        }
    }
    
    if (playerChoice == paper){
        if(computerChoice == scissors){
            return computerWin();
        } else if(computerChoice == rock) {
            return playerWin();
        }
    }

    if (playerChoice == scissors){
        if(computerChoice == rock){
            return computerWin();
        } else if(computerChoice == paper) {
            return playerWin();
        }
    
    }

};



const computerWin = () => {
    message.textContent = "L'ordinateur gagne ! :(";
    computerScore.textContent++;
};

const playerWin = () => {
    message.textContent = "Vous avez gagné ! :)";
    playerScore.textContent++;
};

const newRound = () => {
    btnPlayer.forEach(btn => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");

        btn.addEventListener("click", playRound);

        nextBtn.style.visibility = "hidden";

        cRockBtn.classList.remove("active");
        cPaperBtn.classList.remove("active");
        cScissorsBtn.classList.remove("active");

        message.textContent = "A vous de jouer !"; 
    })
}

nextBtn.addEventListener("click", newRound);

// On attache un écouteur d'évenement au clic sur les boutons dont la classe btn-player a été définie précédemment, on exécute alors la fonction playRound()
btnPlayer.forEach(btn => btn.addEventListener("click", playRound))

resetBtn.addEventListener("click", () => {
    playerScore.textContent = 0;
    computerScore.textContent = 0;

    newRound();
})