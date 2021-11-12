/*
Walter Newsome ECE @ VT
wnewsome.com
    This file contains the main screens that go around the game state
*/

var x = 0;
var x2 = 0;
var y = 275;
var drawIndex = 0;

function draw_splash_screen(){
    // The splash screen will draw the game's logo for a few seconds
    textSize(20);
    if(drawIndex < drawAnimatedLogo.length){
        // incrementing drawIndex
        image(img, 0,0, height, width);
        push();

        fill(0);
        noStroke();
        for(var i = 0; i < drawAnimatedLogo.length ; i++){
            // Drawing all circles stored in drawAnimatedLogo up to current index (hugh complexity)
            if(i>drawIndex)
            circle(drawAnimatedLogo[i].x,drawAnimatedLogo[i].y, 20);
        }
        fill(255);
        stroke(255);
        // Drawing the 'pencil'
        circle(drawAnimatedLogo[drawIndex].x,drawAnimatedLogo[drawIndex].y, 5)
        line(drawAnimatedLogo[drawIndex].x,drawAnimatedLogo[drawIndex].y, drawAnimatedLogo[drawIndex].x + 40,drawAnimatedLogo[drawIndex].y +40 );
        drawIndex+=10;
        pop();
    } else {
        // Drawing finished, moving to next state
        Game.state++;
    }
    fill(255);
    textSize(20);
    // Displaying my name 8)
    var name = "Walter Newsome @ VT";
    text(name, WIDTH/2-100, HEIGHT/2+100);
}

function draw_main_screen(){
    // Drawing the main menu screen

    // Draw the little horse next to the options
    if( mouseX>= 200 && mouseX<=410 && mouseY>= 275 && mouseY<=300)
            y = 275;
    if( mouseX>= 200 && mouseX<=345 && mouseY>= 320 && mouseY<=340)
            y = 315;
    if( mouseX>= 200 && mouseX<=295 && mouseY>= 360 && mouseY<=387)
            y = 355;
    if( mouseX>= 200 && mouseX<=295 && mouseY>= 400 && mouseY<=420)
            y = 395;

    // Move the main logo up
    if(x2>-100) x2-=2;

    push();
    background(0);

    image(img, 0, x2, height, width);
    if(x2<=-100){
        image(knightImg,WIDTH/2-100-30,y,20,30);
    }
    fill(255, 255, 255, 80);
    rect(0, 0, width, height);
    fill(255);
    textSize(28);
    var ybase = height/2;
    // Diplay options
    if(x2<=-100){
        text("Start New Game", WIDTH/2-100, ybase);
        text("Instructions", WIDTH/2-100, ybase+40);
        text("Options", WIDTH/2-100, ybase+80);
        text("Credits", WIDTH/2-100, ybase+120);
    }

    pop();
}

function draw_options_screen(){
    push();
    background(0);

    image(img, 0, -100, height, width);

    fill(255, 255, 255, 80);
    rect(0, 0, width, height);
    fill(255);
    textSize(28);
    var ybase = height/2;
    var xbase = -40;
    textSize(20);
    text("Board type:", xbase+WIDTH/2-100, ybase);
    push();
    fill(252, 36, 3);
    stroke(0);
    square(xbase+WIDTH/2+20-5+Game.color*60, ybase+10-5, 60);
    square(xbase+WIDTH/2+20-5+Game.level*60-60, ybase+100-5, 60);
    pop();
    push();
        // Board option one
        fill(181, 117, 62);
        square(xbase+WIDTH/2+20, ybase+10, 50);
        fill(250, 198, 155);
        square(xbase+WIDTH/2+20, ybase+10, 25);
        square(xbase+WIDTH/2+20+25, ybase+10+25, 25);
        pop();
    push();
        // Board option two
        fill(57,75,212);
        square(xbase+WIDTH/2+80, ybase+10, 50);
        fill(142,154,245);
        square(xbase+WIDTH/2+80, ybase+10, 25);
        square(xbase+WIDTH/2+80+25, ybase+10+25, 25);
        pop();
    push()
        // Board option three
        fill(120);
        square(xbase+WIDTH/2+140, ybase+10, 50);
        fill(255);
        square(xbase+WIDTH/2+140, ybase+10, 25);
        square(xbase+WIDTH/2+140+25, ybase+10+25, 25);
        pop();

    text("Game level:", xbase+WIDTH/2-100, ybase+90);
    square(xbase+WIDTH/2+20, ybase+100, 50);
    square(xbase+WIDTH/2+80, ybase+100, 50);
    square(xbase+WIDTH/2+140, ybase+100, 50);
    fill(0);
    textSize(30);
    text("1", xbase+WIDTH/2+20+15, ybase+100+35);
    text("2", xbase+WIDTH/2+80+15, ybase+100+35);
    text("3", xbase+WIDTH/2+140+15, ybase+100+35);
    textSize(25);
    fill(255);
    text("DONE", WIDTH/2-30, ybase+220);

    pop();
}

function draw_instructions_screen(){
    // Display the instructions
    push();
    background(0);
    image(img, 0, -100, height, width);
    fill(255, 255, 255, 80);
    textSize(20);
    rect(0, 0, width, height);
    fill(255);
    var ybase = height/2-50;
    var xbase = width/2-260;

    // Printing little demo every few seconds
    image(instructions[0], xbase, ybase, 250,250);
    if((frameCount-currFrameInt)%240 > 60){
        image(instructions[1], xbase, ybase, 250,250);
    }
    if((frameCount-currFrameInt)%240 > 120){
        image(instructions[2], xbase, ybase, 250,250);
    }
    if((frameCount-currFrameInt)%240 > 180){
        image(instructions[3], xbase, ybase, 250,250);
    }
    ybase += 20;
    text("1 - Click on the piece you", xbase + 275, ybase+20);
    text("     wish to move.", xbase + 275, ybase+40);
    text("2 - All valid moves will be", xbase + 275, ybase+70+10);
    text("     displayed.", xbase + 275, ybase+90+10);
    text("3 - Click on the new position.", xbase + 275, ybase+120+20);
    text("4 - The computer will move", xbase + 275, ybase+150+30);
    text("     next.", xbase + 277, ybase+170+30);
    text("DONE", WIDTH/2-30, ybase+300);
    pop();
}

function draw_credits_screen(){
    // Display the credits
    push();
    background(0);
    image(img, 0, -100, height, width);
    fill(255, 255, 255, 80);
    textSize(30);
    rect(0, 0, width, height);
    fill(255);
    var ybase = height/2;
    var xbase = width/2;
    text("Walter Newsome", xbase-110, ybase);
    textSize(20);
    text("Virginia Tech", xbase-60, ybase+=50);
    text("waltern@vt.edu", xbase-70, ybase+=30);
    text("wnewsome.com", xbase-72, ybase+=30);
    text("DONE", WIDTH/2-30, ybase+120);
    pop();
}