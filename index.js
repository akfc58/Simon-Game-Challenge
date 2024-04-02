let gamePattern = [];
let userPattern = [];
let levelCount = 1;
let clickCount = 0;
let buttonID;

// listen to keydown only if the game haven't started.

$(document).on("keydown tap", function () {
    if ($("h1").text() === "Press anykey to start!") {
        buttonID = genNextButtonID();
        systemButtonAnimate(buttonID);
        playSound(buttonID);
        changeTitle(levelCount);
        gamePattern.push(buttonID);
    }
    if ($("h1").text() === "GameOver! Press anykey to restart.") {
        location.reload();
    }
});

$(".btn").on("click tap", function (e) {
    clickCount++;
    userPattern.push(e.target.id);
    userClickAnimate(e);
    if (clickCount == gamePattern.length) {
        // compare();
        console.log(gamePattern);
        console.log(clickCount);
        console.log(userPattern);
        if (
            userPattern[userPattern.length - 1] ===
            gamePattern[gamePattern.length - 1]
        ) {
            clickCount = 0; // count from zero on next round.
            userPattern = []; // clear user pattern.
            setTimeout(() => {
                buttonID = genNextButtonID();
                gamePattern.push(buttonID);
                systemButtonAnimate(buttonID);
                playSound(buttonID);
                levelCount++;
                changeTitle(levelCount);
            }, 400);
        } else {
            gameOver();
        }
    } else {
        // have not reached enough clicks to next round.
        if (e.target.id !== gamePattern[clickCount - 1]) {
            gameOver();
        }
    }
});

function userClickAnimate(e) {
    // $("#" + e.target.id).ready(animateOpacity());
    $("#" + e.target.id)
    .fadeOut(50)
    .fadeIn(50);
    playSound(e.target.id);
}

function compare(e, clickCount) {
    if (gamePattern[clickCount] !== e.target.id) {
        // console.log(gamePattern[clickCount]);
        // console.log(e.target.id);
        gameOver();
    } else {
        systemButtonAnimate(e.target.id);
    }
}

function gameOver() {
    $("h1").text("GameOver! Press anykey to restart.");
    $("body").addClass("flash");
    let soundFile = new Audio("./sounds/wrong.mp3");
    soundFile.play();
}

// get a random number between 0 - 3;
// set an array according to the number.
function genNextButtonID() {
    let buttonArray = ["green", "red", "yellow", "blue"];

    function getRandomNumber() {
        return Math.floor(Math.random() * 4);
    }
    return buttonArray[getRandomNumber()];
}

function systemButtonAnimate(buttonID) {
    $("#" + buttonID)
        .fadeOut(50)
        .fadeIn(50);
    playSound(buttonID);
}

function playSound(buttonID) {
    let soundFile = new Audio("./sounds/" + buttonID + ".mp3");
    soundFile.play();
}

function changeTitle(levelCount) {
    $("h1").text("level " + levelCount);
}

function animateOpacity() {
    // Animate the opacity
    $("#box").animate(
        {
            opacity: 0.5,
        },
        100,
        function () {
            // Animation complete
            // Reverse the opacity
            $("#box").animate(
                {
                    opacity: 1,
                },
                100,
                function () {
                    // Animation complete
                    // Call the animation function recursively
                    animateOpacity();
                }
            );
        }
    );
}
