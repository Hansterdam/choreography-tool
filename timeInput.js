const xTime = 15;
const yTime = 44;

function TimeInput() {
  this.min = 0;
  this.max = 100000;
  this.start = 0;
  this.stepSize = 10;

  this.xOffSet = 50;
  this.yOffSet = 13;
  this.size = 500;

  this.slider;

  this.slider = createSlider(this.min, this.max, this.start, this.stepSize);
  this.slider.input(timeInputChanged);
  this.slider.position(xTime + this.xOffSet, yTime + this.yOffSet);
  this.slider.style("width", this.size + "px");

  this.value = function (value) {
    return this.slider.value(value);
  };

  this.reset = function () {
    this.slider.value(0);
  };

  this.bindVariable = function (variable) {
    this.variable = variable;
  };
}

timeInputLabel = function () {
  text("Time:", xTime, yTime);
  text(craneCollection.primary().timeDiff, xTime + 45, yTime);
};
p5.prototype.registerMethod("post", timeInputLabel);

function timeInputChanged() {
  primaryTimeDiff = craneCollection.cranes[primary].minTimeDiff();
  if (this.value() <= primaryTimeDiff) {
    this.value(primaryTimeDiff);
  }
  craneCollection.setTimeDiff(int(this.value()));
}
