createjs.Stage.prototype.enableDrag = function(...objs) {
	var stage = this;
	for (var obj of objs) {
		if (!obj) continue;
		obj.on("mousedown", function(evt) {
			this.offsetX = evt.stageX - this.x;
			this.offsetY = evt.stageY - this.y;
		});
		obj.on("pressmove", function(evt) {
			// target 是事件的冒泡的起点元素，currentTarget 是当前冒泡到的元素，也是当前作用域中的 this
			this.x = evt.stageX - this.offsetX;
			this.y = evt.stageY - this.offsetY;
			// target 若有需要在拖拽时进行的操作则执行
			this.dragBinding && this.dragBinding();
			stage.update();
			// 停止冒泡，让该事件只触发一次，不会即触发子元素的移动又触发父元素的移动
			evt.stopPropagation();
		});
	}
}
