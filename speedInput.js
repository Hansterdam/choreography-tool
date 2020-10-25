function SpeedInput() {
  this.x = 160;
  this.y = 20;

  this.xOffSet = 100;
  this.yOffSet = -5;
  this.size = 50;

  this.input = createInput(msPerDegree);
  this.input.input(speedInputChanged);
  this.input.position(this.x + this.xOffSet, this.y + this.yOffSet);
  this.input.size(this.size);
}

drawSpeedInput = function () {
  push();
  if (craneCollection.hasSteps()) {
    speedInput.input.attribute("disabled", true);
    fill(150);
  } else {
    speedInput.input.removeAttribute("disabled");
    fill(0);
  }
  text("ms per degree:", speedInput.x, speedInput.y);
  pop();
};
p5.prototype.registerMethod("post", drawSpeedInput);

function speedInputChanged() {
  msPerDegree = this.value();
  craneCollection.resetValues();
}
