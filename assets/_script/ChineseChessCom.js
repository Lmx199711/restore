var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_ResSystem = require("ResSystem");
var r_ChineseChessUI = require("ChineseChessUI");
var r_UtilsSystem = require("UtilsSystem");
var r_PlayerData = require("PlayerData");
var r_SoundMgr = require("SoundMgr");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_ChineseChessCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.chessBoard = null;
    t.rule = ["Boss", "S", "X", "M", "C", "P", "B"];
    t.chessRes = {
      back: null,
      dot: null,
      Boss_R: null,
      S_R: null,
      X_R: null,
      C_R: null,
      M_R: null,
      P_R: null,
      B_R: null,
      Boss_B: null,
      S_B: null,
      X_B: null,
      C_B: null,
      M_B: null,
      P_B: null,
      B_B: null
    };
    t.chessNum = {
      Boss_R: 1,
      S_R: 2,
      X_R: 2,
      C_R: 2,
      M_R: 2,
      P_R: 2,
      B_R: 5,
      Boss_B: 1,
      S_B: 2,
      X_B: 2,
      C_B: 2,
      M_B: 2,
      P_B: 2,
      B_B: 5
    };
    t.changeChessNum = {};
    t.dotList = [];
    t.randomNum = 4;
    t.chessBackList = [];
    t.enemyList = [];
    t.isClick = false;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onLoad = function () {
    this.initChess();
    this.initBoard();
  };
  _ctor.prototype.initBoard = function () {
    var e = this;
    this.selectChess = null;
    this.isMyTurn = false;
    this.dotList = [];
    this.chessBackList = [];
    this.isShowFour = false;
    this.changeChessNum = JSON.parse(JSON.stringify(this.chessNum));
    this.chessBoard.children.forEach(function (t) {
      t.removeAllChildren();
      var o = cc.instantiate(e.chessRes.back);
      o.active = true;
      o.setPosition(0, 0);
      var i = "";
      for (var n in e.changeChessNum) {
        if ("" == i) {
          i = n;
          e.changeChessNum[n]--;
          0 == e.changeChessNum[n] && delete e.changeChessNum[n];
        }
        if (Math.random() < .25) {
          e.changeChessNum[i] || (e.changeChessNum[i] = 0);
          e.changeChessNum[i]++;
          i = n;
          e.changeChessNum[n]--;
          0 == e.changeChessNum[n] && delete e.changeChessNum[n];
          break;
        }
      }
      o.on(cc.Node.EventType.TOUCH_START, e.changeChessBack.bind(e, o, i));
      t.addChild(o);
      e.chessBackList.push(o);
    });
    this.chessBoard.off(cc.Node.EventType.TOUCH_START);
    this.chessBoard.on(cc.Node.EventType.TOUCH_START, function (t) {
      e.onClickBoard(t, e.chessBoard);
    });
  };
  _ctor.prototype.initChess = function () {
    var e = this;
    var t = function (t) {
      r_ResSystem.ResSystem.loadBundleRes("game1", "ChineseChess/chess/" + t, cc.Prefab, function (o, i) {
        if (o) {
          console.error(o);
        } else {
          e.chessRes[t] = cc.instantiate(i);
          e.chessRes[t].active = true;
        }
      });
    };
    for (var o in this.chessRes) t(o);
  };
  _ctor.prototype.changeChessBack = function (e, t, o) {
    var i = this;
    if (!this.isClick && r_ChineseChessUI.ChineseChessUI.instance.isStartGame && this.isMyTurn || this.isShowFour) {
      this.isClick = true;
      e.active = true;
      this.clearDot();
      if (1 == o) {
        var n = cc.instantiate(this.chessRes[t]);
        n.active = true;
        e.addChild(n);
        return void (this.isClick = false);
      }
      if (this.selectChess && -1 != this.getChessCanMove(this.selectChess.parent.name).indexOf(e.parent.name)) {
        return void this.attackChess(e, function () {
          i.chessBeEat(i.selectChess, t);
          i.isClick = false;
          i.changeTurn();
        });
      }
      this.selectChess && cc.tween(this.selectChess).to(.1, {
        y: 0,
        scale: 1
      }).call(function () {
        i.selectChess = null;
      }).start();
      r_SoundMgr.SoundMgr.playSound("chess/翻开棋子");
      e.runAction(cc.sequence(cc.scaleTo(.1, 0, 1), cc.scaleTo(.1, -1, 1), cc.callFunc(function () {
        var o = i.chessBackList.indexOf(e);
        -1 != o && i.chessBackList.splice(o, 1);
        var n = e.parent;
        var a = cc.instantiate(i.chessRes[t]);
        a.active = true;
        a.setPosition(0, 0);
        n.removeAllChildren();
        n.addChild(a);
        r_ChineseChessUI.ChineseChessUI.instance.isStartGame && i.enemyList.push({
          name: t,
          pos: n.name
        });
        i.isClick = false;
        if (0 == i.chessBackList.length && 0 == i.getEnemyChessInfo(true).length) {
          return r_ChineseChessUI.ChineseChessUI.instance.gameOver(false);
        }
      })));
      this.isShowFour || this.changeTurn();
    }
  };
  _ctor.prototype.showAllChessBack = function () {
    if (!(r_PlayerData.PlayerData.data.chessEgg && cc.sys.platform != cc.sys.DESKTOP_BROWSER && cc.sys.platform != cc.sys.MOBILE_BROWSER)) {
      this.isShowFour = true;
      this.chessBackList.forEach(function (e) {
        e.emit(cc.Node.EventType.TOUCH_START, true);
      });
      this.isShowFour = false;
    }
  };
  _ctor.prototype.clearAllChessBack = function () {
    this.chessBackList.forEach(function (e) {
      e.removeAllChildren();
      e.active = true;
    });
  };
  _ctor.prototype.chessClick = function (e, t) {
    var o = this;
    if (!this.selectChess) {
      if (r_ChineseChessUI.ChineseChessUI.instance.isFirst && "B" == t.name.slice(t.name.length - 1, t.name.length)) {
        return;
      }
      if (!r_ChineseChessUI.ChineseChessUI.instance.isFirst && "R" == t.name.slice(t.name.length - 1, t.name.length)) {
        return;
      }
      cc.tween(t).to(.1, {
        y: 10,
        scale: 1.1
      }).start();
      return void this.showChessPoint(t);
    }
    var i = function () {
      cc.tween(t).to(.1, {
        y: 10,
        scale: 1.1
      }).start();
      cc.tween(o.selectChess).to(.1, {
        y: 0,
        scale: 1
      }).start();
      o.showChessPoint(t);
    };
    if (this.selectChess == t) {
      cc.tween(t).to(.1, {
        y: 0,
        scale: 1
      }).start();
      this.selectChess = null;
      return void this.clearDot();
    }
    if (r_ChineseChessUI.ChineseChessUI.instance.isFirst) {
      if ("R" == t.name.slice(t.name.length - 1, t.name.length)) {
        i();
      } else {
        this.attackChess(t, this.changeTurn.bind(this));
      }
    } else if ("B" == t.name.slice(t.name.length - 1, t.name.length)) {
      i();
    } else {
      this.attackChess(t, this.changeTurn.bind(this));
    }
  };
  _ctor.prototype.onClickBoard = function (e) {
    var t = this;
    if (!this.isClick && r_ChineseChessUI.ChineseChessUI.instance.isStartGame && this.isMyTurn) {
      var o = null;
      for (var i = 0; i < this.chessBoard.children.length; i++) {
        o = this.chessBoard.children[i];
        if (r_UtilsSystem.UtilsSystem.touchInNode(o, e.getLocation())) {
          if (0 == o.childrenCount || "dot" == o.children[0].name) {
            break;
          }
          if ("back" != o.children[0].name) {
            return void this.chessClick(e, o.children[0]);
          }
        }
      }
      if (this.selectChess && -1 != this.getChessCanMove(this.selectChess.parent.name).indexOf(o.name)) {
        var n = o.convertToNodeSpaceAR(this.selectChess.parent.convertToWorldSpaceAR(cc.v2(0, 0)));
        this.selectChess.parent = o;
        this.selectChess.setPosition(n);
        r_SoundMgr.SoundMgr.playSound("chess/翻开棋子");
        cc.tween(this.selectChess).to(.2, {
          x: 0,
          y: 0
        }).call(function () {
          t.selectChess.scale = 1;
          t.selectChess = null;
          t.clearDot();
          t.changeTurn();
        }).start();
      }
    }
  };
  _ctor.prototype.showChessPoint = function (e) {
    var t = this;
    this.clearDot();
    this.selectChess = e;
    var o = this.selectChess.parent.name;
    this.getChessCanMove(o).forEach(function (e) {
      var o = t.chessBoard.getChildByName(e);
      var i = cc.instantiate(t.chessRes.dot);
      i.active = true;
      i.parent = o;
      t.dotList.push(i);
    });
  };
  _ctor.prototype.getChessCanMove = function (e, t) {
    undefined === t && (t = false);
    var o = Number(e.split("-")[1]);
    var i = Number(e.split("-")[0]);
    var n = this.getChessByPos(e);
    if (n && "P" == n.split("_")[0]) {
      return this.getPaoPath(o, i, n);
    }
    var a = [];
    var s = [];
    if (o > 1 && o < 4) {
      a.push(i + "-" + (o + 1));
      a.push(i + "-" + (o - 1));
    } else if (1 == o) {
      a.push(i + "-" + (o + 1));
    } else {
      4 == o && a.push(i + "-" + (o - 1));
    }
    if (i > 1 && i < 8) {
      a.push(i + 1 + "-" + o);
      a.push(i - 1 + "-" + o);
    } else if (1 == i) {
      a.push(i + 1 + "-" + o);
    } else {
      8 == i && a.push(i - 1 + "-" + o);
    }
    if (t) {
      return a;
    }
    for (var r = 0; r < a.length; r++) {
      var c = this.getChessByPos(a[r]);
      if (c) {
        var l = n.split("_");
        var u = c.split("_");
        "B" == l[0] && "Boss" == u[0] && l[1] != u[1] && s.push(a[r]);
        "Boss" == l[0] && "B" == u[0] || !u[1] || u[1] == l[1] || this.rule.indexOf(l[0]) > this.rule.indexOf(u[0]) || s.push(a[r]);
      } else {
        null == c && s.push(a[r]);
      }
    }
    return s;
  };
  _ctor.prototype.getPaoPath = function (e, t, o) {
    var i = this;
    var n = [];
    var a = [];
    var s = [];
    var r = function (t, s, c) {
      undefined === c && (c = false);
      if (!(t < 0 || t > 4) && -1 == a.indexOf(t)) {
        a.push(t);
        var l = i.getChessByPos(s + "-" + t);
        l == o && t == e && (l = null);
        if (l && c) {
          t != e && l[l.length - 1] != o[o.length - 1] && n.push(s + "-" + t);
        } else {
          l && !c && (c = true);
          r(t + 1, s, c);
          r(t - 1, s, c);
        }
      }
    };
    var c = function (e, a, r) {
      undefined === r && (r = false);
      if (!(a < 0 || a > 8) && -1 == s.indexOf(a)) {
        s.push(a);
        var l = i.getChessByPos(a + "-" + e);
        l == o && a == t && (l = null);
        if (l && r) {
          a != t && l[l.length - 1] != o[o.length - 1] && n.push(a + "-" + e);
        } else {
          l && !r && (r = true);
          c(e, a + 1, r);
          c(e, a - 1, r);
        }
      }
    };
    r(e, t, false);
    c(e, t, false);
    return n;
  };
  _ctor.prototype.clearDot = function () {
    this.dotList.forEach(function (e) {
      e.destroy();
    });
    this.dotList = [];
  };
  _ctor.prototype.getChessByPos = function (e) {
    var t = this.chessBoard.getChildByName(e);
    if (t) {
      if (0 == t.childrenCount || "dot" == t.children[0].name) {
        return null;
      } else {
        return t.children[0].name;
      }
    }
  };
  _ctor.prototype.attackChess = function (e, t) {
    var o = this;
    var i = false;
    var n = this.getChessCanMove(this.selectChess.parent.name);
    for (var a = 0; a < n.length; a++) {
      if (n[a] == e.parent.name) {
        i = true;
        break;
      }
    }
    if (i) {
      var s = this.selectChess.parent;
      var r = s.parent.convertToNodeSpaceAR(this.selectChess.convertToWorldSpaceAR(cc.v2(0, 0)));
      this.selectChess.parent = s.parent;
      this.selectChess.setPosition(r);
      r = s.parent.convertToNodeSpaceAR(e.convertToWorldSpaceAR(cc.v2(0, 0)));
      var c = this.isMyTurn ? "玩家吃子" : "AI吃子";
      r_SoundMgr.SoundMgr.playSound("chess/" + c);
      cc.tween(this.selectChess).to(.2, {
        x: r.x,
        y: r.y
      }).call(function () {
        var i = o.chessBackList.indexOf(e);
        -1 != i && o.chessBackList.splice(i, 1);
        "back" != e.name && o.chessBeEat(e.parent, e.name);
        o.selectChess.parent = e.parent;
        o.selectChess.scale = 1;
        o.selectChess.setPosition(0, 0);
        o.clearDot();
        s.removeAllChildren();
        t && t();
        o.selectChess = null;
        e.destroy();
      }).start();
    }
  };
  _ctor.prototype.chessBeEat = function (e, t) {
    var o = this;
    var i = cc.instantiate(this.chessRes[t]);
    i.active = true;
    var n = e.parent.convertToNodeSpaceAR(e.convertToWorldSpaceAR(cc.v2(0, 0)));
    i.parent = e.parent;
    i.setPosition(n);
    i.setSiblingIndex(999);
    var a = r_ChineseChessUI.ChineseChessUI.instance.isFirst ? "B" : "R";
    var s = t.slice(t.length - 1, t.length) == a;
    var c = r_ChineseChessUI.ChineseChessUI.instance[s ? "mineList" : "enemyList"];
    var l = this.rule.indexOf(t.split("_")[0]);
    n = e.parent.convertToNodeSpaceAR(c[l].node.node.convertToWorldSpaceAR(cc.v2(0, 0)));
    cc.tween(i).to(.5, {
      x: n.x,
      y: n.y
    }).call(function () {
      i.destroy();
      r_ChineseChessUI.ChineseChessUI.instance.addKillChess(s, l, s == r_ChineseChessUI.ChineseChessUI.instance.isFirst ? 7 : 0);
      setTimeout(function () {
        if (0 == o.getEnemyChessInfo(true).length && 0 == o.chessBackList.length && o.isMyTurn) {
          return r_ChineseChessUI.ChineseChessUI.instance.gameOver(false);
        } else if (o.isCanWin() || 0 != o.chessBackList.length) {
          return undefined;
        } else {
          return r_ChineseChessUI.ChineseChessUI.instance.gameOver(false);
        }
      }, 500);
    }).start();
  };
  _ctor.prototype.showRandom = function (e, t, o) {
    var i = this;
    undefined === t && (t = false);
    undefined === o && (o = false);
    this.isShowFour = true;
    var n = [];
    e > this.chessBackList.length && (e = this.chessBackList.length);
    var a = [];
    if (t) {
      this.chessBackList.forEach(function (e) {
        var t = i.getEnemyChessInfo(o);
        var n = false;
        for (var s = 0; s < t.length; s++) {
          i.getChessCanMove(t[s].pos, true).find(function (t) {
            t == e.parent.name && (n = true);
          });
        }
        n || a.push(e);
      });
      0 == a.length && (a = this.chessBackList);
    } else {
      a = this.chessBackList;
    }
    for (var s = 0; s < e; s++) {
      var r = Math.floor(Math.random() * a.length);
      if (-1 == n.indexOf(r)) {
        n.push(r);
        a[r].emit(cc.Node.EventType.TOUCH_START);
      } else {
        s--;
      }
    }
    this.isShowFour = false;
  };
  _ctor.prototype.showPos = function (e, t, o) {
    undefined === t && (t = false);
    undefined === o && (o = false);
    var i = this.chessBoard.getChildByName(e);
    if (t) {
      var n = this.getEnemyChessInfo(o);
      for (var a = 0; a < n.length; a++) {
        this.getChessCanMove(n[a].pos, true).find(function (t) {
          if (t == e) {
            return false;
          }
        });
      }
    }
    return !(!i || !i.childrenCount || "dot" == i.children[0].name || -1 == this.chessBackList.indexOf(i.children[0]) || (this.isShowFour = true, i.children[0].emit(cc.Node.EventType.TOUCH_START), this.isShowFour = false, 0));
  };
  _ctor.prototype.changeTurn = function () {
    this.isMyTurn = !this.isMyTurn;
    this.isMyTurn || this.scheduleOnce(this.aiOperation.bind(this), 1);
  };
  _ctor.prototype.aiOperation = function () {
    var e = this;
    var t = this.getCanAttackChess();
    console.log(t);
    var o = this.getEnemyChessInfo();
    var i = this.getEnemyChessInfo(true);
    var n = this.getDangerChess();
    var a = function () {
      var o = e.chessBoard.getChildByName(t[0].pos);
      e.selectChess = o.children[0];
      e.showChessPoint(e.selectChess);
      var i = e.chessBoard.getChildByName(t[0].attackPos);
      if ("back" == i.children[0].name) {
        e.isShowFour = true;
        i.children[0].emit(cc.Node.EventType.TOUCH_START);
        e.isShowFour = false;
      } else {
        e.attackChess(i.children[0], function () {
          e.changeTurn();
        });
      }
    };
    var s = function (t, o) {
      undefined === t && (t = false);
      if (!e.runAway(n) && !(e.AIChessMove() || o && o())) {
        if (e.chessBackList.length > 0) {
          e.showRandom(1, t, true);
          return e.changeTurn();
        } else {
          return r_ChineseChessUI.ChineseChessUI.instance.gameOver(true);
        }
      }
    };
    var c = function (t, o) {
      undefined === o && (o = false);
      var i = e.getChessCanMove(t, true);
      for (var n = 0; n < i.length; n++) {
        if (e.showPos(i[n], o, true)) {
          e.changeTurn();
          return true;
        }
      }
      return false;
    };
    if (0 == r_ChineseChessUI.ChineseChessUI.instance.difficultyController.selectedIndex) {
      if (0 == t.length) {
        return void s();
      }
      a();
    } else if (1 == r_ChineseChessUI.ChineseChessUI.instance.difficultyController.selectedIndex) {
      if (t.length > 0) {
        a();
      } else {
        s(false, function () {
          for (var e = 0; e < o.length; e++) {
            if ("Boss" == o[e].name.split("_")[0] && c(o[e].pos)) {
              return true;
            }
          }
          for (e = 0; e < i.length; e++) {
            if ("B" == i[e].name.split("_")[0] && c(i[e].pos)) {
              return true;
            }
          }
          return false;
        });
      }
    } else if (2 == r_ChineseChessUI.ChineseChessUI.instance.difficultyController.selectedIndex) {
      if (t.length > 0) {
        a();
      } else {
        var l = function () {
          for (var e = 0; e < i.length; e++) {
            if ("B" == i[e].name.split("_")[0] && c(i[e].pos, true)) {
              return true;
            }
          }
          return false;
        };
        var u = function () {
          for (var t = 0; t < o.length; t++) {
            if ("Boss" == o[t].name.split("_")[0]) {
              var n = 0;
              for (var a = 0; a < i.length; a++) {
                "B" == i[a].name.split("_")[0] && n++;
              }
              if ((5 - (n += r_ChineseChessUI.ChineseChessUI.instance.enemyList[6].num)) / e.chessBackList.length < .2 && c(o[t].pos, true)) {
                return true;
              }
            }
          }
          return false;
        };
        s(true, function () {
          return !!u() || !!l() || undefined;
        });
      }
    }
  };
  _ctor.prototype.getCanAttackChess = function () {
    var e;
    var t = this;
    var o = this.getEnemyChessInfo();
    var i = [];
    e = r_ChineseChessUI.ChineseChessUI.instance.isFirst ? "B" : "R";
    o.forEach(function (o) {
      t.getChessCanMove(o.pos).forEach(function (n) {
        var a = t.getChessByPos(n);
        if (a && a[a.length - 1] != e) {
          var s = JSON.parse(JSON.stringify(o));
          s.attack = a;
          s.attackPos = n;
          i.push(s);
        }
      });
    });
    i.sort(function (e, o) {
      return (-1 == t.rule.indexOf(e.attack.split("_")[0]) ? t.rule.length + 1 : t.rule.indexOf(e.attack.split("_")[0])) - (-1 == t.rule.indexOf(o.attack.split("_")[0]) ? t.rule.length + 1 : t.rule.indexOf(e.attack.split("_")[0]));
    });
    return i;
  };
  _ctor.prototype.getEnemyChessInfo = function (e) {
    undefined === e && (e = false);
    var t;
    var o = [];
    var i = e ? !r_ChineseChessUI.ChineseChessUI.instance.isFirst : r_ChineseChessUI.ChineseChessUI.instance.isFirst;
    t = i ? "B" : "R";
    this.chessBoard.children.forEach(function (e) {
      if (0 != e.childrenCount && e.children[0].name.slice(e.children[0].name.length - 1, e.children[0].name.length) == t) {
        var i = {
          name: e.children[0].name,
          pos: e.name
        };
        o.push(i);
      }
    });
    return o;
  };
  _ctor.prototype.getDangerList = function (e, t) {
    undefined === e && (e = false);
    var o = this.getEnemyChessInfo(!e);
    var i = [];
    for (var n = 0; n < o.length; n++) {
      var a = o[n];
      t && this.rule.indexOf(a.name.split("_")[0]) > this.rule.indexOf(t.split("_")[0]) || this.getChessCanMove(a.pos).forEach(function (e) {
        -1 == i.indexOf(e) && i.push(e);
      });
    }
    return i;
  };
  _ctor.prototype.getDangerChess = function (e) {
    var t = this;
    undefined === e && (e = false);
    var o = this.getDangerList(e);
    var i = this.getEnemyChessInfo(e);
    var n = [];
    i.forEach(function (e) {
      -1 != o.indexOf(e.pos) && n.push(e);
    });
    n.sort(function (e, o) {
      return t.rule.indexOf(e.name.split("_")[0]) - t.rule.indexOf(o.name.split("_")[0]);
    });
    return n;
  };
  _ctor.prototype.runAway = function (e) {
    if (0 == e.length) {
      return false;
    }
    var t = null;
    var o = null;
    for (var i = 0; i < e.length; i++) {
      var n = this.getChessCanMove(e[i].pos);
      var a = this.getDangerList(false, e[i].name);
      for (var s = 0; s < n.length; s++) {
        if (0 == this.chessBoard.getChildByName(n[s]).childrenCount && -1 == a.indexOf(n[s])) {
          t = this.chessBoard.getChildByName(n[s]);
          o = e[i];
          break;
        }
      }
      if (t) {
        break;
      }
    }
    if (!t) {
      return false;
    }
    var r = this.chessBoard.getChildByName(o.pos).children[0];
    this.AIMove(t, r);
    return true;
  };
  _ctor.prototype.getDistance = function (e, t) {
    var o = Number(e.split("-")[1]);
    var i = Number(e.split("-")[0]);
    var n = Number(t.split("-")[1]);
    var a = Number(t.split("-")[0]);
    return Math.abs(o - n) + Math.abs(i - a);
  };
  _ctor.prototype.getNearChess = function () {
    var e = this;
    var t = this.getEnemyChessInfo();
    var o = this.getEnemyChessInfo(true);
    var i = [];
    t.forEach(function (t) {
      o.forEach(function (o) {
        e.rule.indexOf(t.name.split("_")[0]) <= e.rule.indexOf(o.name.split("_")[0]) && ("Boss" == t.name.split("_")[0] && "B" == o.name.split("_")[0] || i.push({
          name: t.name,
          pos: t.pos,
          attack: o.name,
          attackPos: o.pos
        }));
      });
    });
    i.sort(function (t, o) {
      return e.getDistance(t.pos, t.attackPos) - e.getDistance(o.pos, o.attackPos);
    });
    return i;
  };
  _ctor.prototype.AIChessMove = function () {
    var e = this.getNearChess();
    for (var t = 0; t < e.length; t++) {
      var o = e[t];
      var i = this.getDangerList(false, o.name);
      var n = this.getChessCanMove(o.pos);
      for (var a = 0; a < n.length; a++) {
        var s = this.getDistance(o.pos, o.attackPos);
        var r = this.getDistance(n[a], o.attackPos);
        if (-1 == i.indexOf(n[a]) && s > r) {
          console.log("可以移动", o.pos, n[a], o.attackPos);
          this.AIMove(this.chessBoard.getChildByName(n[a]), this.chessBoard.getChildByName(o.pos).children[0]);
          return true;
        }
      }
    }
    return false;
  };
  _ctor.prototype.AIMove = function (e, t, o) {
    var i = this;
    var n = e.convertToNodeSpaceAR(t.convertToWorldSpaceAR(cc.v2(0, 0)));
    t.parent = e;
    t.setPosition(n);
    r_SoundMgr.SoundMgr.playSound("chess/翻开棋子");
    cc.tween(t).to(.2, {
      x: 0,
      y: 0
    }).call(function () {
      i.changeTurn();
      o && o();
    }).start();
  };
  _ctor.prototype.isCanWin = function () {
    var e = this;
    var t = this.getEnemyChessInfo(true);
    var o = this.getEnemyChessInfo();
    var i = "";
    var n = "";
    var a = "";
    var s = null;
    t.forEach(function (t) {
      "P" == t.name.split("_")[0] && (s = true);
      if ("" == i) {
        i = t.name.split("_")[0];
      } else {
        e.rule.indexOf(i) < e.rule.indexOf(t.name.split("_")[0]) && (i = t.name.split("_")[0]);
      }
      if ("" == a) {
        a = t.name.split("_")[0];
      } else {
        e.rule.indexOf(a) > e.rule.indexOf(t.name.split("_")[0]) && (a = t.name.split("_")[0]);
      }
    });
    return !!s || (o.forEach(function (o) {
      1 == t.length && "Boss" == i && "B" == o.name.split("_")[0] && (s = false);
      if ("" == n) {
        n = o.name.split("_")[0];
      } else {
        e.rule.indexOf(n) < e.rule.indexOf(o.name.split("_")[0]) && (n = o.name.split("_")[0]);
      }
    }), null != s ? s : ("Boss" != n || "B" == a) && this.rule.indexOf(i) <= this.rule.indexOf(n));
  };
  __decorate([_property({
    type: cc.Node,
    displayName: "棋盘"
  })], _ctor.prototype, "chessBoard", undefined);
  return __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_ChineseChessCom;