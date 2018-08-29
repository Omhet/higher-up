// GUI
let maxHeightScoreEl;
let curShotsNumEl;
let guiEl;


// Constants for game
W = 800;
H = 600;
HALF_W = W / 2;
HALF_H = H / 2;

DISPLAY_SPEED = -0.9;

CAMERA_ZOOM = 0.5;

DEBUG_MODE = true;

// Constants for objects
G = 0.2;
SPRITE_VELOCITY_Y_MAX = 7;

// Hero
HERO_SPEED = 5;
HERO_SIZE = 50;
HERO_JUMP_FORCE = -10;
HERO_COLOR = 'rgb(222, 125, 20)';
HERO_MAX_SHOTS_NUM = 5;

// Platforms
PLATFORM_MIN_SIZE = 50;
PLATFORM_MAX_SIZE = 300;
PLATFORM_START_NUM = 10;
PLATFORM_MAX_NUM = 100;

// Enemies
ENEMY_MAX_NUM = 10;
ENEMY_SIZE = HERO_SIZE;

// Images
HERO_IMG = {};
DISPLAY_FRAME_IMAGE = {};

// Animations
ANIMATION_ENEMY_BASIC = {};

// Shots
SHOT_SIZE = 20;
SHOT_HERO_MAX_SPEED = 17;

// Globals
let displayFrame = {};

let platforms = {};
let enemies = {};

const grid = [];

let height = 0;
let maxHeight = 0;

let gameOver = false;

// Create Hero
const hero = {};


function preload() {
	HERO_IMG = loadImage('images/hero_1.png');
	DISPLAY_FRAME_IMAGE = loadImage('images/waves.png');
	ANIMATION_ENEMY_BASIC = loadAnimation('animations/enemy_basic_1/output-0.png', 
		'animations/enemy_basic_1/output-47.png');
}

// Setup Functions
function setupDisplayFrame() {
	displayFrame = createSprite(HALF_W, HALF_H, W / CAMERA_ZOOM, H / CAMERA_ZOOM);
	DISPLAY_FRAME_IMAGE.resize(displayFrame.width, displayFrame.height);
	// displayFrame.addImage(DISPLAY_FRAME_IMAGE);
	displayFrame.shapeColor = color('rgba(210, 255, 255, 0.9)');
}

function platformsSpawn(n) {
	const min_X = (displayFrame.position.x - displayFrame.width / 2) - displayFrame.width * 3;
	const max_X = (displayFrame.position.x + displayFrame.width / 2) + displayFrame.width * 3;
	const min_Y = (displayFrame.position.y - displayFrame.height / 2) - displayFrame.height;
	const max_Y = hero.sprite.position.y - hero.sprite.height / 4;

	for (let i = 0; i < n; i++) {
		let x = round(random(min_X, max_X));
		let y = round(random(min_Y, max_Y));

		x -= x % HERO_SIZE;
		y -= y % (HERO_SIZE * 2);


		let w = round(random(HERO_SIZE, HERO_SIZE * 4));
		w -= w % HERO_SIZE;
		const h = 20;

		let newPlatform = new Platform(x, y, w, h);

		while (newPlatform.sprite.overlap(platforms)) {
			newPlatform.sprite.remove();
			x = round(random(min_X, max_X));
			y = round(random(min_Y, max_Y));
			x -= x % HERO_SIZE;
			y -= y % (HERO_SIZE * 2);
			newPlatform = new Platform(x, y, w, h);
		}

		platforms.add(newPlatform.sprite);
	}
}

function platformsSetup() {
	platforms = new Group();

	const basePlatform = new Platform(HALF_W, HALF_H, 200, 20);
	platforms.add(basePlatform.sprite);
}

function enemiesSpawn(n) {
	for (let i = 0; i < n; i++) {
		let randIndex = round(random(1, platforms.length - 1));
		let choosenPlatform = platforms[randIndex];
		let x = choosenPlatform.position.x;
		let y = choosenPlatform.position.y - ENEMY_SIZE;
		let en = new Enemy(x, y, ENEMY_SIZE);
		while (en.sprite.overlap(enemies) || en.sprite.overlap(displayFrame)) {
			en.sprite.remove();
			randIndex = round(random(1, platforms.length - 1));
			choosenPlatform = platforms[randIndex];
			x = choosenPlatform.position.x;
			y = choosenPlatform.position.y - ENEMY_SIZE;
			en = new Enemy(x, y, ENEMY_SIZE);
		}
		enemies.add(en.sprite);
	}
}

function enemiesSetup() {
	enemies = new Group();
}

function heroSetup() {
	hero.curShotsNum = HERO_MAX_SHOTS_NUM;
	hero.shots = new Group();

	hero.speed = HERO_SPEED;
	hero.debugSpeed = HERO_SPEED * 2;

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
	guiEl = document.getElementById('gui');
}

function setup() {

	if (DEBUG_MODE) {
		G = 0;
		DISPLAY_SPEED = 0;
	}

	createCanvas(W, H);

	setupDisplayFrame();

	heroSetup();

	platformsSetup();

	enemiesSetup();

	camera.zoom = CAMERA_ZOOM;

	localStorageSetup();

	guiSetup();
}

function gravity() {
	allSprites.forEach(sp => {
		sp.addSpeed(G, 90);
		sp.velocity.y = (sp.velocity.y > SPRITE_VELOCITY_Y_MAX) 
		? SPRITE_VELOCITY_Y_MAX 
		: sp.velocity.y;
	});
}


/*
 *Hero functions
*
*/

function heroMove() {
	const hsp = hero.sprite;


	// Key Controls

	if (DEBUG_MODE) {

		if (keyDown('a')) {
			hsp.position.x -= hero.debugSpeed;
		}

		if (keyDown('d')) {
			hsp.position.x += hero.debugSpeed;
		}

		if (keyDown('w')) {
			hsp.position.y -= hero.debugSpeed;
		}

		if (keyDown('s')) {
			hsp.position.y += hero.debugSpeed;
		}

	} else {

		if (keyDown('a')) {
			hsp.position.x -= hero.speed;
		}

		if (keyDown('d')) {
			hsp.position.x += hero.speed;
		}

		if (hero.sprite.overlap(platforms)) {
			hero.jumpNum = 2;
		}

		if (hero.jumpNum > 0) {
			if (keyWentDown('space')) {
				hsp.velocity.y = HERO_JUMP_FORCE;
			}
		}

		if (keyWentUp('space')) {
			hero.jumpNum--;
			hero.jumpNum = (hero.jumpNum < 0) ? 0 : hero.jumpNum;
			hsp.velocity.y = SPRITE_VELOCITY_Y_MAX;
		}
	}
}

function heroCollidePlatforms() {
	platforms.forEach(p => {
		if (hero.sprite.velocity.y > 0 && hero.sprite.overlap(p)) {
			hero.sprite.collide(p);
		}
	});
}

function cameraFollowHero() {
	if (!hero.dead) {
		camera.position.x = hero.sprite.position.x;
		camera.position.y = hero.sprite.position.y;
	}
	// camera.position.x = enemies[0].position.x;
	// camera.position.y = enemies[0].position.y;
}

function heroDeath() {
	if (!DEBUG_MODE) {
		hero.sprite.remove();
		hero.dead = true;
		gameOver = true;
	}
}

function heroCollideEnemies() {
	if (hero.sprite.overlap(enemies)) {
		heroDeath();
	}
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
	push();
	stroke(myColor);
	strokeWeight(3);
	fill(myColor);
	translate(base.x, base.y);
	line(0, 0, vec.x, vec.y);
	rotate(vec.heading());
	var arrowSize = 7;
	translate(vec.mag() - arrowSize, 0);
	triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
	pop();
}

let magOfShootVec = 0;
function heroShoot() {
	const heroVec = createVector(hero.sprite.position.x, hero.sprite.position.y);
	const x = hero.sprite.position.x;
	const y = hero.sprite.position.y;
	const pointToShootVec = createVector(mouseX - HALF_W, mouseY - HALF_H);
	pointToShootVec.setMag(magOfShootVec);

	if (mouseDown(LEFT) && hero.curShotsNum > 0) {
		magOfShootVec += 10;
		magOfShootVec = (magOfShootVec > SHOT_HERO_MAX_SPEED * 10) 
		? SHOT_HERO_MAX_SPEED * 10
		: magOfShootVec;
	}

	if (mouseWentUp(LEFT) && hero.curShotsNum > 0) {
		const rotation = degrees(pointToShootVec.heading());
		const speed = round(magOfShootVec / 10);
		const newShot = new HeroShot(x, y, speed, rotation);
		hero.shots.add(newShot.sprite);
		hero.curShotsNum--;
		magOfShootVec = 0;
	}

	drawArrow(heroVec, pointToShootVec, 'rgba(0, 0, 0, 0.3)');

}

function restoreHeroShots() {
	if (frameCount % 200 === 0 && hero.curShotsNum < HERO_MAX_SHOTS_NUM) {
		hero.curShotsNum++;
	}
}



/*
 *Other functions
*
*/
function logging(data) {
	if (frameCount % 20 === 0) {
		console.log(data);
	}
}

function moveDisplay() {
	const ht = hero.sprite.position.y + hero.sprite.height / 2;
	if (!hero.dead)
		displayFrame.position.x = hero.sprite.position.x;
	if (ht < displayFrame.position.y) {
		displayFrame.position.y -= displayFrame.height / 6;
	}
	displayFrame.velocity.y = DISPLAY_SPEED;
}

function collideDisplay() {
	allSprites.forEach(sp => {
		const spb = sp.position.y + sp.height / 2;
		const dfb =  displayFrame.position.y + displayFrame.height / 2;
		if (spb > dfb) {
			sp.remove();
			if (sp.isHero) {
				heroDeath();
			}
		}
	});
}

function spawnPlatformsRightTime() {
	if (platforms.length < PLATFORM_MAX_NUM) {
		platformsSpawn(PLATFORM_MAX_NUM - platforms.length);
	}
}

function spawnEnemiesRightTime() {
	if (enemies.length < ENEMY_MAX_NUM) {
		enemiesSpawn(ENEMY_MAX_NUM - enemies.length);
	}
}

function enemiesCollidePlatforms() {
	enemies.collide(platforms);
}

function shotsCollideEnemies() {
	enemies.forEach(e => {
		hero.shots.forEach(s => {
			if (e.overlap(s)) {
				e.remove();
				s.remove();
			}
		});
	});
}

function shotsCollideAll() {
	hero.shots.forEach(s => {
		if (!s.overlap(displayFrame) || s.overlap(platforms)) {
			s.remove();
		}
	});
}

function countHeight() {
	height = (hero.sprite.position.y > 0) 
	? 0
	: round(hero.sprite.position.y / -100);
	maxHeight = (height > maxHeight) ? height : maxHeight;
}

function updateGUI() {
	maxHeightScoreEl.textContent = maxHeight;
	// curShotsNumEl.textContent = hero.curShotsNum;
	const curShotsWidth = map(hero.curShotsNum, 0, HERO_MAX_SHOTS_NUM, 0, 100);
	curShotsNumEl.style.width = `${curShotsWidth}%`;
}

function debugModeUpdate() {
	if (DEBUG_MODE) {
		allSprites.forEach(s => {
			s.debug = true;
		});
	} else {
	}
}

function draw() {
	background('rgba(20, 20, 40, 1)');

	debugModeUpdate();

	gravity();

	moveDisplay();
	collideDisplay();

	heroCollidePlatforms();
	heroCollideEnemies();
	restoreHeroShots();
	heroMove();
	cameraFollowHero();

	enemiesCollidePlatforms();

	shotsCollideEnemies();
	shotsCollideAll()

	spawnPlatformsRightTime();
	spawnEnemiesRightTime();

	countHeight();

	// logging({maxHeight});

	drawSprites();

	heroShoot();

	updateGUI();

}


function localStorageSetdown() {
	localHero = JSON.parse(localStorage.getItem('hero'));
	localHero.maxHeight = maxHeight;
	const serialLocalHero = JSON.stringify(localHero);
	localStorage.setItem('hero', serialLocalHero);
}

// Window Events
window.onbeforeunload = localStorageSetdown;