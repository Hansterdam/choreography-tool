let primary = 0;
let pressed = false;

let angleInput, timeInput, speedInput, menu;

let timeScale;

let craneCollection;
let stepPrinter;
let checkboxMenu = [20, 300, 20];
let downloadMenu = [20, 730];

let modeSelector;
let player;

let framesPerSecond = 30;

let msPerDegree = 130;

function setup() {
  createCanvas(1400, 750);
  angleMode(DEGREES);
  rectMode(RADIUS);
  frameRate(framesPerSecond);

  angleInput = new AngleInput();
  timeInput = new TimeInput();
  speedInput = new SpeedInput();
  menu = new Menu();
  timeScale = new TimeScale();
  modeSelector = new ModeSelector();
  player = new Player();

  craneCollection = new CraneCollection();
  craneCollection.init();

  stepPrinter = new StepPrinter();
}

function draw() {
  background(220);

  if (modeSelector.isInput()) {
    timeScale.setToMaxValue();
    if (pressed) {
      craneCollection.updateAngleDiff();
      craneCollection.updateTimeDiff();
    }
  }

  craneCollection.draw();
  stepPrinter.print();
  timeScale.draw();
  player.draw();
}

function mousePressed() {
  if (modeSelector.isInput()) {
    let craneHovered = craneCollection.mouseHover();
    if (craneHovered !== false) {
      pressed = true;
      primary = craneHovered;
      craneCollection.setSelectedToPrimary();
    }
  }
}

function mouseReleased() {
  pressed = false;
}
