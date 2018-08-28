class Enemy {
	constructor(x, y, size) {
		this.sprite = createSprite(x, y, size, size);
		this.ENEMY_ANIM = this.sprite.addAnimation('idle', 'animations/enemy_basic_1/output-0.png', 'animations/enemy_basic_1/output-47.png');
		this.sprite.scale = 0.3;
		// this.sprite.debug = true;
	}
}