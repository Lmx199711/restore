var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PetStoryUI = undefined;
var r_TYIndex = require("TYIndex");
var r_UIDef = require("UIDef");
var r_ResSystem = require("ResSystem");
var r_TimeSystem = require("TimeSystem");
var r_FguiResSystem = require("FguiResSystem");
var exp_PetStoryUI = function (e) {
  function _ctor() {
    var t = e.call(this, r_UIDef.UIDef.Pack.Pet, r_UIDef.UIDef.Res.UI.PetStoryUI) || this;
    t.index = 0;
    t.msg = ["很久很久以前，从天外降落一枚圣物", "据说它能实现任何愿望", "为了得到它，武林各派群雄逐鹿，最终圣物却不知所踪", "据说圣物有灵，唯有武林至尊方能得到它", "为了完成许久未能实现的愿望", "你踏上了打败诸多武林强者，成为武林至尊的第一步"];
    return t;
  }
  __extends(_ctor, e);
  _ctor.showUI = function (e, t) {
    this.show(r_UIDef.UIDef.Urls.UI.PetStoryUI, e, t);
  };
  _ctor.hide = function () {
    e.hide.call(this, r_UIDef.UIDef.Urls.UI.PetStoryUI);
  };
  _ctor.prototype.onInit = function () {
    var t = this;
    e.prototype.onInit.call(this);
    this.contentPane.getChild("btnBack").onClick(function () {
      t.hide();
    }, this);
  };
  _ctor.prototype.onShown = function () {
    e.prototype.onShown.call(this);
    this.bringToFront();
    this.index = 0;
    for (var t = 0; t < 3; t++) {
      this.contentPane.getChild("" + t).asLoader.url = "";
    }
    this.showStory();
  };
  _ctor.prototype.onHide = function () {
    e.prototype.onHide.call(this);
    r_TimeSystem.TimeSystem.scheduleClear("petStory");
  };
  _ctor.prototype.showStory = function () {
    var e = this;
    if (this.index > 5) {
      this.hide();
    } else {
      if (3 == this.index) {
        for (var t = 0; t < 3; t++) {
          this.contentPane.getChild("" + t).asLoader.url = "";
        }
      }
      this.getTex(this.contentPane.getChild("" + this.index % 3), this.index + 1);
      this.contentPane.getChild("desc").text = this.msg[this.index];
      r_TimeSystem.TimeSystem.scheduleOnce("petStory", 2, function () {
        e.index++;
        e.showStory();
      });
    }
  };
  _ctor.prototype.getTex = function (e, t) {
    var o = this;
    r_ResSystem.ResSystem.loadBundleRes("game3", "pet/tex/" + t, cc.SpriteFrame, function (t, i) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(o, i);
      e.texture = i;
    });
  };
  return _ctor;
}(r_TYIndex.UIWind);
exports.PetStoryUI = exp_PetStoryUI;