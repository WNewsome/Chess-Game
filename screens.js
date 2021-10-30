var x = 0;
var x2 = 0;
var y = 275;

function draw_splash_screen(){
    if(frameCount > 60*4)
        Game.state = MAIN_MENU;
    push();
    image(img, 0,0, height, width);
    fill(255);
    textSize(20);
    var name = "Walter Newsome @ VT";
    text(name, WIDTH/2-100, HEIGHT/2+100);
    fill(0);
    square(width/2+x,0,width);
    square(-width/2-x,0,width);
    x+=3;
    pop();
}

function draw_main_screen(){

    if( mouseX>= 200 && mouseX<=410 &&
        mouseY>= 275 && mouseY<=300){
            y = 275;
        }
    if( mouseX>= 200 && mouseX<=345 &&
        mouseY>= 320 && mouseY<=340){
            y = 315;
        }
    if( mouseX>= 200 && mouseX<=295 &&
        mouseY>= 360 && mouseY<=387){
            y = 355;
        }
    if( mouseX>= 200 && mouseX<=295 &&
        mouseY>= 400 && mouseY<=420){
            y = 395;
        }
    if(x2>-100)
        x2-=2;
    push();
    background(0);

    image(img, 0, x2, height, width);
    if(x2<=-100){
        image(knightImg,WIDTH/2-100-30,y,20,30)
    }
    fill(255, 255, 255, 80);
    rect(0, 0, width, height);
    fill(255);
    textSize(28);
    var ybase = height/2;
    if(x2<=-100){
        text("Start New Game", WIDTH/2-100, ybase);
        text("Instructions", WIDTH/2-100, ybase+40);
        text("Options", WIDTH/2-100, ybase+80);
        text("Credits", WIDTH/2-100, ybase+120);
        fill(0)
        //image(knightImg,WIDTH/2-100-25,y+5,20,30)
    }

    pop();
}