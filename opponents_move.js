/**
 * The opponents_move file contains the functions required to calculate the best opponent's move based on
 * the current board and the level of dificulty.
 *
 * The minimax algorithm as well as some helper functions are defined here.
 *
 * @Author Walter Newsome <waltern@vt.edu>
 * Last modified: 2021-11-23
 */

var computations = 0;

// This function will use AI to calculate the next best move according to the game level
function opponents_turn(){

    var AI = minimax(BOARD,0,false);

    if(!AI[1]){
        // No moves found: return
        Game.turn = WHITES_TURN;
        return;
    }
    var move = AI[2];

    // Print useful information to the screen
    if(verbose)
        print(AI[3]);

    var index = get_index_by_ij(AI[1][0], AI[1][1], Game.BlackPieces);
    // Leave
    BOARD[Game.BlackPieces[index].j][Game.BlackPieces[index].i] = ' ';
    Game.blackLeavingI = Game.BlackPieces[index].i;
    Game.blackLeavingJ = Game.BlackPieces[index].j;
    pieceLeaved = 255;

    // Arrive
    BOARD[move[1]][move[0]] = Game.BlackPieces[index].char;

    // Update this piece
    Game.BlackPieces[index].i = move[0];
    Game.BlackPieces[index].j = move[1];
    if(Game.BlackPieces[index].name == "Pawn")
        Game.BlackPieces[index].firstMove = false;

    // Check if pawn becomes queen
    if(Game.BlackPieces[index].name == "Pawn" && move[1] == 7)
        Game.BlackPieces[index] = new Queen (move[0], move[1], false, 'q', 3);

    Game.BlackPieces[index].initCoordinates = [Game.blackLeavingI*PIECE_SIZE,Game.blackLeavingJ*PIECE_SIZE];

    // Check if opponent killed
    var opponent = get_index_by_ij(move[0],move[1], Game.WhitePieces);
    if(opponent > -1) Game.WhitePieces[opponent].active = false;

    // Update all valid moves
    updateAllValidMoves();
    if(verbose)
        print("For this, the algorithm calculated " + computations + " diferent boards.");

    // Reset count
    computations = 0;

    // Move piece (animation)
    Game.turn = MOVING_PIECE;
    movingPieceIndex = index;
    movingWhite = false;

    // Check end of game conditionals
    if(inCheck(BOARD, true)){
        if(inCheckmate(BOARD, true)){
            Game.state = GAME_LOST;
            pieceWinId = Game.BlackPieces[index].id;
        }
    }
}

/*
    The heuristic function used by the minimax algorithm.
    This function uses the variable board to calculate an
    approximated rank/score of the board in which it fully
    depends on the amount and type of its existing pieces.
*/
function boardHeuristic(board){
    var score = 0;

    // Infinite values to checkmates
    if(inCheckmate(board, false)) score += 100000;
    if(inCheckmate(board, true )) score -= 100002;

    for (var i = 0; i< board.length; i++) {
        for (var j =0; j < board[i].length; j++) {
            switch (board[j][i]) {
                case 'r': score -= ROOK_VALUE;
                    break;
                case 'n': score -= KNIGHT_VALUE;
                    break;
                case 'b': score -= BISHOP_VALUE;
                    break;
                case 'q': score -= QUEEN_VALUE;
                    break;
                case 'k': score -= KING_VALUE;
                    break;
                case 'p': score -= PAWN_VALUE;
                    break;
                case 'R': score += ROOK_VALUE;
                    break;
                case 'N': score += KNIGHT_VALUE;
                    break;
                case 'B': score += BISHOP_VALUE;
                    break;
                case 'Q': score += QUEEN_VALUE;
                    break;
                case 'K': score += KING_VALUE;
                    break;
                case 'P': score += PAWN_VALUE;
                    break;
            }
        }
    }
    return score;
}

/*
    This minimax algorithm uses the predefined game level to explore derived
    boards based on the allowed moves of the existing pieces and their corresponding
    board value.

    It assumes the player (human) plays optimally and selects the best move possible.
    The amount of boards that are explored by this algorithm depends on the game level.
*/
function minimax(board, depth, isWhite){
    var result = boardHeuristic(board);
    if(depth == Game.level+1)
        return [result];

    if(isWhite){
        // For all moves get the one with highest score
        var bestScore = -100000;
        var allMoves = getAvailableMoves(board, true);
        for(var piece = 0; piece < allMoves.length; piece++){
            removeCheckMoves(allMoves[piece], board);
        }
        var pieceFrom;
        var pieceTo;
        // For each piece, create a new board based on each allowed move
        for(var piece = 0; piece < allMoves.length; piece++){
            for(var move = 0; move < allMoves[piece].moves.length; move++){
                computations++;
                var fromI = allMoves[piece].i;
                var fromJ = allMoves[piece].j;
                var toI = allMoves[piece].moves[move][0];
                var toJ = allMoves[piece].moves[move][1];

                // Update the temporary board
                tempBoard = boardDeepCopy(board);
                tempBoard[fromJ][fromI] = ' ';

                // Check if pawn becomes a queen
                if(toJ === 0 && allMoves[piece].char == 'P') allMoves[piece].char = 'Q';
                tempBoard[toJ][toI] = allMoves[piece].char;

                score = minimax(tempBoard, depth+1, false)[0];

                var isCheck = score == 100000? "(check)": score;

                if(score > bestScore){
                    //print(score)
                    bestScore = score;
                    pieceFrom = [allMoves[piece].i, allMoves[piece].j];
                    pieceTo = [allMoves[piece].moves[move][0], allMoves[piece].moves[move][1]];
                    bestMove = "Based on: White's best move is to move the "+allMoves[piece].name+" to ("+allMoves[piece].moves[move][0]+", "+allMoves[piece].moves[move][1]+") with a score of "+isCheck+",";
                    if(verbose){
                        console.clear();
                        print(bestMove);
                    }
                }
            }
        }
        // Best move for white for this given board found
        return [bestScore, pieceFrom, pieceTo];

    } else {
        // For all moves get the one with highest score
        var bestScore = Infinity;
        var bestMove = "None";
        var allMoves = getAvailableMoves(board, false);
        for(var piece = 0; piece < allMoves.length; piece++){
            removeCheckMoves(allMoves[piece], board);
        }
        var pieceFrom;
        var pieceTo;

        // For each piece, create a new board based on each allowed move
        for(var piece = 0; piece < allMoves.length; piece++){
            for(var move = 0; move < allMoves[piece].moves.length; move++){
                computations++;
                var fromI = allMoves[piece].i;
                var fromJ = allMoves[piece].j;
                var toI = allMoves[piece].moves[move][0];
                var toJ = allMoves[piece].moves[move][1];

                tempBoard = boardDeepCopy(board);
                tempBoard[fromJ][fromI] = ' ';

                // Check if pawn becomes a queen
                if(toJ == 7 && allMoves[piece].char == 'p') allMoves[piece].char = 'q';

                tempBoard[toJ][toI] = allMoves[piece].char;
                // Recursivly get the score of the derived board
                score = minimax(tempBoard, depth+1, true)[0];
                if(score < bestScore){
                    bestScore = score;
                    pieceFrom = [allMoves[piece].i, allMoves[piece].j];
                    pieceTo = [allMoves[piece].moves[move][0], allMoves[piece].moves[move][1]];
                    bestMove = "the, algorithm decided to move its "+allMoves[piece].name+" to ("+allMoves[piece].moves[move][0]+", "+allMoves[piece].moves[move][1]+") with a score of "+score+" (less is better)";
                }
            }
        }
        // Best move for black found
        return [bestScore, pieceFrom, pieceTo, bestMove];
    }
}

function getAvailableMoves(board, isWhite){
    // For a given board, return a list of all the pieces, including their allowed moves
    var pieces = [];
    if(isWhite){
        for (var i = 0; i< board.length; i++) {
            for (var j =0; j < board[i].length; j++) {
                switch (board[i][j]) {
                    case 'R': pieces.push(new Rook    (j, i, true, 'R', 6, AI, board));
                        break;
                    case 'N': pieces.push(new Knight  (j, i, true, 'N', 7, AI, board));
                        break;
                    case 'B': pieces.push(new Bishop  (j, i, true, 'B', 8, AI, board));
                        break;
                    case 'Q': pieces.push(new Queen   (j, i, true, 'Q', 9, AI, board));
                        break;
                    case 'K': pieces.push(new King    (j, i, true, 'K', 10, AI, board));
                        break;
                    case 'P': pieces.push(new Pawn    (j, i, true, 'P', 11, AI, board));
                        break;
                }
            }
        }
    } else {
        for (var i = 0; i< board.length; i++) {
            for (var j =0; j < board[i].length; j++) {
                switch (board[i][j]) {
                    case 'r': pieces.push(new Rook    (j, i, false, 'r', 6, AI, board));
                        break;
                    case 'n': pieces.push(new Knight  (j, i, false, 'n', 7, AI, board));
                        break;
                    case 'b': pieces.push(new Bishop  (j, i, false, 'b', 8, AI, board));
                        break;
                    case 'q': pieces.push(new Queen   (j, i, false, 'q', 9, AI, board));
                        break;
                    case 'k': pieces.push(new King    (j, i, false, 'k', 10, AI, board));
                        break;
                    case 'p': pieces.push(new Pawn    (j, i, false, 'p', 11, AI, board));
                        break;
                }
            }
        }
    }

    return pieces;
}

function inCheck(board, white){

    /*
        Returns true if the is at least one valid move that will land in the oppponent's King location.
    */

    // Initial values
    var king = false;
    var kingChar = white? 'K': 'k';

    // Obtain king's location
    for (var i = 0; i< board.length; i++) {
        for (var j =0; j < board[i].length; j++) {
            if(board[j][i] == kingChar){
                king = [i,j];
            }

        }
    }

    // if king found, check all valid moves
    if(king){
        var pieces = [];
        var pieces = getAvailableMoves(board, !white);
        // Check if any move lands on the king
        for(var piece = 0; piece < pieces.length; piece++){
            for(var moves = 0; moves < pieces[piece].moves.length; moves++){
                if( pieces[piece].moves[moves][0] == king[0] &&
                    pieces[piece].moves[moves][1] == king[1]){
                        return true;
                }
            }
        }
    }
    return false;
}

function inCheckmate(board, white){
    /*
        Returns true if the oppponent's King is in checkmate
        Meaning that the opponent is in check state and there's no
        other valid move from the opponent that can revert this.
    */

    if(inCheck(board, white)){
        pieces = getAvailableMoves(board, white);
        for(var piece = 0; piece < pieces.length; piece++){
            for(var move = 0; move < pieces[piece].moves.length; move++){

                var boardAfterMove = new Array(8);
                for (var i = 0; i < 8; i++) {
                    boardAfterMove[i] = new Array(8);
                    // Load existing game
                    for (var j = 0; j < 8; j++) {
                        boardAfterMove[i][j] = board[i][j];
                    }
                }
                currentPiece = pieces[piece];
                currentMove = currentPiece.moves[move];

                boardAfterMove[currentPiece.j][currentPiece.i] = ' ';
                boardAfterMove[currentMove[1]][currentMove[0]] = currentPiece.char;

                if(!inCheck(boardAfterMove, white))
                    return false;
            }
        }
    } else {
        return false;
    }

    //print("Checkmate!");
    return true;
}

function numberOfMoves(board, white){
    /*
    Return the number of moves available of a given board
    */
    var count = 0;
    var pieces = getAvailableMoves(board, white);
    for(var piece = 0; piece < pieces.length; piece++){
        var thisPiece = pieces[piece];
        var allMoves = removeCheckMoves(thisPiece, board);
        for(var move = 0; move < allMoves.length; move++){
            count++;
        }
    }
    return count;
}