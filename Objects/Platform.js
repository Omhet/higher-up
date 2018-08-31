class Platform {
	constructor(x, y, w, h) {

		this.sprite = createSprite(x, y, w, h);

		const movable = floor(random(0, 2));
		if (movable === 1) {
			this.sprite.speed = floor(random(PLATFORM_MIN_SPEED, PLATFORM_MAX_SPEED));
			this.sprite.distance = floor(random(50, 200));
		} else {
			this.sprite.speed = 0;
			this.sprite.distance = 0;
		}

		this.sprite.isStatic = true;
		let curPlatformImage = createImage(w, h);
		curPlatformImage.copy(PLATFORM_IMG, 0, 0, PLATFORM_IMG.width, PLATFORM_IMG.height, 0, 0, w, h);
		this.sprite.addImage(curPlatformImage);
	}
}