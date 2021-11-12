/*
Walter Newsome ECE @ VT
wnewsome.com
*/

class GameState{
    constructor(){
        // Main game components
        this.WhitePieces = [];
        this.BlackPieces = [];
        this.loadPieces();
        this.selectedIndex = -1;
        this.state = SPLASH_SCREEN;
        this.turn = WHITES_TURN;

        // Game settings
        this.color = 0;
        this.boardColor1 = color(250, 198, 155);
        this.boardColor2 = color(181, 117, 62);
        this.level = 1;
    }

    loadPieces(){
        // Load the pieces from the BOARD
        for (var i = 0; i< BOARD.length; i++) {
            for (var j =0; j < BOARD[i].length; j++) {
                switch (BOARD[i][j]) {
                    case 'r': this.BlackPieces.push(new Rook    (j, i, false, 'r', 0));
                        break;
                    case 'n': this.BlackPieces.push(new Knight  (j, i, false, 'n', 1));
                        break;
                    case 'b': this.BlackPieces.push(new Bishop  (j, i, false, 'b', 2));
                        break;
                    case 'q': this.BlackPieces.push(new Queen   (j, i, false, 'q', 3));
                        break;
                    case 'k': this.BlackPieces.push(new King    (j, i, false, 'k', 4));
                        break;
                    case 'p': this.BlackPieces.push(new Pawn    (j, i, false, 'p', 5));
                        break;
                    case 'R': this.WhitePieces.push(new Rook    (j, i, true, 'R', 6));
                        break;
                    case 'N': this.WhitePieces.push(new Knight  (j, i, true, 'N', 7));
                        break;
                    case 'B': this.WhitePieces.push(new Bishop  (j, i, true, 'B', 8));
                        break;
                    case 'Q': this.WhitePieces.push(new Queen   (j, i, true, 'Q', 9));
                        break;
                    case 'K': this.WhitePieces.push(new King    (j, i, true, 'K', 10));
                        break;
                    case 'P': this.WhitePieces.push(new Pawn    (j, i, true, 'P', 11));
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
                fill(Game.boardColor1);
                if((i+j)%2 == 1) fill(Game.boardColor2);
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

        // Draw moves if clicked
        for(var i = 0; i< this.WhitePieces.length; i++){
            if(this.WhitePieces[i].selected)
                this.WhitePieces[i].drawMoves();
        }

        // Compute opponent's move
        if(this.turn == BLACKS_TURN)
            opponents_turn();
    }

    selectPiece(i, j){
        // Called after click, identifies if a white piece was selected
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

function setup(){
    createCanvas(WIDTH, HEIGHT);
    background(0);

    // Setup the board to be an array
    for (var i = 0; i < 8; i++) {
        BOARD[i] = new Array(8);
        // Load existing game
        for (var j = 0; j < 8; j++) {
            BOARD[i][j] = BOARD1[i][j];
        }
    }

    Game = new GameState();
    img = loadImage("assets/logo.PNG");
    knightImg = loadImage("assets/knight.PNG");
    for(var i = 0; i < 12; i++)
        pieceImage.push(loadImage("assets/"+i+".png"));
    for(var i = 0; i < 4; i++)
        instructions.push(loadImage("assets/I"+i+".png"));
}

function mouseClicked(event) {
    // Click detected, behavior depends on state
    switch(Game.state){
        case SPLASH_SCREEN:
            break;
        case MAIN_MENU:
            // Selects from different options
            if( event.offsetX>= 200 && event.offsetX<=410 &&
                event.offsetY>= 275 && event.offsetY<=300){
                    Game.state = GAME;
                }
            if( event.offsetX>= 200 && event.offsetX<=345 &&
                event.offsetY>= 320 && event.offsetY<=340){
                    currFrameInt = frameCount;
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
            if(inDebugMode)
                print(event.offsetX + " " + event.offsetY);
            break
        case SETTINGS:
            // Identifies which options did the user selected
            if( event.offsetX>= 268 && event.offsetX<=342 &&
                event.offsetY>= 499 && event.offsetY<=520){
                    Game.state = MAIN_MENU;
                }
            if( event.offsetX>= 280 && event.offsetX<=330 &&
                event.offsetY>= 310 && event.offsetY<=360){
                    Game.color = 0;
                    Game.boardColor1 = color(250, 198, 155);
                    Game.boardColor2 = color(181, 117, 62);
                }
            if( event.offsetX>= 340 && event.offsetX<=390 &&
                event.offsetY>= 310 && event.offsetY<=360){
                    Game.color = 1;
                    Game.boardColor1 = color(57, 75, 212);
                    Game.boardColor2 = color(142, 154, 245);
                }
            if( event.offsetX>= 400 && event.offsetX<=450 &&
                event.offsetY>= 310 && event.offsetY<=360){
                    Game.color = 2;
                    Game.boardColor1 = color(120);
                    Game.boardColor2 = color(255);
                }
            if( event.offsetX>= 280 && event.offsetX<=330 &&
                event.offsetY>= 400 && event.offsetY<=450){
                    Game.level = 1;
                }
            if( event.offsetX>= 340 && event.offsetX<=390 &&
                event.offsetY>= 400 && event.offsetY<=450){
                    Game.level = 2;
                }
            if( event.offsetX>= 400 && event.offsetX<=450 &&
                event.offsetY>= 400 && event.offsetY<=450){
                    Game.level = 3;
                }
            break;
        case INSTRUCTIONS:
            // Going back to main menu
            if( event.offsetX>= 270 && event.offsetX<=327 &&
                event.offsetY>= 554 && event.offsetY<=570){
                    Game.state = MAIN_MENU;
                }
            break;
        case CREDITS:
            // Going back to main menu
            if( event.offsetX>= 270 && event.offsetX<=327 &&
                event.offsetY>= 510 && event.offsetY<=530){
                    Game.state = MAIN_MENU;
                }
            break;
        case GAME:
            // Click detected during a game. Identify if a white piece was selected
            var i = floor(event.offsetX/PIECE_SIZE);
            var j = floor(event.offsetY/PIECE_SIZE);
            handle_piece_click(i,j);
            break;
    }
    if(inDebugMode){
        // Print the main board to the console if in debugger mode
        print(mouseX, mouseY);
        console.table(BOARD);
    }
}

function draw(){
    // Main loop function which acts according to its state
    switch(Game.state){
        case SPLASH_SCREEN:
            draw_splash_screen();
            break;
        case MAIN_MENU:
            draw_main_screen();
            break
        case SETTINGS:
            draw_options_screen();
            break;
        case INSTRUCTIONS:
            draw_instructions_screen();
            break;
        case CREDITS:
            draw_credits_screen();
            break;
        case GAME:
            Game.drawBoard();
            break;
    }
}