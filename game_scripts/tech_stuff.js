/*
* Tech Stuff
*
*/

function logging(data) {
	if (frameCount % 20 === 0) {
		console.log(data);
	}
}

function countHeight() {
	height = (hero.sprite.position.y > 0) 
	? 0
	: round(hero.sprite.position.y / -100);
	maxHeight = (height > maxHeight) ? height : maxHeight;
}

function updateGUI() {
	maxHeightScoreEl.textContent = maxHeight;

	const curShotsWidth = map(hero.curShotsNum, 0, HERO_MAX_SHOTS_NUM, 0, 100);
	curShotsNumEl.style.width = `${curShotsWidth}%`;

	const curColEfDurWidth = map(effectDuration, 0, COLLECT_EFFECT_DURATION, 0, 100);
	collectEffectDurationEl.style.width = `${curColEfDurWidth}%`;

	guiEl.style.width = `${W}px`;
}

function debugModeUpdate() {
	if (DEBUG_MODE) {
		allSprites.forEach(s => {
			s.debug = true;
		});
	} else {
	}
}


function backImageUpdate() {
	BACK_IMAGE_X =  displayFrame.position.x -displayFrame.width / 2;
	BACK_IMAGE_Y = displayFrame.position.y + displayFrame.height / 2 - BACK_IMAGE.height / 2;
}

/*
*
*
*/