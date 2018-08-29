class Platform {
	constructor(x, y, w, h) {
		this.sprite = createSprite(x, y, w, h);
		this.sprite.maxSpeed = 0;
		let curPlatformImage = createImage(w, h);
		curPlatformImage.copy(PLATFORM_IMG, 0, 0, PLATFORM_IMG.width, PLATFORM_IMG.height, 0, 0, w, h);
		this.sprite.addImage(curPlatformImage);
	}
}