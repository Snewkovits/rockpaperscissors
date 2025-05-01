let selectedCard = null;
let opponentCard = null;
const cards = ['rock', 'paper', 'scissors'];
let defaultView = () => {}

document.addEventListener('DOMContentLoaded', () => {
    defaultView = () => {
        const selectable = [];
        const player = document.getElementById('player');

        let degree = -20;
        let left = document.body.clientWidth / 2 - 100;
        let timeout = 0;
        let bottom = -400;

        cards.forEach(card => {
            const cardElement = createCard(card);
            player.appendChild(cardElement);
            selectable.push(cardElement);
            cardElement.style.bottom = `${bottom}px`;
            cardElement.style.left = `${document.body.clientWidth / 2 - 100}px`;
        });

        setTimeout(() => {
            bottom += 300;
            selectable.forEach(card => {
                card.style.bottom = `${bottom}px`;
            });
        }, timeout += 100);
        
        
        setTimeout(() => {
            selectable.forEach(card => {
                card.style.transform = `rotate(${degree}deg)`;
                card.style.left = `${left}px`;
                degree += 20;
                left += 50;
            });
            selectable[1].style.bottom = `${bottom + 15}px`;
        }, timeout += 1000);

        selectable.forEach(card => {
            card.addEventListener('mouseover', onCardEnter);
            card.addEventListener('mouseout', onCardLeave);
            card.addEventListener('click', onCardClick);
        });
    }
    resetView();
});

const resetView = () => {
    if (selectedCard) {
        let timeout = 0;
        let opponent = document.getElementById('opponent');
        let oppCards = opponent.querySelectorAll('.card');
        let player = document.getElementById('player');
        
        let degree = -20;
        let left = document.body.clientWidth / 2 - 100;
        let bottom = -100;

        if (oppCards.length > 0) {
            oppCards.forEach(card => {
                card.style.top = `${-500}px`;
                setTimeout(() => {
                    card.remove();
                }, timeout + 100);
            });
        }

        setTimeout(() => {
            cards.forEach(card => {
                if (selectedCard.querySelector('div').innerText.toLowerCase() != card) {
                    const cardElement = createCard(card);
                    cardElement.style.bottom = `${-500}px`;
                    cardElement.style.left = `${player.clientWidth / 2 - cardElement.clientWidth}px`;
                    player.appendChild(cardElement);
                }
            });

            selectedCard = null;

            setTimeout(() => {
                player.querySelectorAll('.card').forEach(card => {
                    card.style.scale = '1';
                    card.style.bottom = `${bottom}px`;
                    card.style.left = `${left}px`;
                    card.style.transform = `rotate(${degree}deg)`;
                    degree += 20;
                    left += 50;
                    card.style.pointerEvents = 'fill';

                    card.addEventListener('mouseover', onCardEnter);
                    card.addEventListener('mouseout', onCardLeave);
                    card.addEventListener('click', onCardClick);
                });
                player.querySelectorAll('.card')[1].style.bottom = `${bottom + 15}px`;
            }, timeout += 100);
        }, timeout += 600);
}
    else {
        document.querySelectorAll('.card').forEach(element => {
            element.remove();
        });
        defaultView();
    }
}

const onWindowResize = () => {
    const cards = document.querySelectorAll('.card');
    
    let degree = -20;
    let left = document.body.clientWidth / 2 - 100;
    
    if (!selectedCard) bottom = -100;
    else bottom = -400;
    
    if (!selectedCard) {
        cards.forEach(card => {
        card.style.transform = `rotate(${degree}deg)`;
        card.style.left = `${left}px`;
        card.style.bottom = `${bottom}px`;
        degree += 20;
        left += 50;
        });
        cards[1].style.bottom = `${bottom + 15}px`;
    }
    else {
        console.log(selectedCard.clientWidth);
        selectedCard.style.transform = `rotate(0deg)`;
        selectedCard.style.left = `${document.getElementById('player').clientWidth / 2 - selectedCard.clientWidth / 2}px`;
        selectedCard.style.bottom = `${document.getElementById('player').clientHeight / 2 - selectedCard.clientHeight / 2}px`;
    }

    if (opponentCard) {
        opponentCard.style.left = `${document.getElementById('opponent').clientWidth / 2 - opponentCard.clientWidth / 2}px`;
        opponentCard.style.top = `${document.getElementById('opponent').clientHeight / 2 - opponentCard.clientHeight / 2}px`;
    }
}

const onCardEnter = event => {
    let card = event.currentTarget;
    if (!selectedCard) {
        let deg = card.style.transform.match(/rotate\(([^)]+)\)/)[1];
        if (parseInt(deg) > 0) {
            card.style.transform = `rotate(${parseInt(deg) + 10}deg)`;
            card.style.left = `${parseInt(card.style.left) + 60}px`;
        }
        else if (parseInt(deg) < 0) {
            card.style.transform = `rotate(${parseInt(deg) - 10}deg)`;
            card.style.left = `${parseInt(card.style.left) - 60}px`;
        }
        card.style.bottom = `${parseInt(card.style.bottom) + 80}px`;
        card.style.scale = `1.5`;
    }
}

const onCardLeave = event => {
    let card = event.currentTarget;
    if (!selectedCard) {
        let deg = card.style.transform.match(/rotate\(([^)]+)\)/)[1];
        if (parseInt(deg) > 0) {
            card.style.transform = `rotate(${parseInt(deg) - 10}deg)`;
            card.style.left = `${parseInt(card.style.left) - 60}px`;
        }
        else if (parseInt(deg) < 0) {
            card.style.transform = `rotate(${parseInt(deg) + 10}deg)`;
            card.style.left = `${parseInt(card.style.left) + 60}px`;
        }
        card.style.bottom = `${parseInt(card.style.bottom) - 80}px`;
        card.style.scale = `1`;
    }
}

const onCardClick = event => {
    let timeout = 0;
    let card = event.currentTarget;
    if (!selectedCard) {
        document.querySelectorAll('.card').forEach(element => {
            element.removeEventListener('mouseover', onCardEnter);
            element.removeEventListener('mouseout', onCardLeave);
            element.removeEventListener('click', onCardClick);
        });

        const cardElements = document.querySelectorAll('.card');
        const player = document.getElementById('player');
        cardElements.forEach(element => {
            if (card !== element) {
                element.style.pointerEvents = 'none';
                element.style.transform = `rotate(0deg)`;
                element.style.bottom = '-500px';
            }
        });
        card.style.transform = `rotate(0deg)`;
        card.style.bottom = `${player.clientHeight / 2 - card.clientHeight / 2}px`;
        card.style.left = `${player.clientWidth / 2 - card.clientWidth / 2}px`;
        selectedCard = card;
        
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.innerText = "PLAY";
        overlay.style.opacity = '0';
        selectedCard.appendChild(overlay);

        const playerOverlay = document.createElement('div');
        playerOverlay.id = 'player-overlay';
        playerOverlay.innerText = "BACK";
        playerOverlay.style.opacity = '0';
        player.appendChild(playerOverlay);

        selectedCard.addEventListener('mouseover', onSelectedCardEnter);
        selectedCard.addEventListener('mouseout', onSelectedCardLeave);
        selectedCard.addEventListener('click', onPlayClick);

        playerOverlay.addEventListener('mouseover', onSelectedPlayerBackEnter);
        playerOverlay.addEventListener('mouseout', onSelectedPlayerBackLeave);
        playerOverlay.addEventListener('click', onSelectedPlayerBackClick);
        
        const opponent = document.getElementById('opponent');

        opponentCard = createAnonimCard();
        opponentCard.style.pointerEvents = 'none';
        opponentCard.style.top = `${-500}px`;
        opponentCard.style.left = `${player.clientWidth / 2 - selectedCard.clientWidth / 2}px`;
        opponentCard.style.scale = '1.5';
        opponent.appendChild(opponentCard);
        setTimeout(() => {
            opponentCard.style.top = `${opponent.clientHeight / 2 - opponentCard.clientHeight / 2}px`;
        }, timeout += 400);
        setTimeout(() => {
            opponentCard.style.transform = `rotate3d(1, 0, 0, -50deg)`;
        }, timeout += 100);
        setTimeout(() => {
            opponentCard.style.transform = `rotate3d(0, 0, 0, 0deg)`;
            opponentCard.style.scale = '1';
            cardElements.forEach(element => {
                if (selectedCard !== element) {
                    element.remove();
                }
            });
        }, timeout += 100);
    }
}

const onSelectedCardEnter = event => {
    document.getElementById('overlay').style.opacity = '1';
}

const onSelectedCardLeave = event => {
    document.getElementById('overlay').style.opacity = '0';
}

const onPlayClick = event => {
    let timeout = 0;

    const playerOverlay = document.getElementById('player-overlay');

    selectedCard.removeEventListener('mouseover', onSelectedCardEnter);
    selectedCard.removeEventListener('mouseout', onSelectedCardLeave);
    selectedCard.removeEventListener('click', onPlayClick);
    selectedCard.style.pointerEvents = 'none';

    playerOverlay.removeEventListener('mouseover', onSelectedPlayerBackEnter);
    playerOverlay.removeEventListener('mouseout', onSelectedPlayerBackLeave);
    playerOverlay.removeEventListener('click', onSelectedPlayerBackClick);
    playerOverlay.style.pointerEvents = 'none';

    let opCard = null;
    let plCard = selectedCard.querySelector('div').innerText.toLowerCase();

    playerOverlay.remove();
    document.getElementById('overlay').remove();

    const screenOverlay = document.createElement('div');
    screenOverlay.id = 'screen-overlay';
    document.body.appendChild(screenOverlay);
    screenOverlay.style.opacity = '0';
    screenOverlay.style.position = 'absolute';
    screenOverlay.style.top = '0';
    screenOverlay.style.left = '0';
    screenOverlay.style.width = '100%';
    screenOverlay.style.height = '100%';
    screenOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    screenOverlay.style.transition = 'opacity 0.5s ease-in-out';

    setTimeout(() => {
        selectedCard.style.transform = `rotate3d(1, 0, 0, -50deg)`;
    }, timeout += 100);
    setTimeout(() => {
        selectedCard.style.transform = `rotate3d(0, 0, 0, 0deg)`;
        selectedCard.style.scale = 1;
    }, timeout += 100);
    setTimeout(() => {
        flipCard(opponentCard);
    }, timeout += 1000);
    setTimeout(() => {
        opCard = opponentCard.querySelector('div').innerText.toLowerCase();
        if (opCard === plCard) {
            screenOverlay.innerHTML = 'DRAW!';
        }
        else if (   (opCard === 'rock' && plCard === 'scissors')    || 
                    (opCard === 'scissors' && plCard === 'paper')   || 
                    (opCard === 'paper' && plCard === 'rock')
                ) {
            screenOverlay.innerHTML = 'YOU LOSE!';
        }
        else {
            screenOverlay.innerHTML = 'YOU WIN!';
        }
        screenOverlay.style.opacity = '1';
        screenOverlay.addEventListener('click', screenOverlayClick);
    }, timeout += 1000);
}

const screenOverlayClick = event => {
    const screenOverlay = event.currentTarget;
    screenOverlay.removeEventListener('click', screenOverlayClick);
    screenOverlay.style.opacity = '0';
    setTimeout(() => {
        screenOverlay.remove();
        resetView();
    }, 500);
}

const onSelectedPlayerBackEnter = event => {
    document.getElementById('player-overlay').style.opacity = '1';
}

const onSelectedPlayerBackLeave = event => {
    document.getElementById('player-overlay').style.opacity = '0';
}

const onSelectedPlayerBackClick = event => {
    const playerOverlay = document.getElementById('player-overlay');

    selectedCard.removeEventListener('mouseover', onSelectedCardEnter);
    selectedCard.removeEventListener('mouseout', onSelectedCardLeave);
    selectedCard.removeEventListener('click', onPlayClick);
    selectedCard.style.pointerEvents = 'none';

    playerOverlay.removeEventListener('mouseover', onSelectedPlayerBackEnter);
    playerOverlay.removeEventListener('mouseout', onSelectedPlayerBackLeave);
    playerOverlay.removeEventListener('click', onSelectedPlayerBackClick);
    playerOverlay.style.pointerEvents = 'none';

    document.getElementById('player-overlay').remove();
    document.getElementById('overlay').remove();

    resetView();
}

const createCard = name => {
    const card = document.createElement('div');
    card.className = 'card';
    const img = document.createElement('img');
    img.src = `./assets/${name}.png`;    
    img.alt = name;
    const text = document.createElement('div');
    text.innerText = name;
    
    card.appendChild(img);
    card.appendChild(text);

    return card;
}

const createAnonimCard = () => {
    const card = document.createElement('div');
    card.className = 'card anonim';
    
    const img = document.createElement('img');
    img.src = `./assets/rps.png`;
    img.id = 'card-img';
    img.alt = 'rock-paper-scissors';
    card.appendChild(img);

    return card;
}

window.addEventListener('resize', onWindowResize);