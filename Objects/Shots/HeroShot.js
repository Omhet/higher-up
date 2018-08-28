class HeroShot {
	constructor(x, y, rotation) {
		this.SHOT_SPEED = 10;
		this.sprite = createSprite(x, y, SHOT_SIZE, SHOT_SIZE);
		this.sprite.shapeColor = color(HERO_COLOR);
		this.sprite.setSpeed(this.SHOT_SPEED, rotation);
	}
}