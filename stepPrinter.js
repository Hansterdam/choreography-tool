function StepPrinter() {
  this.x = 800;
  this.y = 20;
  this.xOffSet = 50;
  this.yOffSet = 17;

  this.print = () => {
    let xPos = this.x;
    let yPos = this.y;

    craneCollection.cranes.map((crane) => {
      text("Crane" + (crane.index + 1), xPos, yPos);
      yPos += this.yOffSet;
      crane.steps.map((step) => {
        let currentTime = timeScale.slider.value();
        if (
          currentTime <= step[1][0] &&
          currentTime > step[1][0] - step[0][0]
        ) {
          fill(255, 0, 0);
        }
        text(step[0][0], xPos, yPos);
        text(step[0][1], xPos, yPos + this.yOffSet);

        text(step[1][0], xPos + this.xOffSet, yPos);
        text(step[1][1], xPos + this.xOffSet, yPos + this.yOffSet);

        fill(0);
        line(
          xPos,
          yPos + this.yOffSet + 4,
          xPos + 2 * this.xOffSet,
          yPos + this.yOffSet + 4
        );

        yPos += 2 * this.yOffSet + 2;
      });
      xPos += 2 * this.xOffSet;
      yPos = this.y;
    });
  };
}
