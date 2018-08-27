// Constants for game
W = 800;
H = 600;
HALF_W = W / 2;
HALF_H = H / 2;

DISPLAY_SPEED = 0;


// Constants for objects
G = 0.2;
HERO_SPEED = 5;
HERO_SIZE = 50;
HERO_JUMP_FORCE = -10;
PLATFORM_MIN_SIZE = 50;
PLATFORM_MAX_SIZE = 300;
PLATFORM_NUM = 16;
PLATFORM_MAX_NUM = 150;

// Globals
let displayFrame = {};

const allObjects = [];
let platforms = {};

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

		allObjects.push(newPlatform);
		platforms.add(newPlatform.sprite);
	}
}

function platformsSetup(n) {
	platforms = new Group();

	const basePlatform = new Platform(HALF_W, HALF_H, 200, 20);
	allObjects.push(basePlatform);
	platforms.add(basePlatform.sprite);

	createPlatformsRightPlace(PLATFORM_NUM);
}

function heroSetup() {
	hero.static = false;
	hero.sprite = createSprite(HALF_W, HALF_H - HERO_SIZE, HERO_SIZE, HERO_SIZE);
	hero.sprite.shapeColor = color(222, 125, 20);
	hero.speed = HERO_SPEED;

	allObjects.push(hero);
}


function setup() {
	createCanvas(W, H);

	setupDisplayFrame();

	heroSetup();

	platformsSetup();


}

function gravity() {
	allObjects.forEach(ob => {
		if (ob.static) return;
		const sp = ob.sprite;
		sp.addSpeed(G, 90);
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

let pid = [];
function platformsInDisplay() {
	platforms.forEach(p => {
		if (p.overlap(displayFrame)) {
			p.inDisplay = true;
		} else {
			p.inDisplay = false;
		}
	});
	pid = platforms.filter(p => p.inDisplay);
}

function createPlatformsRightTime() {
	if (platforms.length < PLATFORM_MAX_NUM) {
		createPlatformsRightPlace(1);
	}
}

function limitPlatforms() {
	while (platforms.length > PLATFORM_MAX_NUM) {
		platforms.pop();
		// console.log('msg')
	}
}


function draw() {
	background(210, 255, 255);

	moveDisplay();
	collideDisplay();

	gravity();
	heroCollidePlatforms();
	heroMove();
	cameraFollowHero();

	platformsInDisplay();

	// limitPlatforms();
	createPlatformsRightTime();
	// logging(hero.sprite.position.x);

	drawSprites();
}
