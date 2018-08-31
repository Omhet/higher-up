class Collectible {
	constructor(x, y, size) {
		const classes = [
		'chest',
		'jump-higher', 
		'jump-lower', 
		'screen-rotate-180', 
		'screen-rotate-90', 
		'screen-rotate-270',
		'invisible',
		'size-up',
		'size-down',
		'heart',
		'immortal',
		];
		let randomClassIndex = floor(random(0, classes.length));
		let randomClass = classes[randomClassIndex];

		this.sprite = createSprite(x, y, size, size);

		if (randomClass === 'chest') {
			randomClassIndex = floor(random(1, classes.length));
			randomClass = classes[randomClassIndex];

			this.sprite.addImage(COLECT_IMG_MAP['chest']);

		} else {
			this.sprite.addImage(COLECT_IMG_MAP[randomClass]);
		}

		this.sprite.class = randomClass;

	}
}