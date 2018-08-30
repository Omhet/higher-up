class Collectible {
	constructor(x, y, size) {
		const randomClass = floor(random(0, 2));

		this.sprite = createSprite(x, y, size, size);
		switch (randomClass) {
			case 0:
				this.sprite.class = 'jump-higher'
				this.sprite.addImage(COLLECT_IMG_JUMP_HIGHER);
				break;
			case 1:
				this.sprite.class = 'jump-lower'
				this.sprite.addImage(COLLECT_IMG_JUMP_LOWER);
				break;
		}
		// this.sprite.scale = 0.3;
	}
}