/*
* Shots
*
*/

function shotsCollide() {
	shots.forEach(s => {

		enemies.forEach(e => {
			if (e.overlap(s) && s.heroShot) {
				e.remove();
				s.remove();
			}
		});

		if (!s.overlap(displayFrame) || s.overlap(platforms)) {
			s.remove();
		}

		if (s.overlap(hero.sprite) && s.enemyShot) {
			heroTakeDamage(s.enemyDamage);
			s.remove();
		}

	});
}

function shotsLogic() {
	shotsCollide();
}

/*
*
*
*/