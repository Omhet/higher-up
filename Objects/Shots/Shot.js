class Shot {
	constructor(x, y, speed, rotation, myColor) {
		this.sprite = createSprite(x, y, SHOT_SIZE, SHOT_SIZE);
		this.sprite.shapeColor = color(myColor);
		speed = (speed > SHOT_HERO_MAX_SPEED) ? SHOT_HERO_MAX_SPEED : speed;
		this.sprite.setSpeed(speed, rotation);
	}
}