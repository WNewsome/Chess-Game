/**
 * This file contains all classes, methods, and helper functions
 * related to the piece object.
 *
 * @Author Walter Newsome <waltern@vt.edu>
 * Last modified: 2021-11-23
 */

class Piece{
    // The main piece class contains information about the state of the piece
    constructor(i, j, value, white, char, id, ai, tempBoard){
        this.i              = i;
        this.j              = j;
        this.value          = value;
        this.active         = true;
        this.white          = white;
        this.moves          = [];
        this.selected       = false;
        this.char           = char;
        this.id             = id;
        this.minimax        = ai;
        this.tempBoard      = tempBoard;
        this.initCoordinates= [-1,-1];
    }

    drawPiece(){
        // Displaying the piece on the screen only if active
        if(this.active){
            // Move piece up and down
            var ybaseSel = 0;
            if(this.selected){
                if(selectedPieceY > 10 || selectedPieceY < 0){
                    pieceYDir = -pieceYDir;
                }
                selectedPieceY += pieceYDir;
                ybaseSel = selectedPieceY;
            }

            // Draw only values for now
            push();
            textSize(14);
            noStroke();
            translate(this.i*PIECE_SIZE+PIECE_SIZE/2, this.j*PIECE_SIZE+PIECE_SIZE/2);
            image(pieceImage[this.id], -PIECE_SIZE/2, -PIECE_SIZE/2-ybaseSel,PIECE_SIZE,PIECE_SIZE);

            pop();
        }
    }

    drawByCoordinates(){
        // Displaying the piece on the screen only if active
        if(this.active){
            // Move piece up and down
            var ybaseSel = 0;
            if(this.selected){
                if(selectedPieceY > 10 || selectedPieceY < 0){
                    pieceYDir = -pieceYDir;
                }
                selectedPieceY += pieceYDir;
                ybaseSel = selectedPieceY;
            }

            // Draw only values for now
            push();
            textSize(14);
            noStroke();
            translate(this.initCoordinates[0]+PIECE_SIZE/2, this.initCoordinates[1]+PIECE_SIZE/2);
            image(pieceImage[this.id], -PIECE_SIZE/2, -PIECE_SIZE/2-ybaseSel,PIECE_SIZE,PIECE_SIZE);
            if(inDebugMode){
                // Print info related to this piece
                strokeWeight(3);
                text("( "+this.i+", "+this.j+" )", -PIECE_SIZE/2+2, -PIECE_SIZE/2+12);
            }

            pop();
        }
    }

    drawMoves(){
        if(this.active){
            if(circleSize > 15 || circleSize < 0){
                circleDir = -circleDir;
            }
            circleSize += circleDir;
            push();
            // Obtains all valid moves of a piece and displays it to the screen
            for(var i = 0; i < this.moves.length; i++){
                if(this.moves.length > 0){
                    noFill();
                    stroke(0,0,200, 200-15*circleSize);
                    strokeWeight(2);
                    if(opponent(this.moves[i][0], this.moves[i][1], this.white)){
                        stroke(200,0,0);
                    }

                    circle( this.moves[i][0]*PIECE_SIZE+PIECE_SIZE/2,
                            this.moves[i][1]*PIECE_SIZE+PIECE_SIZE/2, PIECE_SIZE-45+circleSize);
                    circle( this.moves[i][0]*PIECE_SIZE+PIECE_SIZE/2,
                            this.moves[i][1]*PIECE_SIZE+PIECE_SIZE/2, PIECE_SIZE-60+circleSize);

                }
            }
            pop();
        }
    }

    toggleSelection(){
        // Select or deselect a piece
        this.selected = !this.selected;
    }
}

class King extends Piece{
    // The king piece inherits from the piece class
    constructor(i, j, white, char, id, ai, tempBoard){
        super(i, j, KING_VALUE, white, char, id, ai, tempBoard);
        this.name = "King";
        this.allowed_moves();
    }

    allowed_moves(){
        // Compute moves: All around
        this.moves = []
        if(this.active && !this.minimax)
            BOARD[this.j][this.i] = this.char;
        for(var i = -1; i < 2; i++){
            for(var j = -1; j < 2; j++){
                if( i !== 0 || j !== 0) addMove(this.i+i, this.j+j, this.moves, this.white, this.minimax, this.tempBoard, this.char);
            }
        }
    }
}

class Queen extends Piece{
    // The Queen piece inherits from the piece class
    constructor(i, j, white, char, id, ai, tempBoard){
        super(i, j, QUEEN_VALUE, white, char, id, ai, tempBoard);
        this.name = "Queen";
        this.allowed_moves();
    }

    allowed_moves(){
        // Queen can move all around multiple cells
        this.moves = []
        if(this.active && !this.minimax)
            BOARD[this.j][this.i] = this.char;
        // West
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // East
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // North
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j-j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // South
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j+j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // SE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j+i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // NE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j-i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // SW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j+i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // NW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j-i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
    }
}

class Bishop extends Piece{
    // The Bishop piece inherits from the piece class
    constructor(i, j, white, char, id, ai, tempBoard){
        super(i, j, BISHOP_VALUE, white, char, id, ai, tempBoard);
        this.name = "Bishop";
        this.allowed_moves();
    }

    allowed_moves(){
        // This piece can move diagonally
        this.moves = []
        if(this.active && !this.minimax)
            BOARD[this.j][this.i] = this.char;
        // SE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j+i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // NE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j-i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // SW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j+i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // NW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j-i, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
    }
}

class Knight extends Piece{
    // The Knight (the horse) piece inherits from the piece class
    constructor(i, j, white, char, id, ai, tempBoard){
        super(i, j, KNIGHT_VALUE, white, char, id, ai, tempBoard);
        this.name = "Knight";
        this.allowed_moves();
    }

    allowed_moves(){
        if(this.active && !this.minimax)
            BOARD[this.j][this.i] = this.char;
        // compute valid L (or 7 shape) postions
        this.moves = [];
        addMove(this.i+1, this.j+2, this.moves, this.white, this.minimax, this.tempBoard, this.char);
        addMove(this.i+1, this.j-2, this.moves, this.white, this.minimax, this.tempBoard, this.char);
        addMove(this.i-1, this.j-2, this.moves, this.white, this.minimax, this.tempBoard, this.char);
        addMove(this.i-1, this.j+2, this.moves, this.white, this.minimax, this.tempBoard, this.char);
        addMove(this.i+2, this.j+1, this.moves, this.white, this.minimax, this.tempBoard, this.char);
        addMove(this.i+2, this.j-1, this.moves, this.white, this.minimax, this.tempBoard, this.char);
        addMove(this.i-2, this.j+1, this.moves, this.white, this.minimax, this.tempBoard, this.char);
        addMove(this.i-2, this.j-1, this.moves, this.white, this.minimax, this.tempBoard, this.char);
    }
}

class Rook extends Piece{
    // The Rook piece inherits from the piece class
    constructor(i, j, white, char, id, ai, tempBoard){
        super(i, j, ROOK_VALUE, white, char, id, ai, tempBoard);
        this.name = "Rook";
        this.allowed_moves();
    }

    allowed_moves(){
        // This piece can move multiple cells horizontally or vertically
        this.moves = [];
        if(this.active && !this.minimax)
            BOARD[this.j][this.i] = this.char;
        // West
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // East
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // North
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j-j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
        // South
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j+j, this.moves, this.white, this.minimax, this.tempBoard, this.char)) break;
    }
}

class Pawn extends Piece{
    // The Pawn piece inherits from the piece class
    constructor(i, j, white, char, id, ai, tempBoard){
        super(i, j, PAWN_VALUE, white, char, id, ai, tempBoard);
        this.name = "Pawn";
        this.firstMove = true;
        this.allowed_moves();
    }

    allowed_moves(){
        // Compute valid moves
        this.moves = [];
        if(this.active && !this.minimax)
            BOARD[this.j][this.i] = this.char;
        // Direction matters
        var direction = this.white? -1: 1;
        // Ensure first move
        this.firstMove = this.white? this.j == 6: this.j == 1;
        if(OCCUPIED_CELL == addMove(this.i, this.j+direction, this.moves, this.white, this.minimax, this.tempBoard, this.char)) this.moves.pop();

        // Allow to move forward only at first move
        if(this.firstMove && this.moves.length>0)
            if(OCCUPIED_CELL == addMove(this.i, this.j+direction+direction, this.moves, this.white, this.minimax, this.tempBoard, this.char)) this.moves.pop();

        // Can move diagonally forward if there's a enemy in front
        if(this.i-direction>-1 && this.i-direction<8)
            if(OCCUPIED_CELL != addMove(this.i-direction, this.j+direction, this.moves, this.white, this.minimax, this.tempBoard, this.char)) this.moves.pop();
        if(this.i+direction>-1 && this.i+direction<8)
            if(OCCUPIED_CELL != addMove(this.i+direction, this.j+direction, this.moves, this.white, this.minimax, this.tempBoard, this.char)) this.moves.pop();

    }
}

function addMove(i, j, moves, white, ai, tempBoard, char){
    // Checking if move is valid
    if( i > 7 || i < 0 || j < 0 || j > 7) {
        return OUT_OF_BOARD;
    }
    var occupied = EMPTY_CELL;
    if(ai){
        if(tempBoard[j][i] != ' '){
            occupied = OCCUPIED_CELL;
        }
        if(!opponent(i,j, !white, ai, tempBoard)) moves.push([i, j]);
    } else {
        if(BOARD[j][i] != ' '){
            occupied = OCCUPIED_CELL;
        }

        if(!opponent(i,j, !white, ai, BOARD))
            moves.push([i, j]);
    }
    return occupied;
}

function opponent(i, j, white, ai, tempBoard){
    // Assumes a valid i,j
    // returns true if there an opponent at i, j
    if(ai){
        if(tempBoard[j][i] != " "){
            if(white && tempBoard[j][i].charCodeAt(0)>=97) return true;
            if(!white && tempBoard[j][i].charCodeAt(0)<=90) return true;
        }
    } else {
        if(BOARD[j][i] != " "){
            if(white && BOARD[j][i].charCodeAt(0)>=97) return true;
            if(!white && BOARD[j][i].charCodeAt(0)<=90) return true;
        }
    }

    return false;
}

function get_index_by_ij(i, j, pieces){
    // Return the array index corresponding to piece (i,j) on the board
    for(var n = 0; n< pieces.length; n++){
        if(pieces[n].i == i && pieces[n].j == j && pieces[n].active) return n;
    }
    return -1;
}

function any_piece_selected(pieces){
    // Returns true if any piece is currently selected
    for(var n = 0; n< pieces.length; n++){
        if(pieces[n].selected){
            return pieces[n].active;
        }

    }
    return false;
}

function validate_move(i, j, piece){
    // verifies if a move is in the list of allowed moves
    for(var n = 0; n < piece.moves.length; n++){
        if(piece.moves[n][0] == i && piece.moves[n][1] == j){
            return true;
        }
    }
    return false;
}

function handle_piece_click(i,j){

    // Only allowed to click on the right turn (computer may need time to compute)
    if(Game.turn == WHITES_TURN){
        if(any_piece_selected(Game.WhitePieces)){
            if(validate_move(i, j, Game.WhitePieces[Game.selectedIndex])){
                // if pawn then mark first move
                if(Game.WhitePieces[Game.selectedIndex].name == "Pawn"){
                    Game.WhitePieces[Game.selectedIndex].firstMove = false;
                }

                // Clear current position and update to new one
                var oldPosition = [Game.WhitePieces[Game.selectedIndex].i,Game.WhitePieces[Game.selectedIndex].j];
                BOARD[Game.WhitePieces[Game.selectedIndex].j][Game.WhitePieces[Game.selectedIndex].i] = ' ';
                Game.WhitePieces[Game.selectedIndex].i = i;
                Game.WhitePieces[Game.selectedIndex].j = j;

                // Check if pawn become queen
                if(Game.WhitePieces[Game.selectedIndex].name == "Pawn" && j === 0){
                    // Pawn becomes queen!
                    Game.WhitePieces[Game.selectedIndex] = new Queen   (i, j, true, 'Q', 9);
                }

                Game.WhitePieces[Game.selectedIndex].initCoordinates = [oldPosition[0]*PIECE_SIZE,oldPosition[1]*PIECE_SIZE];

                // Check if opponent killed
                var opponent = get_index_by_ij(i,j, Game.BlackPieces);
                if(opponent > -1){
                    Game.BlackPieces[opponent].active = false;
                }

                // Update moves
                updateAllValidMoves();

                // Move piece
                Game.turn = MOVING_PIECE;
                movingPieceIndex = Game.selectedIndex;
                movingWhite = true;

                if(inCheck(BOARD, false)){
                    if(inCheckmate(BOARD, false)){
                        Game.state = GAME_WON;
                        pieceWinId = Game.WhitePieces[Game.selectedIndex].id;
                    }
                }
            }
        }
        Game.selectPiece(i, j);
    }
}


function updateAllValidMoves(){
    // Update all allowed moves for both White and Black pieces
    for(n = 0; n < Game.WhitePieces.length; n++ ){
        Game.WhitePieces[n].allowed_moves();
        removeCheckMoves(Game.WhitePieces[n], BOARD);
    }
    for(n = 0; n < Game.BlackPieces.length; n++ ){
        Game.BlackPieces[n].allowed_moves();
        removeCheckMoves(Game.BlackPieces[n], BOARD);
    }
}

var movingPieceIndex = -1;
var movingWhite      = true;

function movePiece(){
    // This function allows to animate the moved piece for both players
    if(movingWhite){
        var movingPiece = Game.WhitePieces[movingPieceIndex];
        var deltaY = 0;
        var deltaX = 0;

        if( abs(movingPiece.j*PIECE_SIZE - movingPiece.initCoordinates[1]) <10 &&
            abs(movingPiece.i*PIECE_SIZE - movingPiece.initCoordinates[0]) <10){
            Game.turn = BLACKS_TURN;
            movingPiece.drawPiece();
            if(Game.state != GAME_WON)
                drawComputerThinking();
            return;
        }

        // move in y
        if(movingPiece.j*PIECE_SIZE < movingPiece.initCoordinates[1]){
            deltaY = -5;
        } else if(movingPiece.j*PIECE_SIZE > movingPiece.initCoordinates[1]){
            deltaY = 5;
        }

        // move in x
        if(movingPiece.i*PIECE_SIZE < movingPiece.initCoordinates[0]){
            deltaX = -5;
        } else if(movingPiece.i*PIECE_SIZE > movingPiece.initCoordinates[0]){
            deltaX = 5;
        }
        movingPiece.initCoordinates[1] += deltaY;
        movingPiece.initCoordinates[0] += deltaX;
        movingPiece.drawByCoordinates();
    } else {
        // Change turns
        var movingPiece = Game.BlackPieces[movingPieceIndex];
        var deltaY = 0;
        var deltaX = 0;

        if(movingPiece.j*PIECE_SIZE == movingPiece.initCoordinates[1] &&
            movingPiece.i*PIECE_SIZE == movingPiece.initCoordinates[0]){
            Game.turn = WHITES_TURN;
            movingPiece.drawPiece();
            return;
        }

        // move in y
        if(movingPiece.j*PIECE_SIZE < movingPiece.initCoordinates[1]){
            deltaY = -5;
        } else if(movingPiece.j*PIECE_SIZE > movingPiece.initCoordinates[1]){
            deltaY = 5;
        }

        // move in x
        if(movingPiece.i*PIECE_SIZE < movingPiece.initCoordinates[0]){
            deltaX = -5;
        } else if(movingPiece.i*PIECE_SIZE > movingPiece.initCoordinates[0]){
            deltaX = 5;
        }
        movingPiece.initCoordinates[1] += deltaY;
        movingPiece.initCoordinates[0] += deltaX;
        movingPiece.drawByCoordinates();
    }
}

function boardDeepCopy(boardToCopyFrom){
    // Return a deep copy of the passed board
    // Solves the issue regarding updating a secondary board when creating its copy
    var boardToReturn;
    boardToReturn = new Array(8);
    for (var i = 0; i < 8; i++) {
        boardToReturn[i] = new Array(8);
        // Load existing game
        for (var j = 0; j < 8; j++) {
            boardToReturn[i][j] = ' ';
            boardToReturn[i][j] = boardToCopyFrom[i][j];
        }
    }

    return boardToReturn;
}

function removeCheckMoves(piece, theBoard){
    // For all allowed moves of a given piece, remove all moves that can make the king
    // to become in the check state
    var allMoves = piece.moves;
    var allowed = [];
    for(var move = 0; move < allMoves.length; move++){
        board = boardDeepCopy(theBoard);
        board[piece.j][piece.i] = ' ';
        board[piece.moves[move][1]][piece.moves[move][0]] = piece.char;
        if(!inCheck(board, piece.white)){
            allowed.push([piece.moves[move][0],piece.moves[move][1]]);
        }
    }
    piece.moves = allowed;
    return allowed;
}

function drawComputerThinking(){
    // Simple message to display that the computer is currently calculating its next move
    push();
    fill(0,0,0,150);
    textSize(35);
    rect(1.5*PIECE_SIZE, 2.75*PIECE_SIZE, 5*PIECE_SIZE, 1.5*PIECE_SIZE);
    fill(255);
    text("Computer thinking...",1.9*PIECE_SIZE, 3.65*PIECE_SIZE);
    pop();
}

function winGame(){
    // Displayed when the user wins the game
    if(selectedPieceY > 10 || selectedPieceY < 0){
        pieceYDir = -pieceYDir;
    }
    selectedPieceY += pieceYDir;
    // Select the piece the user used to win the game and display it
    push();
    fill(0,0,0,150);
    textSize(37);
    rect(1.5*PIECE_SIZE, 2.75*PIECE_SIZE, 5*PIECE_SIZE, 1.5*PIECE_SIZE);
    fill(255);
    text("You Win",2.5*PIECE_SIZE, 3.65*PIECE_SIZE);
    push();
    translate(4.75*PIECE_SIZE+PIECE_SIZE/2, 3*PIECE_SIZE+PIECE_SIZE/2);
    image(pieceImage[pieceWinId], -PIECE_SIZE/2-selectedPieceY, -PIECE_SIZE/2-selectedPieceY, PIECE_SIZE+2*selectedPieceY, PIECE_SIZE+2*selectedPieceY);
    pop()
    pop();
}

function lostGame(){
    // Display that the computer won the game
    if(selectedPieceY > 10 || selectedPieceY < 0){
        pieceYDir = -pieceYDir;
    }
    selectedPieceY += pieceYDir;

    // Select the piece the algorithm used to win the game and display it
    push();
    fill(255,0,0,180);
    textSize(37);
    rect(1.5*PIECE_SIZE, 2.75*PIECE_SIZE, 5*PIECE_SIZE, 1.5*PIECE_SIZE);
    fill(255);
    text("You Lost",2.5*PIECE_SIZE, 3.65*PIECE_SIZE);
    push();
    translate(4.75*PIECE_SIZE+PIECE_SIZE/2, 3*PIECE_SIZE+PIECE_SIZE/2);
    image(pieceImage[pieceWinId], -PIECE_SIZE/2-selectedPieceY, -PIECE_SIZE/2-selectedPieceY, PIECE_SIZE+2*selectedPieceY, PIECE_SIZE+2*selectedPieceY);
    pop()
    pop();
}