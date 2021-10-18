class GameState{
    constructor(){
        this.WhitePieces = [];
        this.BlackPieces = [];
        this.loadPieces();
    }

    loadPieces(){
        for (var i = 0; i< BOARD.length; i++) {
            for (var j =0; j < BOARD[i].length; j++) {
                switch (BOARD[i][j]) {
                    case 'r': this.BlackPieces.push(new Rook    (j, i, false));
                        break;
                    case 'n': this.BlackPieces.push(new Knight  (j, i, false));
                        break;
                    case 'b': this.BlackPieces.push(new Bishop  (j, i, false));
                        break;
                    case 'q': this.BlackPieces.push(new Queen   (j, i, false));
                        break;
                    case 'k': this.BlackPieces.push(new King    (j, i, false));
                        break;
                    case 'p': this.BlackPieces.push(new Pawn    (j, i, false));
                        break;
                    case 'R': this.WhitePieces.push(new Rook    (j, i, true));
                        break;
                    case 'N': this.WhitePieces.push(new Knight  (j, i, true));
                        break;
                    case 'B': this.WhitePieces.push(new Bishop  (j, i, true));
                        break;
                    case 'Q': this.WhitePieces.push(new Queen   (j, i, true));
                        break;
                    case 'K': this.WhitePieces.push(new King    (j, i, true));
                        break;
                    case 'P': this.WhitePieces.push(new Pawn    (j, i, true));
                        break;
                }
            }
        }
    }

    drawBoard(){
        // Draw board cells
        for (var i = 0; i< BOARD.length; i++) {
            for (var j =0; j < BOARD[i].length; j++) {
                push();
                stroke(0);
                fill(250, 198, 155);
                if((i+j)%2 == 1) fill(181, 117, 62);
                translate(i*PIECE_SIZE, j*PIECE_SIZE);
                square(0,0, PIECE_SIZE);
                pop();
            }
        }
        // Draw black pieces
        for(var i = 0; i< this.BlackPieces.length; i++){
            this.BlackPieces[i].drawPiece();
        }
        // Draw white pieces
        for(var i = 0; i< this.WhitePieces.length; i++){
            this.WhitePieces[i].drawPiece();
        }
        // TODO: Draw moves only when clicked
        for(var i = 0; i< this.BlackPieces.length; i++){
            this.BlackPieces[i].drawMoves();
        }
        // TODO: Draw moves only when clicked
        for(var i = 0; i< this.WhitePieces.length; i++){
            this.WhitePieces[i].drawMoves();
        }
    }

}

var Game;

function setup(){
    createCanvas(WIDTH, HEIGHT);
    background(200);
    Game = new GameState();
}

function draw(){
    Game.drawBoard();
}