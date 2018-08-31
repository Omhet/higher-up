
/*
 *Other functions
*
*/

function gravity() {
	allSprites.forEach(sp => {
		if (!sp.isStatic) {
			sp.addSpeed(G, 90);
		}
		sp.velocity.y = (sp.velocity.y > SPRITE_VELOCITY_Y_MAX) 
		? SPRITE_VELOCITY_Y_MAX 
		: sp.velocity.y;
	});
}

/*
 *Display functions
*
*/

function moveDisplay() {
	const ht = hero.sprite.position.y + hero.sprite.height / 2;
	if (!hero.dead)
		displayFrame.position.x = hero.sprite.position.x;
	if (ht < displayFrame.position.y) {
		displayFrame.position.y -= 10;
	}
	if (displayFrame.position.y + displayFrame.height / 2 < hero.sprite.position.y - H || DEBUG_MODE) {
		displaySpeed = 0;
	}
	displayFrame.velocity.y = displaySpeed;
}

function collideDisplay() {
	allSprites.forEach(sp => {
		const spb = sp.position.y + sp.height / 2;
		const dfb =  displayFrame.position.y + displayFrame.height / 2;
		if (spb > dfb) {
			sp.remove();
			if (sp.isHero) {
				heroTakeDamage(HERO_MAX_HP);
			}
		}
	});
}


/*
 *Platform functions
*
*/

function platformsSpawn(n) {
	const min_X = (displayFrame.position.x - displayFrame.width / 2) - displayFrame.width * 2;
	const max_X = (displayFrame.position.x + displayFrame.width / 2) + displayFrame.width * 2;
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

function spawnPlatformsRightTime() {
	if (platforms.length < PLATFORM_MAX_NUM) {
		platformsSpawn(PLATFORM_MAX_NUM - platforms.length);
	}
}

function platformsMove() {
	platforms.forEach(p => {
		p.velocity.x = p.speed;
	});
}