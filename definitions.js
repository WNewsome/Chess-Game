var TRADITIONAL     = [ "rnbqkbnr",
                        "pppppppp",
                        "        ",
                        "        ",
                        "        ",
                        "        ",
                        "PPPPPPPP",
                        "RNBQKBNR"];

var SCENARIO1       = [ "rnbqkbnr",
                        "p pp ppp",
                        "    p   ",
                        " p P    ",
                        "        ",
                        "  NQ    ",
                        "        ",
                        "R B KBNR"];

var BOARD           = SCENARIO1;

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

// Game states
var SPLASH_SCREEN   = 0;
var MAIN_MENU       = 1;
var SETTINGS        = 2;
var GAME            = 3;
var INSTRUCTIONS    = 4;
var CREDITS         = 5;