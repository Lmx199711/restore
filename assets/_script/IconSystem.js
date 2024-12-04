Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconSystem = undefined;
var i = function () {
  function e() {
    this.blockBtns = [];
    this.mainHomeBtnList = ["btnEquip", "btnRoom", "btnGoout", "btnPhone", "btnMinGame", "btnEarn", "btnAtuo", "btnWedding", "btnBride", "btnFere", "btnFairy"];
    this.mainHomeUI = null;
    this.mainHomeCenter = null;
    this.initHideBtn = ["mainTask"];
    this.isGuiding = false;
  }
  e.prototype.startGuide = function () {
    var e = this;
    for (var t = 0; t < this.mainHomeBtnList.length; t++) {
      this.mainHomeUI.contentPane.getChild(this.mainHomeBtnList[t]).visible = false;
    }
    this.initHideBtn.forEach(function (t) {
      return e.mainHomeUI.contentPane.getChild(t).visible = false;
    });
    this.isGuiding = true;
  };
  e.prototype.initMainHome = function (e) {
    this.mainHomeUI = e;
    this.mainHomeCenter = this.mainHomeUI.contentPane.getChild("center");
    for (var t = 0; t < this.mainHomeBtnList.length; t++) {
      var o = this.mainHomeUI.contentPane.getChild(this.mainHomeBtnList[t]);
      o.node.startX = o.node.x;
      o.node.startY = o.node.y;
    }
  };
  e.prototype.showMainHomeBtn = function () {
    for (var e = 0; e < this.mainHomeBtnList.length; e++) {
      if (-1 == this.blockBtns.indexOf(this.mainHomeBtnList[e])) {
        var t = this.mainHomeUI.contentPane.getChild(this.mainHomeBtnList[e]);
        t.visible = true;
        t.node.scale = .8;
        cc.Tween.stopAllByTarget(t.node);
        cc.tween(t.node).to(.2, {
          scale: 1.1
        }, {
          easing: cc.easing.smooth
        }).to(.05, {
          scale: 1
        }, {
          easing: cc.easing.smooth
        }).call(function () {}).start();
        this.isGuiding = false;
      }
    }
  };
  e.prototype.flyMainHomeIcon = function (e, t) {
    var o = this.mainHomeUI.contentPane.getChild(e);
    o.visible = true;
    o.node.x = this.mainHomeCenter.node.x;
    o.node.y = this.mainHomeCenter.node.y;
    o.node.scale = 0;
    cc.Tween.stopAllByTarget(o.node);
    cc.tween(o.node).to(.1, {
      scale: 1
    }, {
      easing: cc.easing.smooth
    }).to(.5, {
      x: o.node.startX,
      y: o.node.startY
    }, {
      easing: cc.easing.smooth
    }).call(function () {
      t && t();
    }).start();
  };
  return e;
}();
exports.IconSystem = new i();