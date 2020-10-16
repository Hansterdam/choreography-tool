function TimeScale() {
  this.x = 20;
  this.y = 670;

  this.width = 800;

  this.precision = 10;

  this.slider = createSlider(0, 0, 0, this.precision);
  this.slider.position(this.x, this.y);
  this.slider.style("width", this.width + "px");
  this.slider.attribute("disabled", true);
  this.slider.input(timeScaleChanged);

  this.setToMaxValue = () => {
    this.slider.value(craneCollection.maxTimeTotal());
  };

  this.disable = () => {
    this.slider.attribute("disabled", true);
  };

  this.enable = () => {
    this.slider.removeAttribute("disabled");
  };

  this.draw = () => {
    this.slider.attribute("max", craneCollection.maxTimeTotal());
    text(this.slider.attribute("min"), this.x, this.y - 20);
    text(this.slider.attribute("max"), this.width, this.y - 20);
    text(
      this.slider.value(),
      map(
        this.slider.value(),
        this.slider.attribute("min"),
        this.slider.attribute("max"),
        this.x,
        this.width
      ),
      this.y + 30
    );
  };
}

function timeScaleChanged() {
  craneCollection.setToTime(timeScale.slider.value());
}
