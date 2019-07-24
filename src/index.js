import App from './app';
import Config  from './config';

const { Tween } = require("es6-tween");

const GAME = new App( Config );

GAME.start();

let container = new PIXI.Graphics();
    container.beginFill( 0xffffff);
    container.drawRect( 0, 0, 960, 960 );
    container.endFill();

let positions = [
    { x: 0, y: 100 },
    { x: 222, y: 666 },
    { x: 444, y: 444 },
    { x: 666, y: 222 }
];

let jumper = new PIXI.Graphics();
    jumper.beginFill( 0x000000 );
    jumper.drawRect( positions[0].x, positions[0].x, 100, 100 );
    jumper.endFill();

let gr1 = new PIXI.Graphics();
    gr1.beginFill( 0x001122 );
    gr1.drawRect( positions[1].x, positions[1].y, 100, 100 );
    gr1.endFill();

let gr2 = new PIXI.Graphics();
    gr2.beginFill( 0x333333);
    gr2.drawRect( positions[2].x, positions[2].y, 100, 100 );
    gr2.endFill();

let gr3 = new PIXI.Graphics();
    gr3.beginFill( 0x445566 );
    gr3.drawRect( positions[3].x, positions[3].y, 100, 100 );
    gr3.endFill();

let counter = 1;

let textBtn = new PIXI.Text("BUTTON", {fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    textBtn.position.set( 450, 900 );
    textBtn.interactive = true;
    textBtn.buttonMode = true;
    textBtn.on("pointertap", () => {
        if ( counter == positions.length ) counter = 0;
        Animate( new Tween( jumper.position )
            .to({ x: positions[counter].x, y: positions[counter].y - jumper.height}, 500)
            .on("start", () => {
                textBtn.interactive = false;
                textBtn.buttonMode = false;
            })
            .on("complete", () => {
                counter++;
                textBtn.interactive = true;
                textBtn.buttonMode = true;
            })
            .start(),
        500 );
    });

container.addChild( gr1, gr2, gr3, jumper, textBtn );

let Animate = ( tween, ms = 0 ) => {
    let startTime = 0;
    let endTime = 0;

     ms == 0 ? endTime = 1 : endTime = ms / 6;

     (function animate() {
         if( startTime >= endTime ) return;

         requestAnimationFrame( animate );
         tween.update();

         if( ms > 0 ) startTime++;
     })();
}

GAME.stage.addChild( container );