/*
* Collectibles
*
*/

function createCollect() {
	let randIndex = round(random(1, platforms.length - 1));
	let choosenPlatform = platforms[randIndex];
	let x = choosenPlatform.position.x;
	let y = choosenPlatform.position.y - COLLECT_SIZE;
	let col = new Collectible(x, y, COLLECT_SIZE);
	return col;
}

function collectsSpawn(n) {
	for (let i = 0; i < n; i++) {
		let col = createCollect();
		while (col.sprite.overlap(collectibles) || col.sprite.overlap(displayFrame) || col.sprite.overlap(enemies)) {
			col.sprite.remove();
			col = createCollect();
		}
		collectibles.add(col.sprite);
	}
}

function spawnCollectsRightTime() {
	if (collectibles.length < COLLECT_MAX_NUM) {
		collectsSpawn(COLLECT_MAX_NUM - collectibles.length);
	}
}

function collectsCollidePlatforms() {
	collectibles.collide(platforms);
}

let collectEffectActive = false;
function collectsEffects(c) {

	if (hero.sprite.overlap(c)) {

		console.log(c.class);
		collectEffectActive = true;

		if (c.class === 'jump-higher') {
			hero.jumpForce = COLLECT_JUMP_HIGHER;
		}

		else if (c.class === 'jump-lower') {
			hero.jumpForce = COLLECT_JUMP_LOWER;
		}

		c.remove();
	}

	if (frameCount % 200 === 0 && collectEffectActive) {
		console.log('Back to Normal');
		hero.jumpForce = HERO_JUMP_FORCE;
		collectEffectActive = false;
	}

}

function collectsLogic() {
	collectibles.forEach(c => {
		collectsEffects(c);
	});
	collectsCollidePlatforms();
}