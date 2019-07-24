export default class App {
  	constructor( config ) {
		this.app = new PIXI.Application(
			config.width || window.innerWidth, 
			config.height || window.innerHeight, 
			config.renderer,
			config.rendererOptions
		);  
		
		document.body.appendChild( this.app.view );
			
		return this.app;
	}
}
