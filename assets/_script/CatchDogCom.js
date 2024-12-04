var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s;
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_TimeSystem = require("TimeSystem");
var r_CatchDogCfg = require("CatchDogCfg");
var r_CatchDogLogic = require("CatchDogLogic");
var r_CatchDogResultUI = require("CatchDogResultUI");
var r_CatchDogUI = require("CatchDogUI");
var r_DogCom = require("DogCom");
var r_DogNetCom = require("DogNetCom");
var _decorator = cc._decorator;
var _ccclass = _decorator.ccclass;
var _property = _decorator.property;
var def_CatchDogCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.dogsNode = null;
    t.owner = null;
    t.dogNetCom = null;
    t.dogsPrefab = [];
    t.chouqiAnim = null;
    t.m_curDogData = null;
    t.m_dogList = [];
    t.m_curLevel = 1;
    t.m_propCount = 3;
    t.m_moveDog = null;
    t.m_isMove = false;
    t.m_moveIndex = 0;
    t.isPause = true;
    return t;
  }
  var _ref__ctor;
  __extends(_ctor, e);
  _ref__ctor = _ctor;
  _ctor.prototype.onLoad = function () {};
  Object.defineProperty(_ctor.prototype, "isMove", {
    get: function () {
      return this.m_isMove;
    },
    set: function (e) {
      this.m_isMove = e;
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.start = function () {
    _ref__ctor.instance = this;
    r_CatchDogLogic.CatchDogLogic.init();
  };
  _ctor.prototype.restart = function () {
    this.dogNetCom.node.active = false;
    this.chouqiAnim.node.active = false;
    this.owner.active = false;
    this.initData();
  };
  _ctor.prototype.initData = function () {
    this.m_curLevel = 1;
    this.m_propCount = 3;
  };
  _ctor.prototype.gameStart = function () {
    this.isPause = false;
    this.next();
  };
  _ctor.prototype.next = function () {
    this.addDog();
    this.showHand();
    r_CatchDogLogic.CatchDogLogic.start(this.m_dogList, this.dogNetCom, this.owner);
    this.dogMove();
  };
  _ctor.prototype.roundOver = function () {
    if (this.m_curLevel >= Object.values(r_CatchDogCfg.DogLevelCfg).length) {
      this.gameOver();
    } else {
      this.m_curLevel++;
      r_CatchDogUI.default.instance.roundNum++;
      r_CatchDogUI.default.instance.next();
    }
  };
  _ctor.prototype.playCouqi = function (e) {
    this.chouqiAnim.node.active = true;
    this.chouqiAnim.setAnimation(0, "animation", false);
    r_TimeSystem.TimeSystem.scheduleOnce("chaoxiao", 2, function () {
      e();
    });
  };
  _ctor.prototype.gameOver = function () {
    r_CatchDogResultUI.default.showUI(2);
  };
  _ctor.prototype.addDog = function () {
    var e = this;
    var t = r_CatchDogCfg.DogLevelCfg[this.m_curLevel];
    this.m_curDogData = [];
    this.dogsNode.destroyAllChildren();
    this.m_dogList = [];
    t.dogs.forEach(function (t) {
      return e.m_curDogData.push(r_CatchDogCfg.DogCfg[t]);
    });
    this.m_curDogData.forEach(function (t) {
      var i = e.dogsPrefab[t.id - 1];
      var n = cc.instantiate(i);
      e.dogsNode.addChild(n);
      n.x = _ref__ctor.initX;
      n.y = 150;
      var a = n.getComponent(r_DogCom.default);
      a.setData(t);
      e.m_dogList.push(a);
    });
  };
  _ctor.prototype.getAward = function () {
    var e = r_CatchDogCfg.DogLevelCfg[this.m_curLevel];
    r_PlayerData.PlayerData.addCoin("抓狗奖励", e.award, r_ReportSystem.SystemKey.抓狗);
    r_CatchDogUI.default.instance.getAward();
  };
  _ctor.prototype.showHand = function () {
    this.dogNetCom.node.active = true;
    this.dogNetCom.idle();
  };
  _ctor.prototype.dogMove = function () {
    this.m_isMove = true;
    this.m_moveIndex >= this.m_dogList.length && (this.m_moveIndex = 0);
    this.m_moveDog = this.m_dogList[this.m_moveIndex];
    this.m_moveDog.node.x = 600;
    this.m_moveDog.run();
  };
  _ctor.prototype.update = function (e) {
    e > .5 && (e = .17);
    this.isPause || this.m_isMove && this.m_moveDog && this.m_moveDog.move(e);
  };
  _ctor.prototype.moveOver = function () {
    this.m_isMove = false;
    this.m_moveDog = null;
    this.m_moveIndex++;
    this.dogMove();
  };
  _ctor.prototype.catchCountDown = function () {};
  _ctor.prototype.chcekResult = function () {
    return this.m_dogList.filter(function (e) {
      return e.data.isCatch;
    }).length <= 0;
  };
  _ctor.prototype.deleteDog = function (e) {
    var t = this.m_dogList.findIndex(function (t) {
      return t == e;
    });
    if (t > -1) {
      e.node.destroy();
      this.m_dogList.splice(t, 1);
    }
  };
  _ctor.prototype.catch = function () {
    this.dogNetCom.catch();
  };
  _ctor.prototype.onDisable = function () {};
  _ctor.prototype.addProp = function () {
    this.m_propCount = 3;
  };
  _ctor.prototype.clearScene = function () {
    var e = this;
    this.m_dogList.forEach(function (t) {
      e.deleteDog(t);
    });
    this.m_dogList = [];
    r_TimeSystem.TimeSystem.scheduleClear("chaoxiao");
    this.m_moveDog = null;
    this.m_isMove = false;
  };
  _ctor.initX = 700;
  _ctor.targetX = -700;
  __decorate([_property(cc.Node)], _ctor.prototype, "dogsNode", undefined);
  __decorate([_property(cc.Node)], _ctor.prototype, "owner", undefined);
  __decorate([_property(r_DogNetCom.default)], _ctor.prototype, "dogNetCom", undefined);
  __decorate([_property([cc.Prefab])], _ctor.prototype, "dogsPrefab", undefined);
  __decorate([_property(sp.Skeleton)], _ctor.prototype, "chouqiAnim", undefined);
  return _ref__ctor = __decorate([_ccclass], _ctor);
}(cc.Component);
exports.default = def_CatchDogCom;
(function (e) {
  e[e["空闲"] = 0] = "空闲";
  e[e["抓住"] = 1] = "抓住";
})(s || (s = {}));