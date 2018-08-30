class Shot {
	constructor(x, y, speed, rotation, myImage) {
		this.sprite = createSprite(x, y, SHOT_SIZE, SHOT_SIZE);
		this.sprite.addImage(myImage);
		speed = (speed > SHOT_HERO_MAX_SPEED) ? SHOT_HERO_MAX_SPEED : speed;
		this.sprite.setSpeed(speed, rotation);
	}
}