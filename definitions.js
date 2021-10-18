var TRADITIONAL     = [ "rnbqkbnr",
                        "pppppppp",
                        "        ",
                        "        ",
                        "        ",
                        "        ",
                        "PPPPPPPP",
                        "RNBQKBNR"];

var BOARD           = TRADITIONAL;

// Pieces values
var KING_VALUE      = 10;
var QUEEN_VALUE     = 6;
var BISHOP_VALUE    = 3;
var KNIGHT_VALUE    = 3;
var ROOK_VALUE      = 3;
var PAWN_VALUE      = 1;

// Sizes
var WIDTH           = 600;
var HEIGHT          = 600;
var PIECE_SIZE      = WIDTH/8;

// Errors
var OUT_OF_BOARD    = 0;
var OCCUPIED_CELL   = 1;
var EMPTY_CELL      = 2;