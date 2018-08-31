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

		effectDuration = COLLECT_EFFECT_DURATION;
		collectEffectActive = true;

		if (c.class === 'jump-higher') {
			hero.jumpForce = COLLECT_JUMP_HIGHER;
			hero.curJumpNum = HERO_MAX_JUMP_NUM;
			effectNameEl.textContent += ' Сильный прыжок';
		}

		else if (c.class === 'jump-lower') {
			hero.jumpForce = COLLECT_JUMP_LOWER;
			effectNameEl.textContent += ' Слабый прыжок';
		}

		if (c.class === 'screen-rotate-180') {
			canvas.style.transform = 'rotate(180deg)';
		}

		if (c.class === 'screen-rotate-90') {
			canvas.style.transform = 'rotate(90deg)';
		}

		if (c.class === 'screen-rotate-270') {
			canvas.style.transform = 'rotate(270deg)';
		}

		if (c.class === 'invisible') {
			hero.sprite.visible = false;
			effectNameEl.textContent += ' Невидимость';
		}

		if (c.class === 'size-up') {
			const scale = hero.sprite.scale * 4;
			hero.sprite.scale = scale;
			hero.sprite.width = HERO_SIZE * scale;
			hero.sprite.height = HERO_SIZE * scale;
			effectNameEl.textContent += ' Большой Размер';
		}

		else if (c.class === 'size-down') {
			const scale = hero.sprite.scale / 2;
			hero.sprite.scale = scale;
			hero.sprite.width = HERO_SIZE * scale;
			hero.sprite.height = HERO_SIZE * scale;
			effectNameEl.textContent += ' Маленький Размер';
		}

		if (c.class === 'heart') {
			heroTakeHealth(COLLECT_HEART_HP);
		}

		if (c.class === 'immortal') {
			hero.immortal = true;
			hero.immortalCollectEffect = true;
		}

		c.remove();
	}

	if (collectEffectActive) {

		if (effectDuration > 0) {
			effectDuration--;
		} else {

			hero.sprite.scale = HERO_SCALE;
			hero.sprite.width = hero.sprite.originalWidth;
			hero.sprite.height = hero.sprite.originalHeight;

			hero.immortal = false;
			hero.immortalCollectEffect = false;

			hero.jumpForce = HERO_JUMP_FORCE;
			hero.sprite.visible = true;

			canvas.style.transform = 'rotate(0deg)';

			effectNameEl.textContent = '';

			collectEffectActive = false;
			effectDuration = 0;
		}
		
	}

}

function collectsLogic() {
	collectibles.forEach(c => {
		collectsEffects(c);
	});
	collectsCollidePlatforms();
}