
// Setup Functions
function setupDisplayFrame() {
	displayFrame = createSprite(HALF_W, HALF_H, W / CAMERA_ZOOM, (H / CAMERA_ZOOM) * 1.5);
	DISPLAY_FRAME_IMAGE.resize(displayFrame.width, displayFrame.height);
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

	hero.speed = HERO_SPEED;
	hero.debugSpeed = HERO_SPEED * 2;

	hero.jumpForce = HERO_JUMP_FORCE;

	hero.sprite = createSprite(HALF_W, HALF_H - HERO_SIZE, HERO_SIZE, HERO_SIZE);
	hero.sprite.scale = 1.3;

	HERO_IMG.resize(HERO_SIZE, HERO_SIZE);
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
	
	BACK_IMAGE_HALF_H = BACK_IMAGE.height / 2;
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
