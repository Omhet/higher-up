// Constants for game
W = 800;
H = 600;
HALF_W = W / 2;
HALF_H = H / 2;

DISPLAY_SPEED = 0;

CAMERA_ZOOM = 0.1;

// Constants for objects
G = 0.2;
HERO_SPEED = 5;
HERO_SIZE = 50;
HERO_JUMP_FORCE = -10;
PLATFORM_MIN_SIZE = 50;
PLATFORM_MAX_SIZE = 300;
PLATFORM_NUM = 16;
PLATFORM_MAX_NUM = 100;

ENEMIES_NUM = 10;
ENEMY_SIZE = HERO_SIZE;

// Globals
let displayFrame = {};

let platforms = {};
let enemies = {};

// Create Hero
const hero = {};


// Setup Functions
function setupDisplayFrame() {
	displayFrame = createSprite(HALF_W, HALF_H, W, 2 * H);
	displayFrame.shapeColor = color(240, 230, 140);
}

function createPlatformsRightPlace() {
	const min_X = (displayFrame.position.x - displayFrame.width / 2) - displayFrame.width * 3;
	const max_X = (displayFrame.position.x + displayFrame.width / 2) + displayFrame.width * 3;
	const min_Y = (displayFrame.position.y - displayFrame.height / 2) - displayFrame.height * 2;
	const max_Y = hero.sprite.position.y - hero.sprite.height / 4;

	for (let i = 0; i < PLATFORM_NUM; i++) {
		let x = random(min_X, max_X);
		let y = random(min_Y, max_Y);
		const w = random(PLATFORM_MIN_SIZE, PLATFORM_MAX_SIZE);
		const h = 20;

		let newPlatform = new Platform(x, y, w, h);

		while (newPlatform.sprite.overlap(platforms)) {
			newPlatform.sprite.remove();
			x = random(0, width);
			y = random(0, height);
			newPlatform = new Platform(x, y, w, h);
		}

		platforms.add(newPlatform.sprite);
	}
}

function platformsSetup() {
	platforms = new Group();

	const basePlatform = new Platform(HALF_W, HALF_H, 200, 20);
	platforms.add(basePlatform.sprite);

	createPlatformsRightPlace(PLATFORM_NUM);
}

function enemiesSetup() {
	enemies = new Group();

	for (let i = 0; i < ENEMIES_NUM; i++) {
		let randIndex = round(random(1, platforms.length - 1));
		let choosenPlatform = platforms[randIndex];
		let x = choosenPlatform.position.x;
		let y = choosenPlatform.position.y - 80;
		let en = new Enemy(x, y, ENEMY_SIZE);
		while (en.sprite.overlap(enemies)) {
			en.sprite.remove();
			randIndex = round(random(0, platforms.length - 1));
			choosenPlatform = platforms[randIndex];
			x = choosenPlatform.position.x;
			y = choosenPlatform.position.y;
			en = new Enemy(x, y, ENEMY_SIZE);
		}
		enemies.add(en.sprite);
	}
}

function heroSetup() {
	hero.static = false;
	hero.sprite = createSprite(HALF_W, HALF_H - HERO_SIZE, HERO_SIZE, HERO_SIZE);
	hero.sprite.shapeColor = color(222, 125, 20);
	hero.speed = HERO_SPEED;
}


function setup() {
	createCanvas(W, H);

	setupDisplayFrame();

	heroSetup();

	platformsSetup();

	enemiesSetup();

	camera.zoom = CAMERA_ZOOM;


}

function gravity() {
	allSprites.forEach(sp => {
		sp.addSpeed(G, 90);
		sp.velocity.y = (sp.velocity.y > 7) ? 7 : sp.velocity.y;
	});
}

function heroMove() {
	const hsp = hero.sprite;

	const Y_CONSTRAIN = 7;

	// Constrain Y velocity
	let vy = hsp.velocity.y;
	hsp.velocity.y = (hsp.velocity.y > Y_CONSTRAIN) ? Y_CONSTRAIN : hsp.velocity.y;

	// Key Controls
	if (keyDown('a')) {
		hsp.position.x -= hero.speed;
	}
	if (keyDown('d')) {
		hsp.position.x += hero.speed;
	}
	if (keyWentDown('space')) {
			if (vy >= Y_CONSTRAIN) {
				hsp.velocity.y = HERO_JUMP_FORCE;
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
	camera.position.x = hero.sprite.position.x;
	camera.position.y = hero.sprite.position.y;

	// camera.position.x = enemies[0].position.x;
	// camera.position.y = enemies[0].position.y;
}

function logging(data) {
	if (frameCount % 20 === 0) {
		console.log(data);
	}
}

function moveDisplay() {
	const ht = hero.sprite.position.y + hero.sprite.height / 2;
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
		}
	});
}

function createPlatformsRightTime() {
	if (platforms.length < PLATFORM_MAX_NUM) {
		createPlatformsRightPlace();
	}
}

function enemiesCollidePlatforms() {
	enemies.collide(platforms);
}

function heroCollideEnemies() {
	if (hero.sprite.overlap(enemies)) {
		hero.sprite.remove();
	}
}


function draw() {
	background(210, 255, 255);

	moveDisplay();
	collideDisplay();

	gravity();
	heroCollidePlatforms();
	enemiesCollidePlatforms();
	heroCollideEnemies();
	heroMove();
	cameraFollowHero();

	createPlatformsRightTime();
	// logging(hero.sprite.velocity.y);

	drawSprites();
}
