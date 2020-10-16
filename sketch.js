let primary = 0;
let pressed = false;

let angleInput, timeInput, menu;

let timeScale;

let craneCollection;
let stepPrinter;
let checkboxMenu = [20, 300, 20];
let downloadMenu = [20, 730];

let modeSelector;

let modeRadio;

function setup() {
  createCanvas(1400, 750);
  angleMode(DEGREES);
  rectMode(RADIUS);
  frameRate(30);

  angleInput = new AngleInput();
  timeInput = new TimeInput();
  menu = new Menu();
  timeScale = new TimeScale();
  modeSelector = new ModeSelector();

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
}

function mousePressed() {
  let craneHovered = craneCollection.mouseHover();
  if (craneHovered !== false) {
    pressed = true;
    primary = craneHovered;
    craneCollection.setSelectedToPrimary();
  }
}

function mouseReleased() {
  pressed = false;
}
