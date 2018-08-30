class Collectible {
	constructor(x, y, size) {
		const randomClass = floor(random(0, 2));

		this.sprite = createSprite(x, y, size, size);
		switch (randomClass) {
			case 0:
				this.sprite.class = 'jump-higher'
				this.sprite.shapeColor = color(0, 0, 151);
				break;
			case 1:
				this.sprite.class = 'jump-lower'
				this.sprite.shapeColor = color(0, 151, 51);
				break;
		}
		// this.ENEMY_ANIM = this.sprite.addAnimation('idle', ANIMATION_ENEMY_BASIC);
		// this.sprite.scale = 0.3;
	}
}