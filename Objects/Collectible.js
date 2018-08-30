class Collectible {
	constructor(x, y, size) {
		const classes = [
		'jump-higher', 
		'jump-lower', 
		'screen-rotate-180', 
		'screen-rotate-90', 
		'screen-rotate-270'
		];
		const randomClassIndex = floor(random(0, classes.length));

		this.sprite = createSprite(x, y, size, size);
		this.sprite.class = classes[randomClassIndex];

		this.sprite.addImage(COLECT_IMG_MAP[this.sprite.class]);
	}
}