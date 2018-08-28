class HeroShot {
	constructor(x, y) {
		this.sprite = createSprite(x, y, SHOT_SIZE, SHOT_SIZE);
		this.sprite.shapeColor = color(HERO_COLOR);
	}
}