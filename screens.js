/*
Walter Newsome ECE @ VT
wnewsome.com
    This file contains the main screens that go around the game state
*/

var x = 0;
var x2 = 0;
var y = 275*screenScale;
var drawIndex = 0;
var screenScale = 0;

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
            circle(drawAnimatedLogo[i].x*screenScale,drawAnimatedLogo[i].y*screenScale, 20*screenScale);
        }
        fill(255);
        stroke(255);
        // Drawing the 'pencil'
        circle(drawAnimatedLogo[drawIndex].x*screenScale,drawAnimatedLogo[drawIndex].y*screenScale, 5);
        line(drawAnimatedLogo[drawIndex].x*screenScale,drawAnimatedLogo[drawIndex].y*screenScale, drawAnimatedLogo[drawIndex].x*screenScale + 40,drawAnimatedLogo[drawIndex].y*screenScale +40 );
        drawIndex+=10;
        pop();
    } else {
        // Drawing finished, moving to next state
        Game.state++;
    }
    fill(255);
    textSize(20*screenScale);
    // Displaying my name 8)
    var name = "Walter Newsome @ VT";
    text(name, WIDTH/2-100*screenScale, HEIGHT/2+100*screenScale);
}

function draw_main_screen(){
    // Drawing the main menu screen

    // Draw the little horse next to the options
    y = 275*screenScale;
    if( mouseX>= 200*screenScale && mouseX<=410*screenScale && mouseY>= 275*screenScale && mouseY<=300*screenScale)
            y = 275*screenScale;
    if( mouseX>= 200*screenScale && mouseX<=345*screenScale && mouseY>= 320*screenScale && mouseY<=340*screenScale)
            y = 315*screenScale;
    if( mouseX>= 200*screenScale && mouseX<=295*screenScale && mouseY>= 360*screenScale && mouseY<=387*screenScale)
            y = 355*screenScale;
    if( mouseX>= 200*screenScale && mouseX<=295*screenScale && mouseY>= 400*screenScale && mouseY<=420*screenScale)
            y = 395*screenScale;

    // Move the main logo up
    if(x2>-100) x2-=2;

    push();
    background(0);

    image(img, 0, x2, height, width);
    if(x2<=-100){
        image(knightImg,WIDTH/2-130*screenScale,y,20*screenScale,30*screenScale);
    }
    fill(255, 255, 255, 80);
    rect(0, 0, width, height);
    fill(255);
    textSize(28*screenScale);
    var ybase = height/2;
    // Diplay options
    if(x2<=-100){
        text("Start New Game", WIDTH/2-100*screenScale, ybase);
        text("Instructions", WIDTH/2-100*screenScale, ybase+40*screenScale);
        text("Options", WIDTH/2-100*screenScale, ybase+80*screenScale);
        text("Credits", WIDTH/2-100*screenScale, ybase+120*screenScale);
    }

    pop();
}

function draw_options_screen(){
    push();
    background(0);

    image(img, 0, -100*screenScale, height, width);

    fill(255, 255, 255, 80);
    rect(0, 0, width, height);
    fill(255);
    var ybase = height/2;
    var xbase = -40*screenScale;
    textSize(20*screenScale);
    text("Board type:", xbase+WIDTH/2-100*screenScale, ybase);
    push();
    fill(252, 36, 3);
    stroke(0);
    square(xbase+WIDTH/2+15*screenScale+Game.color*60*screenScale, ybase+5*screenScale, 60*screenScale);
    square(xbase+WIDTH/2+15*screenScale+Game.level*60*screenScale-60*screenScale, ybase+95*screenScale, 60*screenScale);
    pop();
    push();
        // Board option one
        fill(181, 117, 62);
        square(xbase+WIDTH/2+20*screenScale, ybase+10*screenScale, 50*screenScale);
        fill(250, 198, 155);
        square(xbase+WIDTH/2+20*screenScale, ybase+10*screenScale, 25*screenScale);
        square(xbase+WIDTH/2+45*screenScale, ybase+35*screenScale, 25);
        pop();
    push();
        // Board option two
        fill(57,75,212);
        square(xbase+WIDTH/2+80*screenScale, ybase+10*screenScale, 50*screenScale);
        fill(142,154,245);
        square(xbase+WIDTH/2+80*screenScale, ybase+10*screenScale, 25*screenScale);
        square(xbase+WIDTH/2+105*screenScale, ybase+35*screenScale, 25*screenScale);
        pop();
    push();
        // Board option three
        fill(120);
        square(xbase+WIDTH/2+140*screenScale, ybase+10*screenScale, 50*screenScale);
        fill(255);
        square(xbase+WIDTH/2+140*screenScale, ybase+10*screenScale, 25*screenScale);
        square(xbase+WIDTH/2+165*screenScale, ybase+35*screenScale, 25*screenScale);
        pop();

    text("Game level:", xbase+WIDTH/2-100*screenScale, ybase+90*screenScale);
    square(xbase+WIDTH/2+20*screenScale, ybase+100*screenScale, 50*screenScale);
    square(xbase+WIDTH/2+80*screenScale, ybase+100*screenScale, 50*screenScale);
    square(xbase+WIDTH/2+140*screenScale, ybase+100*screenScale, 50*screenScale);
    fill(0);
    textSize(30*screenScale);
    text("1", xbase+WIDTH/2+35*screenScale, ybase+135*screenScale);
    text("2", xbase+WIDTH/2+95*screenScale, ybase+135*screenScale);
    text("3", xbase+WIDTH/2+155*screenScale, ybase+135*screenScale);
    textSize(25*screenScale);
    fill(255);
    text("DONE", WIDTH/2-30*screenScale, ybase+220*screenScale);

    pop();
}

function draw_instructions_screen(){
    // Display the instructions
    push();
    background(0);
    image(img, 0, -100, height, width);
    fill(255, 255, 255, 80);
    textSize(20*screenScale);
    rect(0, 0, width, height);
    fill(255);
    var ybase = height/2-50*screenScale;
    var xbase = width/2-260*screenScale;
    var circleBase = 283*screenScale;

    // Printing little demo every few seconds
    image(instructions[0], xbase, ybase, 250*screenScale,250*screenScale);
    if((frameCount-currFrameInt)%240 > 60){
        image(instructions[1], xbase, ybase, 250*screenScale,250*screenScale);
        circleBase+=60*screenScale;
    }
    if((frameCount-currFrameInt)%240 > 120){
        image(instructions[2], xbase, ybase, 250*screenScale,250*screenScale);
        circleBase+=60*screenScale;
    }
    if((frameCount-currFrameInt)%240 > 180){
        image(instructions[3], xbase, ybase, 250*screenScale,250*screenScale);
        circleBase+=40*screenScale;
    }
    ybase += 20;
    push();
    noFill();
    stroke(255,0,0);
    strokeWeight(3);
    circle(xbase + 281*screenScale, circleBase, 24*screenScale);
    pop();
    text("1  - Click on the piece you", xbase + 275*screenScale, ybase+20*screenScale);
    text("     wish to move.", xbase + 275*screenScale, ybase+40*screenScale);
    text("2  - All valid moves will be", xbase + 275*screenScale, ybase+80*screenScale);
    text("     displayed.", xbase + 275*screenScale, ybase+100*screenScale);
    text("3  - Click on the new position.", xbase + 275*screenScale, ybase+140*screenScale);
    text("4  - The computer will move", xbase + 275*screenScale, ybase+180*screenScale);
    text("     next.", xbase + 277*screenScale, ybase+200*screenScale);
    text("DONE", WIDTH/2-30*screenScale, ybase+300*screenScale);
    pop();
}

function draw_credits_screen(){
    // Display the credits
    push();
    background(0);
    image(img, 0, -100*screenScale, height, width);
    fill(255, 255, 255, 80);
    textSize(30*screenScale);
    rect(0, 0, width, height);
    fill(255);
    var ybase = height/2;
    var xbase = width/2;
    text("Walter Newsome", xbase-110*screenScale, ybase);
    textSize(20*screenScale);
    text("Virginia Tech", xbase-60*screenScale, ybase+=50*screenScale);
    text("waltern@vt.edu", xbase-70*screenScale, ybase+=30*screenScale);
    text("wnewsome.com", xbase-72*screenScale, ybase+=30*screenScale);
    text("DONE", WIDTH/2-30*screenScale, ybase+120*screenScale);
    pop();
}