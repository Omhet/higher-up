function preload() {
	// Images
	HERO_IMG = loadImage('images/hero_1.png');
	HERO_SHOT_IMG = loadImage('images/orange_ink.png');

	ENEMY_BASIC_SHOT_IMG = loadImage('images/black_ink.png');

	PLATFORM_IMG = loadImage('images/platform_1.png');

	DISPLAY_FRAME_IMAGE = loadImage('images/water_back_3.png');
	BACK_IMAGE = loadImage('images/oil_back_1.png');
	GAME_OVER_IMAGE = loadImage('images/game_over.png');

	const collectImgNames = Object.keys(COLECT_IMG_MAP);
	collectImgNames.forEach(imgName => {
		COLECT_IMG_MAP[imgName] = loadImage(`images/collects/${imgName}.png`);
	});

	// Animations
	ANIMATION_ENEMY_BASIC = loadAnimation('animations/enemy_basic_1/output-0.png', 
		'animations/enemy_basic_1/output-47.png');
}