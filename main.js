class GameState{
    constructor(){
        this.WhitePieces = [];
        this.BlackPieces = [];
        this.loadPieces();
        this.selectedIndex = -1;
        this.state = SPLASH_SCREEN;
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
        /*
        // TODO: Draw moves only when clicked
        for(var i = 0; i< this.BlackPieces.length; i++){
            this.BlackPieces[i].drawMoves();
        }
        // TODO: Draw moves only when clicked
        */
        for(var i = 0; i< this.WhitePieces.length; i++){
            if(this.WhitePieces[i].selected)
                this.WhitePieces[i].drawMoves();
        }
    }
    selectPiece(i, j){
        var index = get_index_by_ij(i, j, this.WhitePieces);
        // Clear all other selections TODO: limit this process to only this.selectedIndex?
        for(var n = 0; n< this.WhitePieces.length; n++){
                if(n != index)
                    this.WhitePieces[n].selected = false;
        }

        if(index>-1){
            // Select or deselect
            this.WhitePieces[index].toggleSelection();
            // Can only select on piece at the time
            this.selectedIndex = this.WhitePieces[index].selected ? index: -1;
        } else {
            this.selectedIndex = -1;
        }
    }
}
var img;
var knightImg;
var Game;

function setup(){
    createCanvas(WIDTH, HEIGHT);
    background(200);
    Game = new GameState();
    img = loadImage("logo.PNG");
    knightImg = loadImage("knight.PNG");
}

function mouseClicked(event) {
    switch(Game.state){
        case SPLASH_SCREEN:
            break;
        case MAIN_MENU:
            if( event.offsetX>= 200 && event.offsetX<=410 &&
                event.offsetY>= 275 && event.offsetY<=300){
                    Game.state = GAME;
                }
            if( event.offsetX>= 200 && event.offsetX<=345 &&
                event.offsetY>= 320 && event.offsetY<=340){
                    Game.state = INSTRUCTIONS;
                }
            if( event.offsetX>= 200 && event.offsetX<=295 &&
                event.offsetY>= 360 && event.offsetY<=387){
                    Game.state = SETTINGS;
                }
            if( event.offsetX>= 200 && event.offsetX<=295 &&
                event.offsetY>= 400 && event.offsetY<=420){
                    Game.state = CREDITS;
                }
            print(event.offsetX + " " + event.offsetY);
            break
        case SETTINGS:
            break;
        case GAME:
            var i = floor(event.offsetX/PIECE_SIZE);
            var j = floor(event.offsetY/PIECE_SIZE);

            if(any_piece_selected(Game.WhitePieces)){
                if(validate_move(i, j, Game.WhitePieces[Game.selectedIndex])){
                    var row = BOARD[0];
                    row[1] = 'X';
                    print(row)
                    BOARD[Game.WhitePieces[Game.selectedIndex].j][Game.WhitePieces[Game.selectedIndex].i] = " ";
                    Game.WhitePieces[Game.selectedIndex].i = i;
                    Game.WhitePieces[Game.selectedIndex].j = j;

                    // Update all allowed moves
                    for(n = 0; n < Game.WhitePieces.length; n++ ){
                        Game.WhitePieces[n].moves = [];
                        Game.WhitePieces[n].allowed_moves();
                    }
                }
            }

            Game.selectPiece(i, j);
            break;
    }
}

function draw(){
    switch(Game.state){
        case SPLASH_SCREEN:
            draw_splash_screen();
            break;
        case MAIN_MENU:
            draw_main_screen();
            break
        case SETTINGS:
        case INSTRUCTIONS:
        case CREDITS:
        case GAME:
            Game.state = GAME;
            Game.drawBoard();
            break;
    }
}

