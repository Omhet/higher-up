// Constants
G = 0.2;
HERO_SPEED = 5;
HERO_JUMP_FORCE = -8;
PLATFORM_MIN_SIZE = 50;
PLATFORM_MAX_SIZE = 300;
PLATFORM_NUM = 8;

// Globals
const allObjects = [];
let platforms = {};

// Create Hero
const hero = {};



// Setup Functions
function platformsSetup(n) {
	platforms = new Group();

	const basePlatform = new Platform(400, 400, 200, 20);
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
	hero.sprite = createSprite(400, 200, 50, 50);
	hero.sprite.shapeColor = color(222, 125, 20);
	hero.speed = HERO_SPEED;
	allObjects.push(hero);
}


function setup() {
	createCanvas(800, 600);

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

	const Y_CONSTRAIN = 10;

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
			if (vy >= Y_CONSTRAIN - 4) {
				hsp.velocity.y = HERO_JUMP_FORCE;
			}
	}
}

function heroCollidePlatforms() {
	hero.sprite.collide(platforms);
}

function draw() {
	background(210, 255, 255);

	gravity();
	heroCollidePlatforms();
	heroMove();

	drawSprites();
}
