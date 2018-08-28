class HeroShot {
	constructor(x, y, speed, rotation) {
		const MAX_SPEED = 17;
		this.sprite = createSprite(x, y, SHOT_SIZE, SHOT_SIZE);
		this.sprite.shapeColor = color(HERO_COLOR);
		speed =  (speed > MAX_SPEED) ? MAX_SPEED : speed;
		this.sprite.setSpeed(speed, rotation);
	}
}