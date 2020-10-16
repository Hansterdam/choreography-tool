function ModeSelector() {
  this.x = 20;
  this.y = 90;
  this.width = 110;

  this.radio;

  this.radio = createRadio();
  this.radio.option("input mode");
  this.radio.option("replay mode");
  this.radio.position(this.x, this.y);
  this.radio.style("width", this.width + "px");
  this.radio.selected("input mode");
  this.radio.input(modeSelected);

  this.isInput = () => {
    return this.radio.value() === "input mode";
  };
}

function modeSelected() {
  if (modeSelector.isInput()) {
    craneCollection.setToLastStep();
    timeScale.disable();
  } else {
    craneCollection.resetValues();
    timeScale.enable();
  }
}
