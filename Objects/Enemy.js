class Enemy {
	constructor(x, y, size) {
		this.static = false;
		this.sprite = createSprite(x, y, size, size);
		// this.sprite.shapeColor = color(50, 125, 125);
	}
}