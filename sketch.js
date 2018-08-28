// GUI
let maxHeightScoreEl;
let curShotsNumEl;
let guiEl;


// Constants for game
W = 800;
H = 600;
HALF_W = W / 2;
HALF_H = H / 2;

DISPLAY_SPEED = 0;

CAMERA_ZOOM = 0.5;

// Constants for objects
G = 0.2;
SPRITE_VELOCITY_Y_MAX = 7;

// Hero
HERO_SPEED = 5;
HERO_SIZE = 50;
HERO_JUMP_FORCE = -10;
HERO_COLOR = 'rgb(222, 125, 20)';

// Platforms
PLATFORM_MIN_SIZE = 50;
PLATFORM_MAX_SIZE = 300;
PLATFORM_START_NUM = 10;
PLATFORM_MAX_NUM = 100;

// Enemies
ENEMY_MAX_NUM = 10;
ENEMY_SIZE = HERO_SIZE;

// Shots
SHOT_SIZE = 20;
SHOT_HERO_MAX_SPEED = 17;
// SHOT_HERO_COLOR = 'rgb('

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


// Setup Functions
function setupDisplayFrame() {
	displayFrame = createSprite(HALF_W, HALF_H, W / CAMERA_ZOOM, H / CAMERA_ZOOM);
	displayFrame.shapeColor = color('rgba(220, 220, 220, 0)');
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

function heroSetup() {
	hero.MAX_SHOTS_NUM = 100;
	hero.curShotsNum = hero.MAX_SHOTS_NUM;
	hero.shots = new Group();

	hero.speed = HERO_SPEED;

	hero.sprite = createSprite(HALF_W, HALF_H - HERO_SIZE, HERO_SIZE, HERO_SIZE);
	hero.sprite.shapeColor = color(HERO_COLOR);
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
	createCanvas(W, H);

	setupDisplayFrame();

	heroSetup();

	platformsSetup();

	enemies = new Group();

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
	hero.sprite.remove();
	hero.dead = true;
	gameOver = true;
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

function heroArrow() {
	const heroVec = createVector(hero.sprite.position.x, hero.sprite.position.y);
	const pointToShootVec = createVector(mouseX - HALF_W, mouseY - HALF_H);
	pointToShootVec.normalize();
	drawArrow(heroVec, pointToShootVec, 'black');
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

	drawArrow(heroVec, pointToShootVec, 'black');

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
		if (e.overlap(hero.shots)) {
			e.remove();
		}
	});
}

function shotsCollideAll() {
	hero.shots.forEach(s => {
		if (s.overlap(platforms) || s.overlap(enemies) || !s.overlap(displayFrame)) {
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
	curShotsNumEl.textContent = hero.curShotsNum;
}

function draw() {
	background(210, 255, 255);

	moveDisplay();
	collideDisplay();

	gravity();

	heroCollidePlatforms();
	heroCollideEnemies();
	heroShoot();
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

	// heroArrow();

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