
// Setup Functions
function setupDisplayFrame() {
	displayFrame = createSprite(HALF_W, HALF_H, DISPLAY_W, DISPLAY_H);
	displayFrame.addImage(DISPLAY_FRAME_IMAGE);
	displaySpeed = DISPLAY_MIN_SPEED;
}

function platformsSetup() {
	platforms = new Group();

	const basePlatform = new Platform(HALF_W, HALF_H, 200, 20);
	platforms.add(basePlatform.sprite);
}

function enemiesSetup() {
	enemies = new Group();
}

function shotsSetup() {
	shots = new Group();
}

function heroSetup() {
	hero.curShotsNum = HERO_MAX_SHOTS_NUM;
	hero.shots = new Group();

	hero.curHP = HERO_START_HP;

	hero.speed = HERO_SPEED;
	hero.debugSpeed = HERO_SPEED * 2;

	hero.immortal = false;

	hero.jumpForce = HERO_JUMP_FORCE;

	hero.sprite = createSprite(HALF_W, HALF_H - HERO_SIZE, HERO_SIZE, HERO_SIZE);
	hero.sprite.scale = HERO_SCALE;

	hero.sprite.addImage(HERO_IMG);


	hero.sprite.isHero = true;
}

function localStorageSetup() {
	let localHero = {};
	
	if (!localStorage['hero']) {
		localHero.maxHeight = 0;
		const serialLocalHero = JSON.stringify(localHero);
		localStorage.setItem('hero', serialLocalHero);
	} else {
		localHero = JSON.parse(localStorage.getItem('hero'));
		maxHeight = localHero.maxHeight;
	}
}

function guiSetup() {
	maxHeightScoreEl = document.getElementById('max-height-score');
	curShotsNumEl = document.getElementById('cur-shots-num');
	collectEffectDurationEl = document.getElementById('collect-effect-duration');
	guiEl = document.getElementById('gui');
}

function backImageSetup() {
}

function imagesSetup() {
	BACK_IMAGE_HALF_H = BACK_IMAGE.height / 2;

	DISPLAY_FRAME_IMAGE.resize(DISPLAY_W, DISPLAY_H);

	HERO_IMG.resize(HERO_SIZE, HERO_SIZE);
	HERO_SHOT_IMG.resize(SHOT_SIZE, SHOT_SIZE);

	ENEMY_BASIC_SHOT_IMG.resize(SHOT_SIZE, SHOT_SIZE);

	const collectImgNames = Object.keys(COLECT_IMG_MAP);
	collectImgNames.forEach(imgName => {
		COLECT_IMG_MAP[imgName].resize(COLLECT_SIZE, COLLECT_SIZE);
	});
}

function collectSetup() {
	collectibles = new Group();
}

function setup() {
	createCanvas(W, H);

	// Debug Setup
	if (DEBUG_MODE) {
		G = 0;
		DISPLAY_SPEED = 0;
	}

	imagesSetup();

	// Objects Setup
	setupDisplayFrame();
	heroSetup();
	platformsSetup();
	enemiesSetup();
	shotsSetup();
	collectSetup();

	// Tech Setup
	camera.zoom = CAMERA_ZOOM;
	
	backImageSetup();

	localStorageSetup();
	guiSetup();
}
