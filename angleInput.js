function AngleInput() {
  this.x = 15;
  this.y = 20;

  this.xOffSet = 50;
  this.yOffSet = -5;
  this.size = 50;

  this.input;

  this.input = createInput("0");
  this.input.input(angleInputChanged);
  this.input.position(this.x + this.xOffSet, this.y + this.yOffSet);
  this.input.size(this.size);

  this.value = (value) => {
    return this.input.value(int(value));
  };

  this.reset = () => {
    this.input.value("0");
  };
}

angleInputLabel = function () {
  text("Angle:", angleInput.x, angleInput.y);
};
p5.prototype.registerMethod("post", angleInputLabel);

function angleInputChanged() {
  craneCollection.setAngleDiff(int(this.value()));
  craneCollection.updateTimeDiff();
}
