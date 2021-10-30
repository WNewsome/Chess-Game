
class Piece{
    constructor(i, j, value, white){
        this.i              = i;
        this.j              = j;
        this.value          = value;
        this.active         = true;
        this.white          = white;
        this.moves          = [];
        this.selected   = false;
    }

    drawPiece(){
        // Draw only values for now
        push();
        noStroke();
        translate(this.i*PIECE_SIZE+PIECE_SIZE/2, this.j*PIECE_SIZE+PIECE_SIZE/2);
        fill(0);
        if(this.white) fill(255);
        circle(0,0,PIECE_SIZE/2);
        fill(255);
        if(this.white) fill(0);
        text(this.value, -4, 4);
        fill(0);
        text("( "+this.i+", "+this.j+" )", -33, 31);
        text(this.name, -PIECE_SIZE/2+2, -PIECE_SIZE/2+12);
        pop();
    }

    drawMoves(){
        for(var i = 0; i < this.moves.length; i++){
            if(this.moves.length > 0){
                noStroke();
                fill(0,0,200);
                if(opponent(this.moves[i][0], this.moves[i][1], this.white)){
                    fill(200,0,0);
                }
                circle( this.moves[i][0]*PIECE_SIZE+PIECE_SIZE/2,
                        this.moves[i][1]*PIECE_SIZE+PIECE_SIZE/2, PIECE_SIZE/4);
            }
        }
    }

    toggleSelection(){
        this.selected = !this.selected;
    }
}

class King extends Piece{
    constructor(i, j, white){
        super(i, j, KING_VALUE, white);
        this.name = "King";
        this.allowed_moves();
    }

    allowed_moves(){
        // All around
        for(var i = -1; i < 2; i++){
            for(var j = -1; j < 2; j++){
                if( i != 0 || j != 0) addMove(this.i+i, this.j+j, this.moves, this.white);
            }
        }
    }
}

class Queen extends Piece{
    constructor(i, j, white){
        super(i, j, QUEEN_VALUE, white);
        this.name = "Queen";
        this.allowed_moves();
    }

    allowed_moves(){
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
    constructor(i, j, white){
        super(i, j, BISHOP_VALUE, white);
        this.name = "Bishop";
        this.allowed_moves();
    }

    allowed_moves(){
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
    constructor(i, j, white){
        super(i, j, KNIGHT_VALUE, white);
        this.name = "Knight";
        this.allowed_moves();
    }

    allowed_moves(){
        // L postions
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
    constructor(i, j, white){
        super(i, j, ROOK_VALUE, white);
        this.name = "Rook";
        this.allowed_moves();
    }

    allowed_moves(){
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
    constructor(i, j, white){
        super(i, j, PAWN_VALUE, white);
        this.name = "Pawn";
        this.allowed_moves();
    }
    allowed_moves(){
        // Direction matters
        // TODO: Allowing move by one for now
        var direction = this.white? -1: 1;
        if(OCCUPIED_CELL == addMove(this.i, this.j+direction, this.moves, this.white)) this.moves.pop();
        if(OCCUPIED_CELL != addMove(this.i-1, this.j+direction, this.moves, this.white)) this.moves.pop();
        if(OCCUPIED_CELL != addMove(this.i+1, this.j+direction, this.moves, this.white)) this.moves.pop();
    }
}

function addMove(i, j, moves, white){
    // Checking if move is valid
    if( i > 7 || i < 0 || j < 0 || j > 7) {
        return OUT_OF_BOARD;
    }
    var occupied = EMPTY_CELL;
    if(BOARD[j][i] != " "){
        occupied = OCCUPIED_CELL;
    }
    if(!opponent(i,j, !white)) moves.push([i, j]);
    return occupied;
}

function opponent(i, j, white){
    // Assumes a valid i,j
    // Is there an opponent at i,j?
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
        if(pieces[n].selected)
            return true;
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