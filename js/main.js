pi = 0;
pj = 0;


document.addEventListener('keydown', function(ev) {
    console.log('event: keydown');
    switch (ev.key) {
        case 'ArrowLeft':  pj--; break; 
        case 'ArrowUp':    pi--; break; 
        case 'ArrowRight': pj++; break; 
        case 'ArrowDown':  pi++; break; 
    }

    cells = document.getElementsByClassName('grid-cell');
    for (c of cells) 
        c.style.backgroundColor = '#FFFFFF';
    cells[pi*4 + pj].style.backgroundColor = '#FF0000';
});