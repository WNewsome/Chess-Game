/*
Walter Newsome ECE @ VT
wnewsome.com
    This file contains all the functions related to the algorithm that computes the next best move
*/

var computations = 0;

function opponents_turn(){
    // This function will use AI to calculate the next best move according to the game level
    // TODO: Implement minimax algorithm
    while(true){
        var random_piece = floor(random(0, Game.BlackPieces.length));

        if(Game.BlackPieces[random_piece].active && Game.BlackPieces[random_piece].moves.length > 0){
            var random_move = floor(random(0, Game.BlackPieces[random_piece].moves.length));
            var move = Game.BlackPieces[random_piece].moves[random_move];

            // Leave
            BOARD[Game.BlackPieces[random_piece].j][Game.BlackPieces[random_piece].i] = ' ';
            Game.blackLeavingI = Game.BlackPieces[random_piece].i;
            Game.blackLeavingJ = Game.BlackPieces[random_piece].j;
            // Arrive
            BOARD[move[1]][move[0]] = Game.BlackPieces[random_piece].char;

            // Update this piece
            Game.BlackPieces[random_piece].i = move[0];
            Game.BlackPieces[random_piece].j = move[1];
            if(Game.BlackPieces[random_piece].name == "Pawn")
                Game.BlackPieces[random_piece].firstMove = false;

            // Check if pawn become queen
            if(Game.BlackPieces[random_piece].name == "Pawn" && move[1] == 7){
                // Pawn becomes queen!
                print("queen");
                Game.BlackPieces[random_piece] = new Queen (move[0], move[1], false, 'q', 3);
            }

            if(inDebugMode)
                console.table(BOARD);

            // Check if opponent killed
            var opponent = get_index_by_ij(move[0],move[1], Game.WhitePieces);
            if(opponent > -1)
                Game.WhitePieces[opponent].active = false;

            // Update all valid moves
            updateAllValidMoved();

            // Change turns
            Game.turn = WHITES_TURN;
            break;
        }

        // Force game stop
        computations++;
        if(computations > 1000){
            print("Game over: blacks cant move anymore");
            break;
        }
    }
}