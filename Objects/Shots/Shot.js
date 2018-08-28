class Shot {
	constructor(x, y, color) {
		this.sprite = createSprite(x, y, SHOT_SIZE, SHOT_SIZE);
		this.sprite.shapeColor = color(color);
	}
}