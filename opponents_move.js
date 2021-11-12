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

            // Arrive
            BOARD[move[1]][move[0]] = Game.BlackPieces[random_piece].char;

            // Update this piece
            Game.BlackPieces[random_piece].i = move[0];
            Game.BlackPieces[random_piece].j = move[1];
            if(Game.BlackPieces[random_piece].name == "Pawn")
            Game.BlackPieces[random_piece].firstMove = false;
            if(inDebugMode)
                console.table(BOARD);

            // Check if opponent killed
            var opponent = get_index_by_ij(move[0],move[1], Game.WhitePieces);
            if(opponent > -1)
                Game.WhitePieces[opponent].active = false;

            // Update other pieces' allowed moves
            for(n = 0; n < Game.BlackPieces.length; n++ ){
                // Has to be done on all pieces because the new position of a piece may change other piece's valid moves
                Game.BlackPieces[n].moves = [];
                Game.BlackPieces[n].allowed_moves();
            }

            // Change turns
            Game.turn = WHITES_TURN;
            break;
        }

        // Force game stop
        computations++;
        if(computations >= 1000){
            computations = 0;
            print("Game over");
            break;
        }
    }
}