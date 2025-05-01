const flipCard = card => {
    let timeout = 0;
    const name = cards[Math.floor(Math.random() * cards.length)];
    
    const img = document.createElement('img');
    img.src = `./assets/${name}.png`;    
    img.alt = name;
    const text = document.createElement('div');
    text.innerText = name;

    card.style.transform = `rotate3d(0, 1, 0, 90deg)`;
    card.style.scale = '1.2';
    setTimeout(() => {
        card.className = 'card';
        document.getElementById('card-img').remove();
        card.appendChild(img);
        card.appendChild(text);
        card.style.transform = `rotate3d(0, 0, 0, 0deg)`;
    card.style.scale = '1';
    }, timeout += 300);
}