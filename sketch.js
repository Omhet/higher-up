
function draw() {
	background('rgba(0, 0, 0, 1)');

	backImageUpdate();

	debugModeUpdate();

	gravity();

	moveDisplay();
	collideDisplay();

	heroCollidePlatforms();
	heroCollideEnemies();
	restoreHeroShots();
	heroMove();
	cameraFollowHero();

	enemiesCollidePlatforms();
	enemiesLogic();

	shotsLogic();

	spawnPlatformsRightTime();
	spawnEnemiesRightTime();

	countHeight();

	// logging({maxHeight});

	drawSprites();

	heroShoot();

	updateGUI();


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