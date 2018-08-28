class Enemy {
	constructor(x, y, size) {
		this.sprite = createSprite(x, y, size, size);
		this.ENEMY_ANIM = this.sprite.addAnimation('idle', ANIMATION_ENEMY_BASIC);
		this.sprite.scale = 0.3;
		// this.sprite.debug = true;
	}
}