var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_BaseWin = require("BaseWin");
var def_BaseStepUI = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.m_currStep = 0;
    t.execIndex = 0;
    t.flowCfg = null;
    t.m_isStop = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onInit = function () {
    e.prototype.onInit.call(this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.restart();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
  };
  _ctor.prototype.restart = function () {
    this.initView();
    this.setFlow(0);
  };
  _ctor.prototype.stopStep = function () {
    this.m_isStop = true;
  };
  _ctor.prototype.initView = function () {
    this.contentPane.getTransition("init").play();
    this.initProp();
  };
  _ctor.prototype.setFlow = function (e) {
    this.m_isStop = false;
    this.m_currId = e;
    this.step = 0;
  };
  Object.defineProperty(_ctor.prototype, "step", {
    set: function (e) {
      var t = this.flowCfg[this.m_currId];
      this.m_currStep = e;
      this.execIndex = 0;
      this.contentPane.getController("mode").selectedIndex = t.steps[this.m_currStep].modeIndex;
      this.execute(this.getCurrExecuteData());
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.execute = function (e) {
    var t = this;
    if (!this.m_isStop) {
      this.onExecute({
        currId: this.m_currId,
        currStep: this.m_currStep,
        execIndex: this.execIndex
      });
      switch (e.type) {
        case "anim":
          this.contentPane._transitions.forEach(function (e) {
            e.stop();
          });
          this.contentPane.getTransition(e.name).play(function () {
            t.execIndex++;
            t.execute(t.getCurrExecuteData());
          });
          break;
        case "fun":
          this[e.name].bind(this, function () {
            t.execIndex++;
            t.execute(t.getCurrExecuteData());
          })();
          break;
        case "next":
          return void (this.m_currStep < this.getMaxStep() - 1 ? this.step = ++this.m_currStep : this.reusltLogic());
        default:
          return void this.execIndex++;
      }
    }
  };
  _ctor.prototype.getCurrExecuteData = function () {
    return this.flowCfg[this.m_currId].steps[this.m_currStep].exec[this.execIndex];
  };
  _ctor.prototype.getMaxStep = function () {
    return this.flowCfg[this.m_currId].steps.length;
  };
  Object.defineProperty(_ctor.prototype, "currId", {
    get: function () {
      return this.m_currId;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(_ctor.prototype, "currStep", {
    get: function () {
      return this.m_currStep;
    },
    enumerable: false,
    configurable: true
  });
  return _ctor;
}(r_BaseWin.BaseWin);
exports.default = def_BaseStepUI;