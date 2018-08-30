// GUI
let maxHeightScoreEl;
let curShotsNumEl;
let collectEffectDurationEl;
let guiEl;

// Constants for game
W = 800;
H = window.innerHeight / 1.5;
HALF_W = W / 2;
HALF_H = H / 2;
DOUBLE_W = W * 2;
DOUBLE_H = H * 2;


CAMERA_ZOOM = 0.5;

// Display Frame
DISPLAY_MIN_SPEED = -1;
DISPLAY_MAX_SPEED = -8;
DISPLAY_W = W / CAMERA_ZOOM;
DISPLAY_H = (H / CAMERA_ZOOM) * 1.5;

DEBUG_MODE = false;

// Constants for objects
G = 0.2;
SPRITE_VELOCITY_Y_MAX = 7;

// Hero
HERO_SPEED = 5;
HERO_SIZE = 50;
HERO_SCALE = 1.3;
HERO_JUMP_FORCE = -10;
HERO_MAX_SHOTS_NUM = 5;
HERO_START_HP = 3;
HERO_MAX_HP = 6;

// Platforms
PLATFORM_START_NUM = W / 80;
PLATFORM_MAX_NUM = W / 10;

// Enemies
ENEMY_MAX_NUM = PLATFORM_MAX_NUM / 5;
ENEMY_SIZE = HERO_SIZE;
ENEMY_BASIC_SHOT_DMG = 1;
ENEMY_BASIC_COLLIDE_DMG = 2;

// Collectibles
COLLECT_MAX_NUM = PLATFORM_MAX_NUM / 8;
COLLECT_SIZE = HERO_SIZE * 2;
COLLECT_EFFECT_DURATION = 2000;

COLLECT_JUMP_HIGHER = HERO_JUMP_FORCE * 2;
COLLECT_JUMP_LOWER = HERO_JUMP_FORCE / 2;

// Images
HERO_IMG = {};
HERO_SHOT_IMG = {};
ENEMY_BASIC_SHOT_IMG = {};
PLATFORM_IMG = {};

DISPLAY_FRAME_IMAGE = {};
BACK_IMAGE = {};
GAME_OVER_IMAGE = {};


COLECT_IMG_MAP = {
	'chest': {},
	'jump-higher': {},
	'jump-lower': {},
	'screen-rotate-180': {},
	'screen-rotate-90': {},
	'screen-rotate-270': {},
	'invisible': {},
	'size-up': {},
	'size-down': {},
};

// Animations
ANIMATION_ENEMY_BASIC = {};

// Shots
SHOT_SIZE = 40;
SHOT_HERO_MAX_SPEED = 17;

// Globals
let displayFrame = {};
let displaySpeed = 0;

let platforms = {};
let enemies = {};
let shots = {};
let collectibles = {};

let height = 0;
let maxHeight = 0;

let gameOver = false;

let effectDuration = 0;

// Create Hero
const hero = {};

