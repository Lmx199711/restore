var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var a;
var r_ShopSystem = require("ShopSystem");
var r_ShopCfg = require("ShopCfg");
var def_ShopMap = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.gridList = [];
    t.gridObject = {};
    t.crossY = 13;
    t.verticalX = 9;
    t.size = 58;
    t.intervalX = 5;
    t.intervalY = 5;
    t.m_chessMap = [];
    t.m_propImgs = [];
    t.m_propIds = [];
    t.m_dragonBall = [0, 1, 2, 3, 4, 5, 6];
    t.m_index = -1;
    return t;
  }
  __extends(_ctor, e);
  Object.defineProperty(_ctor.prototype, "propIds", {
    get: function () {
      return this.m_propIds;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.init = function () {
    var e = 0;
    for (var t = 0; t < this.crossY; t++) {
      this.m_chessMap.push([]);
      for (var o = 0; o < this.verticalX; o++) {
        this.m_chessMap[t].push({
          has: 0,
          id: e
        });
        var i = this.getUI("ui://Shop/gridItem");
        i.getController("state").selectedIndex = 0;
        i.getController("type").selectedIndex = e % 2 == 0 ? 0 : 1;
        i.y = (this.size + this.intervalY) * t;
        i.x = (this.size + this.intervalX) * o;
        i.name = o + "_" + t;
        this.gridObject[i.name] = i;
        this.addChildAt(i, 0);
        i.sortingOrder = 0;
        this.gridList.push(i);
        e++;
      }
    }
    this.touchItem = this.getChild("touchItem").asLoader;
    this.touchItem.sortingOrder = 3;
  };
  _ctor.prototype.restart = function () {
    this.m_propImgs.forEach(function (e) {
      e.dispose();
    });
    this.m_propImgs = [];
    this.m_propIds = [];
    this.touchItem.visible = false;
    this.clear();
    this.showgridType();
  };
  _ctor.prototype.clear = function () {
    this.m_chessMap.forEach(function (e) {
      e.forEach(function (e) {
        e.has = 0;
      });
    });
  };
  _ctor.prototype.getMatrixByPx = function (e) {
    if (e.x < 0 || e.y < 0) {
      return null;
    }
    var t = this.gridList.find(function (t) {
      return t.x <= e.x && t.x + t.width >= e.x && t.y <= e.y && t.y + t.height >= e.y;
    });
    if (!t) {
      return null;
    }
    var o = t.name.split("_");
    return cc.v2(parseInt(o[0]), parseInt(o[1]));
  };
  _ctor.prototype.checkPlace = function (e, t) {
    var o = this;
    this.showgridType();
    if (!e) {
      return false;
    }
    var i = true;
    t.forEach(function (t) {
      var n = cc.v2(t.x + e.x, t.y + e.y);
      o.checkIshas(n) || (i = false);
    });
    i && this.showPlace(e, t);
    return i;
  };
  _ctor.prototype.showPlace = function (e, t) {
    var o = this;
    t.forEach(function (t) {
      var i = cc.v2(t.x + e.x, t.y + e.y);
      o.gridObject[i.x + "_" + i.y].getController("state").selectedIndex = 1;
    });
  };
  _ctor.prototype.checkIshas = function (e) {
    if (e.y < 0 || e.y >= this.m_chessMap.length) {
      return false;
    }
    if (e.x < 0 || e.x >= this.m_chessMap[0].length) {
      return false;
    }
    if (!this.m_chessMap[e.y]) {
      return false;
    }
    var t = this.m_chessMap[e.y][e.x];
    return !!t && 1 != t.has;
  };
  _ctor.prototype.showgridType = function () {
    var e = this;
    this.m_chessMap.forEach(function (t, o) {
      t.forEach(function (t, i) {
        e.gridObject[i + "_" + o].getController("state").selectedIndex = t.has;
      });
    });
  };
  _ctor.prototype.setPropToMap = function (e, t, o) {
    var i = new fgui.GLoader();
    i.autoSize = true;
    i.url = "ui://Shop/" + e.name;
    var n = this.getPxByMatrix(t);
    90 == o && (n = r_ShopSystem.ShopSystem.getChange0to90(n, i.width, i.height));
    i.x = n.x;
    i.y = n.y;
    i.pivotX = .5;
    i.pivotY = .5;
    i.rotation = o;
    if (25 == e.id) {
      this.addChildAt(i, 1);
      i.sortingOrder = 1;
    } else {
      this.addChildAt(i, 2);
      i.sortingOrder = 2;
    }
    this.m_propImgs.push(i);
    this.m_propIds.push(e.id);
    i.on(fgui.Event.TOUCH_BEGIN, this.touchBegin.bind(this, this.m_propImgs.length - 1), this);
    i.on(fgui.Event.TOUCH_MOVE, this.touchMove.bind(this, this.m_propImgs.length - 1), this);
    i.on(fgui.Event.TOUCH_END, this.touchEnd.bind(this, this.m_propImgs.length - 1), this);
    this.setGridState(t, e["grids" + o]);
  };
  _ctor.prototype.checkSummonDragon = function () {
    return this.getArr().length >= 7;
  };
  _ctor.prototype.getArr = function () {
    var e = this.m_propIds;
    var t = [];
    e.forEach(function (e) {
      e < 7 && !t.includes(e) && t.push(e);
    });
    return t;
  };
  _ctor.prototype.setGridState = function (e, t, o) {
    var i = this;
    undefined === o && (o = 1);
    t.forEach(function (t) {
      var n = cc.v2(t.x + e.x, t.y + e.y);
      i.m_chessMap[n.y][n.x].has = o;
    });
  };
  _ctor.prototype.getPxByMatrix = function (e) {
    var t = cc.v2();
    t.x = this.gridObject[e.x + "_" + e.y].x;
    t.y = this.gridObject[e.x + "_" + e.y].y;
    return t;
  };
  _ctor.prototype.onDestruct = function () {};
  _ctor.prototype.getUI = function (e) {
    return fgui.UIPackage.createObjectFromURL(e);
  };
  _ctor.prototype.touchBegin = function (e, t) {
    var o = r_ShopCfg.ShopPropCfg[this.m_propIds[e]];
    if (o) {
      this.touchItem.url = "ui://Shop/" + o.name;
      this.touchItem.visible = true;
      this.touchItem.rotation = this.m_propImgs[e].rotation;
      t.captureTouch();
      var i = t.pos;
      this.m_index = e;
      this.touchItem.x = this.m_propImgs[e].x;
      this.touchItem.y = this.m_propImgs[e].y;
      this.m_propImgs[e].alpha = 0;
      this.m_initTouchVect = cc.v2(this.touchItem.x, this.touchItem.y);
      this.m_initMoveVect = i.clone();
      var n = this.touchItem.rotation;
      var a = cc.v2(this.m_propImgs[e].x, this.m_propImgs[e].y);
      90 == n && (a = r_ShopSystem.ShopSystem.getChange90to0(a, this.m_propImgs[e].width, this.m_propImgs[e].height));
      var c = this.getMatrixByPx(cc.v2(a.x + 29, a.y + 29));
      this.setGridState(c, o["grids" + n], 0);
      this.showgridType();
    }
  };
  _ctor.prototype.touchMove = function (e, t) {
    var o = r_ShopCfg.ShopPropCfg[this.m_propIds[this.m_index]];
    if (o) {
      var i = t.pos;
      this.checkGridPos(o, i);
    }
  };
  _ctor.prototype.checkGridPos = function (e, t) {
    var o = t.sub(this.m_initMoveVect);
    this.touchItem.x = this.m_initTouchVect.x + o.x;
    this.touchItem.y = this.m_initTouchVect.y + o.y;
    var i = cc.v2(this.touchItem.x, this.touchItem.y);
    90 == this.touchItem.rotation && (i = r_ShopSystem.ShopSystem.getChange90to0(i, this.touchItem.width, this.touchItem.height));
    var n = cc.v2(i.x + 29, i.y + 29);
    var a = this.getMatrixByPx(n);
    if (a) {
      return {
        isPlace: this.checkPlace(a, e["grids" + this.touchItem.rotation]),
        matrix: a
      };
    } else {
      this.showgridType();
      return null;
    }
  };
  _ctor.prototype.touchEnd = function (e, t) {
    var o = r_ShopCfg.ShopPropCfg[this.m_propIds[this.m_index]];
    if (o) {
      var i = t.pos;
      var n = this.checkGridPos(o, i);
      var a = this.touchItem.rotation;
      if (n && n.isPlace) {
        var c = this.getPxByMatrix(n.matrix);
        90 == this.m_propImgs[this.m_index].rotation && (c = r_ShopSystem.ShopSystem.getChange0to90(c, this.m_propImgs[this.m_index].width, this.m_propImgs[this.m_index].height));
        this.m_propImgs[this.m_index].x = c.x;
        this.m_propImgs[this.m_index].y = c.y;
        this.setGridState(n.matrix, o["grids" + a]);
      } else {
        c = cc.v2(this.m_propImgs[this.m_index].x, this.m_propImgs[this.m_index].y);
        90 == this.m_propImgs[this.m_index].rotation && (c = r_ShopSystem.ShopSystem.getChange90to0(c, this.m_propImgs[this.m_index].width, this.m_propImgs[this.m_index].height));
        var l = this.getMatrixByPx(cc.v2(c.x + 29, c.y + 29));
        this.setGridState(l, o["grids" + a]);
      }
      this.m_propImgs[this.m_index].alpha = 1;
      this.touchItem.visible = false;
      this.showgridType();
    }
  };
  _ctor.prototype.checkFull = function () {
    var e = true;
    this.m_chessMap.forEach(function (t) {
      t.forEach(function (t) {
        0 == t.has && (e = false);
      });
    });
    return e;
  };
  return _ctor;
}(fgui.GComponent);
exports.default = def_ShopMap;
(function (e) {
  e[e["空"] = 0] = "空";
  e[e["存在"] = 1] = "存在";
})(a || (a = {}));