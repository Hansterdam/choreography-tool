let playing = false;

function Player() {
  this.x = 20;
  this.y = 500;

  this.startButton = createButton("Start");
  this.startButton.position(this.x, this.y);
  this.startButton.mousePressed(pressStart);

  this.pauseButton = createButton("Pause");
  this.pauseButton.position(this.x, this.y + 25);
  this.pauseButton.mousePressed(pressPause);

  this.stopButton = createButton("Stop");
  this.stopButton.position(this.x, this.y + 50);
  this.stopButton.mousePressed(pressStop);

  this.speedSelector = createSlider(0.25, 10, 1, 0.25);
  this.speedSelector.position(this.x, this.y + 100);

  this.msPerFrame = () => {
    return (1000 * this.speedSelector.value()) / framesPerSecond;
  };

  this.draw = () => {
    text(this.speedSelector.value() + "x", this.x - 5, this.y + 80);
  };
}

disablePlayerButtons = function () {
  if (!modeSelector.isInput()) {
    player.startButton.removeAttribute("disabled");
    player.pauseButton.removeAttribute("disabled");
    player.stopButton.removeAttribute("disabled");
    player.speedSelector.removeAttribute("disabled");
  } else {
    player.startButton.attribute("disabled", true);
    player.pauseButton.attribute("disabled", true);
    player.stopButton.attribute("disabled", true);
    player.speedSelector.attribute("disabled", true);
  }
};
p5.prototype.registerMethod("post", disablePlayerButtons);

function pressStart() {
  if (!modeSelector.isInput()) {
    playing = true;
  }
}

function pressPause() {
  if (!modeSelector.isInput()) {
    playing = false;
  }
}

function pressStop() {
  if (!modeSelector.isInput()) {
    playing = false;
    timeScale.reset();
  }
}
