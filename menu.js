function Menu() {
  this.x = 20;
  this.y = 140;
  this.yOffSet = 25;

  this.saveButton = createButton("Save step");
  this.saveButton.position(this.x, this.y);
  this.saveButton.mousePressed(saveStep);

  this.deleteButton = createButton("Delete step");
  this.deleteButton.position(this.x, this.y + this.yOffSet);
  this.deleteButton.mousePressed(deleteStep);

  this.resetButton = createButton("Reset values");
  this.resetButton.position(this.x, this.y + 2 * this.yOffSet);
  this.resetButton.mousePressed(resetValues);

  this.resetMenuButton = createButton("Reset all steps");
  this.resetMenuButton.position(this.x, this.y + 3 * this.yOffSet);
  this.resetMenuButton.mousePressed(showResetButtons);

  this.resetAllButton = createButton("Are you sure?");
  this.resetAllButton.position(this.x, this.y + 4 * this.yOffSet);
  this.resetAllButton.mousePressed(resetAll);
  this.resetAllButton.hide();

  this.cancelResetButton = createButton("Cancel");
  this.cancelResetButton.position(this.x, this.y + 5 * this.yOffSet);
  this.cancelResetButton.mousePressed(hideResetButtons);
  this.cancelResetButton.hide();

  this.downloadMenuButton = createButton("Download files");
  this.downloadMenuButton.position(20, downloadMenu[1]);
  this.downloadMenuButton.mousePressed(showDownloadMenu);

  this.nameInput = createInput("000");
  this.nameInput.position(downloadMenu[0] + 105, downloadMenu[1]);
  this.nameInput.size(30);
  this.nameInput.hide();

  this.downloadButton = createButton("Download");
  this.downloadButton.position(downloadMenu[0] + 137, downloadMenu[1]);
  this.downloadButton.mousePressed(downloadFiles);
  this.downloadButton.hide();

  this.cancelDownloadButton = createButton("Cancel");
  this.cancelDownloadButton.position(downloadMenu[0] + 214, downloadMenu[1]);
  this.cancelDownloadButton.mousePressed(hideDownloadMenu);
  this.cancelDownloadButton.hide();

  this.showConfirmationButtons = function () {
    this.resetAllButton.show();
    this.cancelResetButton.show();
  };

  this.hideConfirmationButtons = function () {
    this.resetAllButton.hide();
    this.cancelResetButton.hide();
  };

  this.showDownloadMenu = function () {
    this.nameInput.show();
    this.downloadButton.show();
    this.cancelDownloadButton.show();
  };

  this.hideDownloadMenu = function () {
    this.nameInput.hide();
    this.downloadButton.hide();
    this.cancelDownloadButton.hide();
  };
}

disableMenuButtons = function () {
  if (modeSelector.isInput() && craneCollection.cranes[primary].timeDiff > 0) {
    menu.saveButton.removeAttribute("disabled");
    menu.resetButton.removeAttribute("disabled");
  } else {
    menu.saveButton.attribute("disabled", true);
    menu.resetButton.attribute("disabled", true);
  }
  if (craneCollection.hasSteps()) {
    menu.downloadMenuButton.removeAttribute("disabled");
    menu.deleteButton.removeAttribute("disabled");
    menu.resetMenuButton.removeAttribute("disabled");
    modeSelector.radio.option("replay mode");
  } else {
    menu.downloadMenuButton.attribute("disabled", true);
    menu.deleteButton.attribute("disabled", true);
    menu.resetMenuButton.attribute("disabled", true);
    modeSelector.radio.remove("replay mode");
  }
};
p5.prototype.registerMethod("post", disableMenuButtons);

function showResetButtons() {
  menu.showConfirmationButtons();
}

function resetAll() {
  craneCollection.reset();
  menu.hideConfirmationButtons();
}

function hideResetButtons() {
  menu.hideConfirmationButtons();
}

function saveStep() {
  craneCollection.saveStep();
  resetValues();
}

function deleteStep() {
  craneCollection.deleteStep();
  resetValues();
}

function resetValues() {
  craneCollection.resetValues();
}

function showDownloadMenu() {
  menu.showDownloadMenu();
}

function hideDownloadMenu() {
  menu.hideDownloadMenu();
}

function downloadFiles() {
  craneCollection.cranes.map((crane, index) => {
    let writer = createWriter(
      "c" + (index + 1) + "-" + menu.nameInput.value() + ".txt"
    );
    crane.steps.slice(1).map((step) => {
      writer.print(step[0][0] + "\n" + step[0][1]);
    });
    writer.close();
    writer.clear();
  });
  menu.hideDownloadMenu();
}
