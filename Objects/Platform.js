class Platform {
	constructor(x, y, w, h) {
		// this.static = true;
		this.sprite = createSprite(x, y, w, h);
		// this.sprite.immovable = true;
		this.sprite.maxSpeed = 0;
		this.sprite.shapeColor = color(50, 125, 80);
	}
}