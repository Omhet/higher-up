// Constants for game
W = 800;
H = 600;
HALF_W = W / 2;
HALF_H = H / 2;

DISPLAY_SPEED = -0.5;


// Constants for objects
G = 0.2;
HERO_SPEED = 5;
HERO_SIZE = 50;
HERO_JUMP_FORCE = -7;
PLATFORM_MIN_SIZE = 50;
PLATFORM_MAX_SIZE = 300;
PLATFORM_NUM = 8;

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

function platformsSetup(n) {
	platforms = new Group();

	const basePlatform = new Platform(HALF_W, HALF_H, 200, 20);
	allObjects.push(basePlatform);
	platforms.add(basePlatform.sprite);

	for (let i = 0; i < n; i++) {
		let x = random(0, width);
		let y = random(0, height);
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

function heroSetup() {
	hero.static = false;
	hero.sprite = createSprite(HALF_W, HALF_H - HERO_SIZE, HERO_SIZE, HERO_SIZE);
	hero.sprite.shapeColor = color(222, 125, 20);
	hero.speed = HERO_SPEED;
	hero.sprite.collide(platforms[0]);

	allObjects.push(hero);
}


function setup() {
	createCanvas(W, H);

	setupDisplayFrame();

	platformsSetup(PLATFORM_NUM);

	heroSetup();

}

function gravity() {
	allObjects.forEach(ob => {
		if (ob.static) return;
		const sp = ob.sprite;
		sp.addSpeed(G, 90);
		if (sp.position.y > height + 100) {
			sp.remove();
		}
	});
}

function heroMove() {
	const hsp = hero.sprite;

	const Y_CONSTRAIN = 2;

	// Constrain Y velocity
	let vy = hsp.velocity.y;
	vy = (vy > Y_CONSTRAIN) ? Y_CONSTRAIN : vy;

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


function draw() {
	background(210, 255, 255);

	moveDisplay();
	collideDisplay();

	gravity();
	heroCollidePlatforms();
	heroMove();
	cameraFollowHero();

	// logging(hero.sprite.position.x);

	drawSprites();
}
