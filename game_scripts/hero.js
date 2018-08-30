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
				hsp.velocity.y = hero.jumpForce;
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
}

function heroDeath() {
	if (!DEBUG_MODE && hero.curHP === 0) {
		hero.sprite.remove();
		hero.dead = true;
		gameOver = true;
		displaySpeed = DISPLAY_MAX_SPEED;
	}
}

function heroCollideEnemies() {
	if (hero.sprite.overlap(enemies)) {
		heroTakeDamage(ENEMY_BASIC_COLLIDE_DMG);
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

		const newShot = new Shot(x, y, speed, rotation, HERO_SHOT_IMG);
		newShot.sprite.heroShot = true;

		shots.add(newShot.sprite);

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

function heroTakeDamage(n) {
	if (!hero.immortal) {
		hero.curHP -= n;
	}
	hero.immortal = true;
	hero.curHP = (hero.curHP < 0) ? 0 : hero.curHP;
}

function heroTakeHealth(n) {
	hero.curHP += n;
	hero.curHP = (hero.curHP > HERO_MAX_HP) ? HERO_MAX_HP : hero.curHP;
}

function heroImmortalCount() {
	if (frameCount % 200 === 0) {
		if (hero.immortal) {
			hero.immortal = false;
			hero.sprite.visible = true;
		}
	}
}

function heroImmortalBlink() {
	if (hero.immortal) {
		if (frameCount % 10 === 0) {
			hero.sprite.visible = !hero.sprite.visible;
		}
	}
}

/*
*
*
*/
