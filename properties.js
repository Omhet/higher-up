// GUI
let maxHeightScoreEl;
let curShotsNumEl;
let guiEl;




// Constants for game
W = window.innerWidth / 2;
H = window.innerHeight / 1.5;
// W = 800;
// H = 600;
HALF_W = W / 2;
HALF_H = H / 2;
DOUBLE_W = W * 2;
DOUBLE_H = H * 2;

DISPLAY_MIN_SPEED = -1;
DISPLAY_MAX_SPEED = -5;

CAMERA_ZOOM = 0.5;

DEBUG_MODE = false;

// Constants for objects
G = 0.2;
SPRITE_VELOCITY_Y_MAX = 7;

// Hero
HERO_SPEED = 5;
HERO_SIZE = 50;
HERO_JUMP_FORCE = -10;
HERO_COLOR = 'rgb(222, 125, 20)';
HERO_MAX_SHOTS_NUM = 5;

// Platforms
PLATFORM_START_NUM = W / 80;
PLATFORM_MAX_NUM = W / 10;

// Enemies
ENEMY_MAX_NUM = PLATFORM_MAX_NUM / 10;
ENEMY_SIZE = HERO_SIZE;

// Images
HERO_IMG = {};
PLATFORM_IMG = {};
DISPLAY_FRAME_IMAGE = {};
BACK_IMAGE = {};
GAME_OVER_IMAGE = {};


// Animations
ANIMATION_ENEMY_BASIC = {};

// Shots
SHOT_SIZE = 20;
SHOT_HERO_MAX_SPEED = 17;

// Globals
let displayFrame = {};
let displaySpeed = 0;

let platforms = {};
let enemies = {};
let shots = {};

let height = 0;
let maxHeight = 0;

let gameOver = false;

// Create Hero
const hero = {};

