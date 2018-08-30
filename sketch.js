


function draw() {
	background('rgba(0, 0, 0, 1)');

	// Tech update
	backImageUpdate();
	debugModeUpdate();

	gravity();

	// Display Frame
	moveDisplay();
	collideDisplay();

	// Hero
	heroCollidePlatforms();
	heroCollideEnemies();
	restoreHeroShots();
	heroMove();
	cameraFollowHero();
	heroDeath();

	// Enemies
	enemiesLogic();

	// Shots
	shotsLogic();

	// Collectibles 
	collectsLogic();

	// Spawn
	spawnPlatformsRightTime();
	spawnEnemiesRightTime();
	spawnCollectsRightTime();

	// Scores
	countHeight();

	drawSprites();

	if (!hero.dead && hero.sprite.visible) {
		heroShoot();
	}

	updateGUI();

	// Back Images
	image(BACK_IMAGE, BACK_IMAGE_X, BACK_IMAGE_Y, DOUBLE_W, BACK_IMAGE_HALF_H);
	image(GAME_OVER_IMAGE, BACK_IMAGE_X, BACK_IMAGE_Y + GAME_OVER_IMAGE.height, DOUBLE_W, GAME_OVER_IMAGE.height * 1.5);
}


function localStorageSetdown() {
	localHero = JSON.parse(localStorage.getItem('hero'));
	localHero.maxHeight = maxHeight;
	const serialLocalHero = JSON.stringify(localHero);
	localStorage.setItem('hero', serialLocalHero);
}

// Window Events
window.onbeforeunload = localStorageSetdown;