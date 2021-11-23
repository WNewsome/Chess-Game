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
        this.blackSelected = -1;
        this.state = SPLASH_SCREEN;
        this.turn = WHITES_TURN;
        this.blackLeavingI = -1;
        this.blackLeavingJ = -1;

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
                    case 'r': this.BlackPieces.push(new Rook    (j, i, false, 'r', 0, !AI));
                        break;
                    case 'n': this.BlackPieces.push(new Knight  (j, i, false, 'n', 1, !AI));
                        break;
                    case 'b': this.BlackPieces.push(new Bishop  (j, i, false, 'b', 2, !AI));
                        break;
                    case 'q': this.BlackPieces.push(new Queen   (j, i, false, 'q', 3, !AI));
                        break;
                    case 'k': this.BlackPieces.push(new King    (j, i, false, 'k', 4, !AI));
                        break;
                    case 'p': this.BlackPieces.push(new Pawn    (j, i, false, 'p', 5, !AI));
                        break;
                    case 'R': this.WhitePieces.push(new Rook    (j, i, true, 'R', 6, !AI));
                        break;
                    case 'N': this.WhitePieces.push(new Knight  (j, i, true, 'N', 7, !AI));
                        break;
                    case 'B': this.WhitePieces.push(new Bishop  (j, i, true, 'B', 8, !AI));
                        break;
                    case 'Q': this.WhitePieces.push(new Queen   (j, i, true, 'Q', 9, !AI));
                        break;
                    case 'K': this.WhitePieces.push(new King    (j, i, true, 'K', 10, !AI));
                        break;
                    case 'P': this.WhitePieces.push(new Pawn    (j, i, true, 'P', 11, !AI));
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
                if(verbose){
                    fill(0);
                    strokeWeight(1);
                    text("( "+i+", "+j+" )", 2, 12);
                }
                pop();
            }
        }
        // Draw black pieces
        for(var i = 0; i< this.BlackPieces.length; i++){
            if(this.turn != MOVING_PIECE || i != movingPieceIndex || movingWhite){
                this.BlackPieces[i].drawPiece();
            }

        }
        // Draw white pieces
        for(var i = 0; i< this.WhitePieces.length; i++){
            if(this.turn != MOVING_PIECE || i != movingPieceIndex || !movingWhite)
                this.WhitePieces[i].drawPiece();
        }

        // Draw moves if clicked
        for(var i = 0; i< this.WhitePieces.length; i++){
            if(this.WhitePieces[i].selected){
                this.WhitePieces[i].drawMoves();

            }
        }

        // Draw moves if clicked TODOREMOVE
        for(var i = 0; i< this.BlackPieces.length; i++){
            if(this.BlackPieces[i].selected)
                this.BlackPieces[i].drawMovesBlacks();
        }

        // Compute opponent's move
        if(this.turn == BLACKS_TURN)
            opponents_turn();

        // Moving a piece
        if(this.turn == MOVING_PIECE){
            movePiece();
        }

        // TODOREMOVE
        if(this.blackSelected>-1){
            if(this.BlackPieces[this.blackSelected].active)
                this.BlackPieces[this.blackSelected].drawMoves();
        }

        // Draw last black leaving move
        if(this.blackLeavingI > -1 && this.blackLeavingJ>-1){
            pieceLeaved-=2;
            push();
            noStroke();
            fill(200,0,0,pieceLeaved);
            translate(this.blackLeavingI*PIECE_SIZE, this.blackLeavingJ*PIECE_SIZE);
            stroke(200,0,0,pieceLeaved);
            strokeWeight(4);
            line(10*screenScale, 10*screenScale, 10*screenScale, 20*screenScale);
            line(10*screenScale, 10*screenScale, 20*screenScale, 10*screenScale);
            line(65*screenScale, 10*screenScale, 65*screenScale, 20*screenScale);
            line(65*screenScale, 10*screenScale, 55*screenScale, 10*screenScale);
            line(10*screenScale, 65*screenScale, 10*screenScale, 55*screenScale);
            line(10*screenScale, 65*screenScale, 20*screenScale, 65*screenScale);
            line(65*screenScale, 65*screenScale, 65*screenScale, 55*screenScale);
            line(65*screenScale, 65*screenScale, 55*screenScale, 65*screenScale);
            pop();
        }

        // /updateAllValidMoves();
    }

    selectPiece(i, j){
        this.blackSelected = -1; // TODOREMOVE
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
            // Can only select one piece at the time
            this.selectedIndex = this.WhitePieces[index].selected ? index: -1;
        } else {
            this.selectedIndex = -1;
        }

        // TODOREMOVE
        var indexBlack = get_index_by_ij(i, j, this.BlackPieces);
        if(indexBlack>-1){
            this.blackSelected = indexBlack;
            this.selected = -1;
        }
    }
}

function setup(){
    //windowWidth, windowHeight
    WIDTH = windowHeight;
    if(windowHeight>windowWidth){
        WIDTH = windowWidth;
    }
    WIDTH = 600;
    HEIGHT = WIDTH;
    screenScale = WIDTH/600;
    createCanvas(WIDTH, HEIGHT);
    background(0);
    PIECE_SIZE      = WIDTH/8;
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
            if( event.offsetX>= 200*screenScale && event.offsetX<=410*screenScale &&
                event.offsetY>= 275*screenScale && event.offsetY<=300*screenScale){
                    Game.state = GAME;
                }
            if( event.offsetX>= 200*screenScale && event.offsetX<=345*screenScale &&
                event.offsetY>= 320*screenScale && event.offsetY<=340*screenScale){
                    currFrameInt = frameCount;
                    Game.state = INSTRUCTIONS;
                }
            if( event.offsetX>= 200*screenScale && event.offsetX<=295*screenScale &&
                event.offsetY>= 360*screenScale && event.offsetY<=387*screenScale){
                    Game.state = SETTINGS;
                }
            if( event.offsetX>= 200*screenScale && event.offsetX<=295*screenScale &&
                event.offsetY>= 400*screenScale && event.offsetY<=420*screenScale){
                    Game.state = CREDITS;
                }
            if(inDebugMode)
                print(event.offsetX + " " + event.offsetY);
            break
        case SETTINGS:
            // Identifies which options did the user selected
            if( event.offsetX>= 268*screenScale && event.offsetX<=342*screenScale &&
                event.offsetY>= 499*screenScale && event.offsetY<=520*screenScale){
                    Game.state = MAIN_MENU;
                }
            if( event.offsetX>= 280*screenScale && event.offsetX<=330*screenScale &&
                event.offsetY>= 310*screenScale && event.offsetY<=360*screenScale){
                    Game.color = 0;
                    Game.boardColor1 = color(250, 198, 155);
                    Game.boardColor2 = color(181, 117, 62);
                }
            if( event.offsetX>= 340*screenScale && event.offsetX<=390*screenScale &&
                event.offsetY>= 310*screenScale && event.offsetY<=360*screenScale){
                    Game.color = 1;
                    Game.boardColor1 = color(57, 75, 212);
                    Game.boardColor2 = color(142, 154, 245);
                }
            if( event.offsetX>= 400*screenScale && event.offsetX<=450*screenScale &&
                event.offsetY>= 310*screenScale && event.offsetY<=360*screenScale){
                    Game.color = 2;
                    Game.boardColor1 = color(120);
                    Game.boardColor2 = color(255);
                }
            if( event.offsetX>= 280*screenScale && event.offsetX<=330*screenScale &&
                event.offsetY>= 400*screenScale && event.offsetY<=450*screenScale){
                    Game.level = 1;
                }
            if( event.offsetX>= 340*screenScale && event.offsetX<=390*screenScale &&
                event.offsetY>= 400*screenScale && event.offsetY<=450*screenScale){
                    Game.level = 2;
                }
            if( event.offsetX>= 400*screenScale && event.offsetX<=450*screenScale &&
                event.offsetY>= 400*screenScale && event.offsetY<=450*screenScale){
                    Game.level = 3;
                }
            break;
        case INSTRUCTIONS:
            // Going back to main menu
            if( event.offsetX>= 270*screenScale && event.offsetX<=327*screenScale &&
                event.offsetY>= 554*screenScale && event.offsetY<=570*screenScale){
                    Game.state = MAIN_MENU;
                }
            break;
        case CREDITS:
            // Going back to main menu
            if( event.offsetX>= 270*screenScale && event.offsetX<=327*screenScale &&
                event.offsetY>= 510*screenScale && event.offsetY<=530*screenScale){
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
    //print(mouseX/screenScale, mouseY/screenScale);
}

function draw(){
    // Main loop function which acts according to its state
    switch(Game.state){
        case SPLASH_SCREEN:
            draw_splash_screen();
            Game.state = MAIN_MENU;
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
        case GAME_LOST:
            Game.drawBoard();
            lostGame();
            break;
        case GAME_WON:
            Game.drawBoard();
            winGame();
            break;
    }
}