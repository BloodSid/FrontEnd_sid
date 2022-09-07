function init() {
	document.body.innerHTML += "<br/>" + "Hi! " + (!!createjs ? "createJS is available." : "creagteJS is NOT available.");
	
	var stage = new createjs.Stage("canvas");
	// For mobile devices.
	createjs.Touch.enable(stage);
	
	// this lets our drag continue to track the mouse even when it leaves the canvas:
	// play with commenting this out to see the difference.
	stage.mouseMoveOutside = true; 
	
	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	
	var label = new createjs.Text("拖拽", "24px 思源宋体", "#FFFFFF");
	label.textAlign = "center";
	label.y = -10;
	
	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.addChild(circle, label);
	stage.addChild(dragger);
	dragger.on("mousedown", function(evt) {
		var target = evt.currentTarget;
		target.offsetX = evt.stageX - target.x;
		target.offsetY = evt.stageY - target.y;
		
	});
	dragger.on("pressmove",function(evt) {
		var target = evt.currentTarget;
		// currentTarget will be the container that the event listener was added to:
		target.x = evt.stageX - target.offsetX;
		target.y = evt.stageY - target.offsetY;
		// make sure to redraw the stage to show the change:
		stage.update();   
	});
	
	stage.update();
	
}