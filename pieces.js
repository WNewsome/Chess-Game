
class Piece{
    constructor(i, j, value, white){
        this.i      = i;
        this.j      = j;
        this.value  = value;
        this.active = true;
        this.white  = white;
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
        pop();
    }
}

class King extends Piece{
    constructor(i, j, white){
        super(i, j, KING_VALUE, white);
    }
}

class Queen extends Piece{
    constructor(i, j, white){
        super(i, j, QUEEN_VALUE, white);
    }
}

class Bishop extends Piece{
    constructor(i, j, white){
        super(i, j, BISHOP_VALUE, white);
    }
}

class Knight extends Piece{
    constructor(i, j, white){
        super(i, j, KNIGHT_VALUE, white);
    }
}

class Rook extends Piece{
    constructor(i, j, white){
        super(i, j, ROOK_VALUE, white);
    }
}

class Pawn extends Piece{
    constructor(i, j, white){
        super(i, j, PAWN_VALUE, white);
    }
}