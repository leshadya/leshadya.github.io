<!-- Hasan Kayan 18050111055 - Selin Ergin 22050111075 -->
document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('movingButton');
    let level = 1;
    let clicks = 0;
    let timeout = 500;
    let timeoutStarted = false;

    button.addEventListener('click', function() {
        clicks++;

        if (!timeoutStarted) {
            timeoutStarted = true;


            setTimeout(function() {
                if (clicks >= 3) {
                    levelUp();
                } else {
                    resetForNextAttempt();

                }
                moveButton();
            }, timeout);
        }
    });

    //move the button randomly
    function moveButton() {
        const x = Math.random()*300;
        const y = Math.random()*300;
        button.style.marginLeft = x + 'px';
        button.style.marginTop = y + 'px';
    }

    function levelUp() {
        alert(`You are the winner! You can go next level ${level}`);
        level++;
        resetForNextAttempt();
    }

    function resetForNextAttempt() {
        timeoutStarted = false;
        clicks = 0;

        if (level > 1 && level < 6) {
            timeout -= 100;
        }
        if (level === 6) {
            alert("Welcome to last level 6.");
            timeout = 10;
        }
    }
});
