class Game {
    LEN = 4;
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    score = 0;

    existEmptyCell() {
        for (var i=0; i<this.LEN; i++)
            for (var j=0; j<this.LEN; j++)
                if (this.board[i][j] === 0)
                    return true;
        return false;
    }

    isMergeable() {
        for (var i=0; i<this.LEN; i++)
            for (var j=0; j+1<this.LEN; j++)
                if (this.board[i][j] === this.board[i][j+1])
                    return true;
        for (var i=0; i+1<this.LEN; i++)
            for (var j=0; j<this.LEN; j++)
                if (this.board[i][j] === this.board[i+1][j])
                    return true;
        return false;
    }

    addRandomBlock() {
        var pos = [];
        for (var i=0; i<this.LEN; i++)
            for (var j=0; j<this.LEN; j++)
                if (this.board[i][j] === 0)
                    pos.push([i,j]);

        var randIdx = Math.floor(Math.random() * pos.length)
        var i = pos[randIdx][0];
        var j = pos[randIdx][1];

        this.board[i][j] = Math.random() < 0.9 ? 2 : 4;
    }

    compress(arr) {
        if (arr.length <= 1) return arr;

        var len = arr.length;
        arr = arr.filter(x => x!==0);
        while (arr.length < len) 
            arr.push(0);

        if (arr[0] === 0) return arr;

        if (arr[0] === arr[1])
            return [arr[0] * 2]
                .concat(this.compress(arr.slice(2)))
                .concat([0]);
        else
            return [arr[0]]
                .concat(this.compress(arr.slice(1)));
    }
    applyMove(ai, aj, bi, bj, di, dj) {
        for (var n=0; n<this.LEN; n++) {
            var arr = [0, 0, 0, 0];
            for (var k=0; k<this.LEN; k++)
                arr[k] = this.board[ai+di*k][aj+dj*k];
            var arr = this.compress(arr);
            for (var k=0; k<this.LEN; k++)
                this.board[ai+di*k][aj+dj*k] = arr[k];

            ai += bi;
            aj += bj;
        }
    }
    applyMoveU() {
        this.applyMove(0, 0, 0, 1, 1, 0);
    }
    applyMoveD() {
        this.applyMove(3, 0, 0, 1, -1, 0);
    }
    applyMoveL() {
        this.applyMove(0, 0, 1, 0, 0, 1);
    }
    applyMoveR() {
        this.applyMove(0, 3, 1, 0, 0, -1);
    }
    
}


function displayGame(game) {
    cells = document.getElementsByClassName('grid-cell');
    for (var i=0; i<4; i++) {
        for (var j=0; j<4; j++) {
            cells[i*4 + j].textContent = game.board[i][j] ? 
                game.board[i][j] : '';
            cells[i*4 + j].style.backgroundColor = game.board[i][j] ? 
                '#9999FF' : '#FFFFFF';
                
        }
    }

}


var game = new Game();
game.addRandomBlock();
game.addRandomBlock();
displayGame(game);


document.addEventListener('keydown', function(ev) {
    console.log('event: keydown ' + ev.key);
    switch (ev.key) {
        case 'ArrowLeft':  
        case 'a':
            game.applyMoveL();
            break; 
        case 'ArrowUp':    
        case 'w':
            game.applyMoveU();
            break; 
        case 'ArrowRight': 
        case 'd':
            game.applyMoveR();
            break; 
        case 'ArrowDown':  
        case 's':
            game.applyMoveD();
            break; 
    }

    displayGame(game);
    game.addRandomBlock();
    displayGame(game);
    
});