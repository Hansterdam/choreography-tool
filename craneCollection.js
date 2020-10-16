function CraneCollection() {
  this.initValues = [
    [[200, 500], -45],
    [[450, 300], 45],
    [[600, 200], 135],
    [[540, 380], 225],
  ];
  this.cranes = [];
  this.selected = [];

  this.init = () => {
    this.cranes = this.initValues.map((values, index) => {
      return this.initCrane(index, values);
    });

    this.selected = this.cranes.map(() => {
      return true;
    });
  };

  this.initCrane = (index, values) => {
    let crane = new Crane();
    crane.init(index, ...values);
    return crane;
  };

  this.primary = () => {
    return this.cranes[primary];
  };

  this.hasSteps = () => {
    return this.cranes.reduce((hasSteps, crane) => {
      return hasSteps ? hasSteps : crane.steps.length > 1;
    }, false);
  };

  this.draw = () => {
    this.cranes.map((crane, index) => {
      crane.draw(index == primary);
    });
  };

  this.mouseHover = () => {
    return this.cranes.reduce((hover, crane, index) => {
      if (crane.selected && hover === false) {
        return crane.mouseHover() ? index : false;
      }
      return hover;
    }, false);
  };

  this.updateAngleDiff = () => {
    let angleDiff = this.primary().updateAngleDiff();
    this.cranes.map((crane, index) => {
      if (crane.selected && index !== primary) {
        crane.angleDiff = angleDiff;
      }
    });
  };

  this.setAngleDiff = (value) => {
    this.cranes.map((crane) => {
      if (crane.selected) {
        crane.angleDiff = value;
      }
    });
    angleInput.value(this.primary().angleDiff);
  };

  this.updateTimeDiff = () => {
    this.cranes.map((crane) => {
      if (crane.selected) {
        crane.timeDiff = crane.minTimeDiff();
      }
    });
    timeInput.value(this.primary().timeDiff);
  };

  this.setTimeDiff = (value) => {
    this.cranes.map((crane) => {
      if (crane.selected) {
        crane.timeDiff = value;
      }
    });
    timeInput.value(value);
  };

  this.saveStep = () => {
    this.cranes.map((crane) => {
      if (crane.selected) {
        crane.saveStep();
      }
    });
  };

  this.deleteStep = () => {
    this.cranes.map((crane) => {
      if (crane.selected) {
        crane.deleteStep();
      }
    });
  };

  this.resetValues = () => {
    this.cranes.map((crane, index) => {
      crane.resetValues();
    });
    angleInput.reset();
    timeInput.reset();
  };

  this.reset = () => {
    this.cranes.map((crane, index) => {
      crane.reset();
    });
    angleInput.reset();
    timeInput.reset();
  };

  this.setSelectedToPrimary = () => {
    this.cranes.map((crane, index) => {
      if (crane.selected && index !== primary) {
        crane.angleDiff = this.primary().angleDiff;
        crane.timeDiff = this.primary().timeDiff;
      }
    });
  };

  this.selectNewPrimary = () => {
    if (this.primary().selected) {
      return;
    }
    this.cranes.map((crane, index) => {
      if (crane.selected) {
        primary = index;
      }
    });
    angleInput.value(this.primary().angleDiff);
    timeInput.value(this.primary().timeDiff);
  };

  this.maxTimeTotal = () => {
    return this.cranes.reduce((max, crane) => {
      return crane.lastStep()[1][0] > max ? crane.lastStep()[1][0] : max;
    }, 0);
  };

  this.setToTime = (timeValue) => {
    this.cranes.map((crane) => {
      crane.setToTime(timeValue);
    });
  };

  this.setToLastStep = () => {
    this.cranes.map((crane) => {
      crane.setToLastStep();
    });
  };
}
