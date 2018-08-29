class Enemy {
	constructor(x, y, size) {
		const randomClass = floor(random(1, 2));

		this.sprite = createSprite(x, y, size, size);
		switch (randomClass) {
			case 0:
				this.sprite.class = 'basic'
				break;
			case 1:
				this.sprite.class = 'shooting'
				break;
		}
		this.ENEMY_ANIM = this.sprite.addAnimation('idle', ANIMATION_ENEMY_BASIC);
		this.sprite.scale = 0.3;
	}
}