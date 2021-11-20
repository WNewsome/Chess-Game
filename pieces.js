/*
Walter Newsome ECE @ VT
wnewsome.com
    This file contains all classes, methods, and helper functions
    related to the piece object.
*/

class Piece{
    // The main piece class contains information about the state of the piece
    constructor(i, j, value, white, char, id){
        this.i              = i;
        this.j              = j;
        this.value          = value;
        this.active         = true;
        this.white          = white;
        this.moves          = [];
        this.selected       = false;
        this.char           = char;
        this.id             = id;
    }

    drawPiece(){
        // Displaying the piece on the screen only if active
        if(this.active){
            // Draw only values for now
            push();
            textSize(14);
            noStroke();
            translate(this.i*PIECE_SIZE+PIECE_SIZE/2, this.j*PIECE_SIZE+PIECE_SIZE/2);
            if(verbose){
                // Print info related to this piece
                fill(0);
                if(this.white) fill(255);
                circle(0,0,PIECE_SIZE/2);
                fill(255);
                if(this.white) fill(0);
                text(this.value, -4, 4);
                fill(0);
                text("( "+this.i+", "+this.j+" )", -33, 31);
                text(this.name, -PIECE_SIZE/2+2, -PIECE_SIZE/2+12);
            } else {
                image(pieceImage[this.id], -PIECE_SIZE/2, -PIECE_SIZE/2,PIECE_SIZE,PIECE_SIZE);
            }
            pop();
        }
    }

    drawMoves(){
        if(this.active){
            push();
            // Obtains all valid moves of a piece and displays it to the screen
            for(var i = 0; i < this.moves.length; i++){
                if(this.moves.length > 0){
                    noFill();
                    stroke(0,0,200);
                    strokeWeight(2);
                    if(opponent(this.moves[i][0], this.moves[i][1], this.white)){
                        stroke(200,0,0);
                    }

                    circle( this.moves[i][0]*PIECE_SIZE+PIECE_SIZE/2,
                            this.moves[i][1]*PIECE_SIZE+PIECE_SIZE/2, PIECE_SIZE-25);
                    circle( this.moves[i][0]*PIECE_SIZE+PIECE_SIZE/2,
                            this.moves[i][1]*PIECE_SIZE+PIECE_SIZE/2, PIECE_SIZE-40);

                }
            }
            pop();
        }
    }

    toggleSelection(){
        // Select / deselect a piece
        this.selected = !this.selected;
    }
}

class King extends Piece{
    // The king piece inherits from the piece class
    constructor(i, j, white, char, id){
        super(i, j, KING_VALUE, white, char, id);
        this.name = "King";
        this.allowed_moves();
    }

    allowed_moves(){
        // Compute moves: All around
        this.moves = []
        if(this.active)
            BOARD[this.j][this.i] = this.char;
        for(var i = -1; i < 2; i++){
            for(var j = -1; j < 2; j++){
                if( i != 0 || j != 0) addMove(this.i+i, this.j+j, this.moves, this.white);
            }
        }
    }
}

class Queen extends Piece{
    // The Queen piece inherits from the piece class
    constructor(i, j, white, char, id){
        super(i, j, QUEEN_VALUE, white, char, id);
        this.name = "Queen";
        this.allowed_moves();
    }

    allowed_moves(){
        // Queen can move all around multiple cells
        this.moves = []
        if(this.active)
            BOARD[this.j][this.i] = this.char;
        // West
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j, this.moves, this.white)) break;
        // East
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j, this.moves, this.white)) break;
        // North
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j-j, this.moves, this.white)) break;
        // South
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j+j, this.moves, this.white)) break;
        // SE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j+i, this.moves, this.white)) break;
        // NE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j-i, this.moves, this.white)) break;
        // SW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j+i, this.moves, this.white)) break;
        // NW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j-i, this.moves, this.white)) break;
    }
}

class Bishop extends Piece{
    // The Bishop piece inherits from the piece class
    constructor(i, j, white, char, id){
        super(i, j, BISHOP_VALUE, white, char, id);
        this.name = "Bishop";
        this.allowed_moves();
    }

    allowed_moves(){
        // This piece can move diagonally
        this.moves = []
        if(this.active)
            BOARD[this.j][this.i] = this.char;
        // SE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j+i, this.moves, this.white)) break;
        // NE
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j-i, this.moves, this.white)) break;
        // SW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j+i, this.moves, this.white)) break;
        // NW
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j-i, this.moves, this.white)) break;
    }
}

class Knight extends Piece{
    // The Knight (the horse) piece inherits from the piece class
    constructor(i, j, white, char, id){
        super(i, j, KNIGHT_VALUE, white, char, id);
        this.name = "Knight";
        this.allowed_moves();
    }

    allowed_moves(){
        if(this.active)
            BOARD[this.j][this.i] = this.char;
        // compute valid L (or 7 shape) postions
        this.moves = []
        addMove(this.i+1, this.j+2, this.moves, this.white);
        addMove(this.i+1, this.j-2, this.moves, this.white);
        addMove(this.i-1, this.j-2, this.moves, this.white);
        addMove(this.i-1, this.j+2, this.moves, this.white);
        addMove(this.i+2, this.j+1, this.moves, this.white);
        addMove(this.i+2, this.j-1, this.moves, this.white);
        addMove(this.i-2, this.j+1, this.moves, this.white);
        addMove(this.i-2, this.j-1, this.moves, this.white);
    }
}

class Rook extends Piece{
    // The Rook piece inherits from the piece class
    constructor(i, j, white, char, id){
        super(i, j, ROOK_VALUE, white, char, id);
        this.name = "Rook";
        this.allowed_moves();
    }

    allowed_moves(){
        // This piece can move multiple cells horizontally or vertically
        this.moves = []
        if(this.active)
            BOARD[this.j][this.i] = this.char;
        // West
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i-i, this.j, this.moves, this.white)) break;
        // East
        for(var i = 1; i < 8; i++)
            if(OCCUPIED_CELL == addMove(this.i+i, this.j, this.moves, this.white)) break;
        // North
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j-j, this.moves, this.white)) break;
        // South
        for(var j = 1; j < 8; j++)
            if(OCCUPIED_CELL == addMove(this.i, this.j+j, this.moves, this.white)) break;
    }
}

class Pawn extends Piece{
    // The Pawn piece inherits from the piece class
    constructor(i, j, white, char, id){
        super(i, j, PAWN_VALUE, white, char, id);
        this.name = "Pawn";
        this.firstMove = true;
        this.allowed_moves();
    }

    allowed_moves(){
        // Compute valid moves
        this.moves = []
        if(this.active)
            BOARD[this.j][this.i] = this.char;
        // Direction matters
        var direction = this.white? -1: 1;
        // Ensure first move
        this.firstMove = this.white? this.j == 6: this.j == 1;
        if(OCCUPIED_CELL == addMove(this.i, this.j+direction, this.moves, this.white)) this.moves.pop();

        // Allow to move forward only at first move
        if(this.firstMove && this.moves.length>0)
            if(OCCUPIED_CELL == addMove(this.i, this.j+direction+direction, this.moves, this.white)) this.moves.pop();

        // Can move diagonally forward if there's a enemy in front
        if(this.i-direction>-1 && this.i-direction<8)
            if(OCCUPIED_CELL != addMove(this.i-direction, this.j+direction, this.moves, this.white)) this.moves.pop();
        if(this.i+direction>-1 && this.i+direction<8)
            if(OCCUPIED_CELL != addMove(this.i+direction, this.j+direction, this.moves, this.white)) this.moves.pop();

    }
}

function addMove(i, j, moves, white){
    // Checking if move is valid
    if( i > 7 || i < 0 || j < 0 || j > 7) {
        return OUT_OF_BOARD;
    }
    var occupied = EMPTY_CELL;
    if(BOARD[j][i] != ' '){
        occupied = OCCUPIED_CELL;
    }
    if(!opponent(i,j, !white)) moves.push([i, j]);
    return occupied;
}

function opponent(i, j, white){
    // Assumes a valid i,j
    // returns true if there an opponent at i, j
    if(BOARD[j][i] != " "){
        if(white && BOARD[j][i].charCodeAt(0)>=97) return true;
        if(!white && BOARD[j][i].charCodeAt(0)<=90) return true;
    }
    return false;
}

function get_index_by_ij(i, j, pieces){
    // Return the array index corresponding to piece (i,j) on the board
    for(var n = 0; n< pieces.length; n++){
        if(pieces[n].i == i && pieces[n].j == j) return n;
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
                BOARD[Game.WhitePieces[Game.selectedIndex].j][Game.WhitePieces[Game.selectedIndex].i] = ' ';
                Game.WhitePieces[Game.selectedIndex].i = i;
                Game.WhitePieces[Game.selectedIndex].j = j;

                if(Game.WhitePieces[Game.selectedIndex].name == "Pawn" && j == 0){
                    // Pawn becomes queen!
                    print("queen");
                    Game.WhitePieces[Game.selectedIndex] = new Queen   (i, j, true, 'Q', 9);
                }

                // Check if opponent killed
                var opponent = get_index_by_ij(i,j, Game.BlackPieces);
                if(opponent > -1)
                    Game.BlackPieces[opponent].active = false;

                // Update moves
                updateAllValidMoved();

                // Change turns only after a valid move
                Game.turn = BLACKS_TURN;
            }
        }
        Game.selectPiece(i, j);
    } else {
        print("Computer's turn: still thinking!");
    }
}

function updateAllValidMoved(){
    // Update all allowed moves for both White and Black pieces
    for(n = 0; n < Game.WhitePieces.length; n++ ){
        Game.WhitePieces[n].allowed_moves();
    }
    for(n = 0; n < Game.BlackPieces.length; n++ ){
        Game.BlackPieces[n].allowed_moves();
    }
}