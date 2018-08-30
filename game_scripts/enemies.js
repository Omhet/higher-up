
/*
* Enemies
*
*/

function createEnemy() {
	let randIndex = round(random(1, platforms.length - 1));
	let choosenPlatform = platforms[randIndex];
	let x = choosenPlatform.position.x;
	let y = choosenPlatform.position.y - ENEMY_SIZE;
	let en = new Enemy(x, y, ENEMY_SIZE);
	return en;
}

function enemiesSpawn(n) {
	for (let i = 0; i < n; i++) {
		let en = createEnemy();
		while (en.sprite.overlap(enemies) || en.sprite.overlap(displayFrame)) {
			en.sprite.remove();
			en = createEnemy();
		}
		enemies.add(en.sprite);
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



function enemiesShoot(e) {
	if (e.class === 'shooting' && e.overlap(displayFrame)) {
		if (frameCount % 64 === 0) {
			const x = e.position.x;
			const y = e.position.y;

			const pointToShootVec = createVector(hero.sprite.position.x - x, hero.sprite.position.y - y);

			const d = round(dist(x, y, hero.sprite.position.x, hero.sprite.position.y) / 30);

			const head = degrees(pointToShootVec.heading());

			const k = floor(random(-1, 2));

			const rotation = round(random(head, head + k * 25));
			const speed = round(random(d, d + 10));

			const newShot = new Shot(x, y, speed, rotation, ENEMY_BASIC_SHOT_IMG);
			newShot.sprite.enemyShot = true;
			shots.add(newShot.sprite);
		}
	}
}

function enemiesLogic() {
	enemies.forEach(e => {
		enemiesShoot(e);
	});
	enemiesCollidePlatforms();
}

/*
*
*
*/