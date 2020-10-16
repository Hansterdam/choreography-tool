function Crane() {
  this.x = 0;
  this.y = 0;

  this.angle = 0;
  this.angleDiff = 0;
  this.timeDiff = 0;

  this.steps;

  this.lengthRadius = 70;
  this.widthRadius = 5;
  this.offSet = 20;

  this.color = 255;
  this.colorSelected = 100;
  this.colorPrimary = 0;

  this.index;
  this.checkbox;
  this.selected = true;

  this.init = (index, coordinates, angle) => {
    this.index = index;
    this.locate(...coordinates);
    this.initAngle = angle;
    this.angle = angle;
    this.initCheckbox();
    this.initSteps();
  };

  this.locate = (xPos, yPos) => {
    this.x = xPos;
    this.y = yPos;
  };

  this.initCheckbox = () => {
    this.checkbox = createCheckbox("Crane " + (this.index + 1), true);
    this.checkbox.position(
      checkboxMenu[0],
      checkboxMenu[1] + checkboxMenu[2] * this.index
    );
    this.checkbox.changed(checkboxChanged);
    this.checkbox.attribute("crane-index", this.index);
  };

  this.initSteps = () => {
    this.steps = [
      [
        ["", ""],
        [0, this.initAngle],
      ],
    ];
  };

  this.resetValues = () => {
    this.angleDiff = 0;
    this.timeDiff = 0;
  };

  this.reset = () => {
    this.angle = this.initAngle;
    this.initSteps();
    this.resetValues();
  };

  this.saveStep = () => {
    if (this.timeDiff > 0) {
      let step = [int(this.timeDiff), int(this.angleDiff)];
      let total = this.addDiffToLastStep(step);
      this.steps.push([step, total]);
      this.addAngleDiff(this.angleDiff);
    }
  };

  this.deleteStep = () => {
    if (this.steps.length > 1) {
      deletedStep = this.steps.pop();
      this.addAngleDiff(-deletedStep[1]);
    }
  };

  this.mouseHover = function () {
    let distBack = dist(mouseX, mouseY, this.xBack(), this.yBack());
    let distFront = dist(mouseX, mouseY, this.xFront(), this.yFront());
    return distBack + distFront < 2 * this.lengthRadius + 3;
  };

  this.updateAngleDiff = function () {
    let angleNow = atan2(mouseY - this.y, mouseX - this.x);
    let anglePrev = atan2(pmouseY - this.y, pmouseX - this.x);
    let angleChange = angleNow - anglePrev;
    angleChange =
      angleChange < -300
        ? angleChange + 360
        : angleChange > 300
        ? angleChange - 360
        : angleChange;

    this.angleDiff += angleChange;
    angleInput.value(this.angleDiff);
    return this.angleDiff;
  };

  this.addAngleDiff = function (value) {
    this.angle = (this.angle + value) % 360;
  };

  this.minTimeDiff = function () {
    return abs(int(this.angleDiff)) * 130;
  };

  this.currentAngle = function () {
    return this.angle + this.angleDiff;
  };

  this.xBack = function () {
    return this.x - cos(this.currentAngle()) * this.offSet;
  };

  this.yBack = function () {
    return this.y - sin(this.currentAngle()) * this.offSet;
  };

  this.xFront = function () {
    return (
      this.x + cos(this.currentAngle()) * (2 * this.lengthRadius - this.offSet)
    );
  };

  this.yFront = function () {
    return (
      this.y + sin(this.currentAngle()) * (2 * this.lengthRadius - this.offSet)
    );
  };

  this.addDiffToLastStep = (diff) => {
    let lastStep = this.lastStep();
    return [lastStep[1][0] + diff[0], lastStep[1][1] + diff[1]];
  };

  this.lastStep = () => {
    return this.steps[this.steps.length - 1];
  };

  this.setToTime = (timeValue) => {
    let nextStep = this.getNextStep(timeValue);
    if (nextStep) {
      this.setToStep(nextStep, timeValue);
    } else {
      this.setToLastStep();
    }
  };

  this.getNextStep = (timeValue) => {
    for (let i = 0; i < this.steps.length; i++) {
      if (this.steps[i][1][0] > timeValue) {
        return this.steps[i];
      }
    }
  };

  this.setToStep = (step, timeValue) => {
    this.angle = step[1][1] - step[0][1];
    let timeMissed = step[1][0] - timeValue;
    this.timeDiff = step[0][0] - timeMissed;
    let stepFactor = this.timeDiff / step[0][0];
    this.angleDiff = stepFactor * step[0][1];
  };

  this.setToLastStep = () => {
    let lastStep = this.lastStep();
    this.angle = lastStep[1][1];
    this.angleDiff = 0;
    this.timeDiff = 0;
  };

  this.draw = function (isPrimary) {
    push();
    translate(this.x, this.y);
    push();
    rotate(this.currentAngle());
    if (pressed && isPrimary) {
      fill(this.colorPrimary);
    } else if (this.selected) {
      fill(this.colorSelected);
    } else {
      fill(this.color);
    }
    rect(
      this.lengthRadius - this.offSet,
      0,
      this.lengthRadius,
      this.widthRadius
    );
    if (modeSelector.isInput() && pressed && isPrimary) {
      fill(this.color);
    } else {
      fill(this.colorPrimary);
    }
    noStroke();
    rect(0, 0, 2, 2);
    pop();
    fill(255, 0, 0);
    if (!pressed) {
      text(this.index + 1, -20, -20);
    }
    pop();
  };
}

function checkboxChanged() {
  craneCollection.cranes[
    this.attribute("crane-index")
  ].selected = this.checked();

  craneCollection.selectNewPrimary();
}
