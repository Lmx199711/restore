var i;
Object.defineProperty(exports, "__esModule", {
  value: true
});
var r_FguiResSystem = require("FguiResSystem");
var r_HouseSystem = require("HouseSystem");
var r_PlatformSystem = require("PlatformSystem");
var r_PlayerData = require("PlayerData");
var r_ReportSystem = require("ReportSystem");
var r_ResSystem = require("ResSystem");
var r_SecretUpSystem = require("SecretUpSystem");
var r_TimeSystem = require("TimeSystem");
var r_UtilsSystem = require("UtilsSystem");
var r_HouseCfg = require("HouseCfg");
var r_HouseMarketUI = require("HouseMarketUI");
var r_HouseOutUI = require("HouseOutUI");
var def_HouseIndustryCom = function (e) {
  function _ctor() {
    var t = null !== e && e.apply(this, arguments) || this;
    t.items = [];
    t.m_maxIndex = 2;
    t.m_index = 0;
    t.m_select = 0;
    t.m_mishuId = 0;
    return t;
  }
  __extends(_ctor, e);
  _ctor.prototype.onConstruct = function () {
    var e = this;
    this.imgIndustry = this.getChild("imgIndustry");
    this.imgDi = this.getChild("imgDi");
    this.effect = this.getChild("effect");
    this.labTitle = this.getChild("labTitle");
    this.labPrice = this.getChild("labPrice");
    this.btnLeft = this.getChild("btnLeft");
    this.btnRight = this.getChild("btnRight");
    this.btnFenqi = this.getChild("btnFenqi");
    this.btnBuy = this.getChild("btnBuy");
    this.btnYanfa = this.getChild("btnYanfa");
    this.imgHead = this.getChild("imgHead");
    this.pro = this.getChild("pro");
    this.labTime = this.getChild("labTime");
    this.btnAddVideo = this.getChild("btnAddVideo");
    this.btnQuery = this.getChild("btnQuery");
    this.labResult = this.getChild("labResult");
    this.btnGet = this.getChild("btnGet");
    this.btnDouble = this.getChild("btnDouble");
    this.btnChuqian = this.getChild("btnChuqian");
    this.btnMianchu = this.getChild("btnMianchu");
    this.btnDaomei = this.getChild("btnDaomei");
    this.btnBuyYanfa = this.getChild("btnBuyYanfa");
    this.btnChangeMishu = this.getChild("btnChangeMishu");
    this.labPr = this.getChild("labPr");
    this.btnBack = this.getChild("btnBack");
    this.items = [];
    for (var o = 0; o < 4; o++) {
      this.items.push(this.getChild("item" + o).asCom);
      this.getChild("item" + o).onClick(this.onClickItem.bind(this, o), this);
    }
    this.itemHeads = [];
    for (o = 0; o < 5; o++) {
      this.itemHeads.push(this.getChild("itemHead" + o).asCom);
      this.getChild("itemHead" + o).onClick(this.onClickitemHead.bind(this, o), this);
    }
    [this.btnBuy, this.btnFenqi, this.btnRight, this.btnLeft, this.btnYanfa, this.btnAddVideo, this.btnQuery, this.btnGet, this.btnDouble, this.btnMianchu, this.btnDaomei, this.btnChuqian, this.btnBuyYanfa, this.btnChangeMishu, this.btnBack].forEach(function (t) {
      t.onClick(e["onClick" + t.name], e);
    });
    _ctor.instace = this;
  };
  Object.defineProperty(_ctor.prototype, "index", {
    set: function (e) {
      r_TimeSystem.TimeSystem.unregistSecondUpdate("secondUpdate");
      this.m_index = e;
      this.btnLeft.visible = true;
      this.btnRight.visible = true;
      if (this.m_index <= 0) {
        this.btnLeft.visible = false;
      } else {
        this.m_index >= this.m_maxIndex && (this.btnRight.visible = false);
      }
      this.setPage();
    },
    enumerable: false,
    configurable: true
  });
  _ctor.prototype.getData = function () {
    var e = r_HouseCfg.HouseIndustryCfg[this.m_index];
    return r_HouseSystem.HouseSystem.getIndustryData(e.id);
  };
  _ctor.prototype.restart = function () {
    this.index = 0;
  };
  _ctor.prototype.onRefresh = function () {
    this.index = this.m_index;
  };
  _ctor.prototype.onClickbtnLeft = function () {
    this.m_index <= 0 || (this.index = --this.m_index);
  };
  _ctor.prototype.onClickbtnRight = function () {
    this.m_index >= this.m_maxIndex || (this.index = ++this.m_index);
  };
  _ctor.prototype.onClickbtnFenqi = function () {
    var e = r_HouseCfg.HouseIndustryCfg[this.m_index];
    var t = Math.ceil(e.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
    var o = Math.ceil(.3 * t);
    if (r_PlayerData.PlayerData.isCoinEnough(o)) {
      r_HouseOutUI.default.showUI(e);
    } else {
      r_UtilsSystem.UtilsSystem.showTip("不够首付的钱");
    }
  };
  _ctor.prototype.onClickbtnBuy = function () {
    var e = r_HouseCfg.HouseIndustryCfg[this.m_index];
    var t = Math.ceil(e.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
    if (r_PlayerData.PlayerData.isCoinEnough(t)) {
      r_PlayerData.PlayerData.deleteCoin("买住房", t, r_ReportSystem.SystemKey.楼市);
      r_HouseSystem.HouseSystem.addIndustrys(e.id);
      this.onRefresh();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.onClickbtnYanfa = function () {
    this.m_mishuId = 0;
    this.setState2();
    this.setItem(0);
  };
  _ctor.prototype.setState2 = function () {
    this.getController("state").selectedIndex = 2;
    var e = r_HouseCfg.HouseIndustryCfg[this.m_index].projects;
    this.items.forEach(function (t, o) {
      t.getChild("icon").asLoader.url = "ui://House/project" + r_HouseCfg.HousePrejectCfg[e[o]].id;
      t.getChild("title").asTextField.text = r_HouseCfg.HousePrejectCfg[e[o]].name;
    });
    this.btnChangeMishu.url = "ui://House/mishu" + (0 == this.m_mishuId ? "Add" : this.m_mishuId);
    this.labPr.text = r_HouseSystem.HouseSystem.getIndustryPr(this.m_mishuId)[0].pr + "%";
  };
  _ctor.prototype.onClickbtnGet = function () {
    var e = r_HouseCfg.HousePrejectCfg[this.getData().project];
    r_PlayerData.PlayerData.addCoin("研究成果", e.award, r_ReportSystem.SystemKey.楼市);
    r_HouseSystem.HouseSystem.industryAwardGet(this.getData().id);
    this.onRefresh();
  };
  _ctor.prototype.onClickbtnDouble = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("双倍领取研究成果", function () {
      var t = r_HouseCfg.HousePrejectCfg[e.getData().project];
      r_PlayerData.PlayerData.addCoin("双倍研究成果", 2 * t.award, r_ReportSystem.SystemKey.楼市);
      r_HouseSystem.HouseSystem.industryAwardGet(e.getData().id);
      e.onRefresh();
    });
  };
  _ctor.prototype.onClickbtnChuqian = function () {
    var e = r_HouseCfg.HousePrejectCfg[this.getData().project];
    if (!r_PlayerData.PlayerData.isCoinEnough(e.loss)) {
      r_PlayerData.PlayerData.deleteCoin("研究失败", r_PlayerData.PlayerData.bigCoin, r_ReportSystem.SystemKey.楼市);
      r_HouseSystem.HouseSystem.industryAwardGet(this.getData().id);
      return void this.onRefresh();
    }
    r_PlayerData.PlayerData.deleteCoin("研究失败", e.loss, r_ReportSystem.SystemKey.楼市);
    r_HouseSystem.HouseSystem.industryAwardGet(this.getData().id);
    this.onRefresh();
  };
  _ctor.prototype.onClickbtnMianchu = function () {
    var e = this;
    r_PlatformSystem.PlatformSystem.showVideo("免除研究失败惩罚", function () {
      r_HouseSystem.HouseSystem.industryAwardGet(e.getData().id);
      e.onRefresh();
    });
  };
  _ctor.prototype.onClickbtnDaomei = function () {
    r_HouseSystem.HouseSystem.industryAwardGet(this.getData().id);
    this.onRefresh();
  };
  _ctor.prototype.onClickbtnQuery = function () {
    this.getController("state").selectedIndex = 6;
    this.getController("result").selectedIndex = this.getData().resultState;
    var e = r_HouseCfg.HousePrejectCfg[this.getData().project];
    switch (this.getData().resultState) {
      case 0:
        this.labResult.text = e.succDesc;
        break;
      case 1:
        this.labResult.text = e.loseDesc;
        break;
      case 2:
        this.labResult.text = e.runDesc;
    }
  };
  _ctor.prototype.onClickbtnAddVideo = function () {
    var e = this;
    var t = r_HouseCfg.HouseIndustryCfg[this.m_index];
    r_PlatformSystem.PlatformSystem.showVideo("产业楼研发加速", function () {
      r_HouseSystem.HouseSystem.addTimeIndustry(t.id);
      e.onRefresh();
    });
  };
  _ctor.prototype.onClickbtnBuyYanfa = function () {
    var e = r_HouseCfg.HouseIndustryCfg[this.m_index];
    var t = e.projects[this.m_select];
    var o = r_HouseCfg.HousePrejectCfg[t];
    var i = o.price;
    if (r_PlayerData.PlayerData.isCoinEnough(i)) {
      r_PlayerData.PlayerData.data.industrysNum++;
      r_PlayerData.PlayerData.deleteCoin("研发经费", i, r_ReportSystem.SystemKey.楼市);
      r_HouseSystem.HouseSystem.startIndustryProject(e.id, o.id, this.m_mishuId);
      this.onRefresh();
    } else {
      r_UtilsSystem.UtilsSystem.showTip("钱不够~");
    }
  };
  _ctor.prototype.onClickbtnChangeMishu = function () {
    this.getController("state").selectedIndex = 3;
    var e = JSON.parse(JSON.stringify(r_SecretUpSystem.SecretUpSystem.getSecretList()));
    e.sort(function (e, t) {
      return r_SecretUpSystem.SecretUpSystem.getLevelByFeel(t.id, t.feel) - r_SecretUpSystem.SecretUpSystem.getLevelByFeel(e.id, e.feel);
    });
    for (var t = 0; t < this.itemHeads.length; t++) {
      var o = e[t];
      if (null == o) {
        this.itemHeads[t].getChild("icon").url = "ui://House/mishu0";
        this.itemHeads[t].getChild("labLevel").text = "";
      } else {
        var i = r_SecretUpSystem.SecretUpSystem.getLevelByFeel(o.id, o.feel);
        this.itemHeads[t].getChild("icon").url = "ui://House/mishu" + o.id;
        this.itemHeads[t].getChild("labLevel").text = "Lv." + i;
        this.itemHeads[t].enabled = !r_HouseSystem.HouseSystem.checkMishuJob(o.id);
      }
    }
  };
  _ctor.prototype.onClickItem = function (e) {
    this.setItem(e);
  };
  _ctor.prototype.onClickitemHead = function (e) {
    this.setitemHead(e);
  };
  _ctor.prototype.onClickbtnBack = function () {
    if (2 == this.getController("state").selectedIndex) {
      this.getController("state").selectedIndex = 1;
    } else {
      3 == this.getController("state").selectedIndex && (this.getController("state").selectedIndex = 2);
    }
  };
  _ctor.prototype.setItem = function (e) {
    this.m_select = e;
    this.items.forEach(function (e) {
      e.getController("c1").selectedIndex = 0;
    });
    this.items[this.m_select].getController("c1").selectedIndex = 1;
    var t = r_HouseCfg.HouseIndustryCfg[this.m_index].projects[e];
    var o = r_HouseCfg.HousePrejectCfg[t];
    var i = r_UtilsSystem.UtilsSystem.numFormats(o.price);
    this.btnBuyYanfa.title = i + "研发";
  };
  _ctor.prototype.setitemHead = function (e) {
    var t = r_SecretUpSystem.SecretUpSystem.getSecretList();
    this.m_mishuId = 0;
    t[e] && (this.m_mishuId = t[e].id);
    this.getController("state").selectedIndex = 2;
    this.setState2();
  };
  _ctor.prototype.setPage = function () {
    var e = this;
    var t = r_HouseCfg.HouseIndustryCfg[this.m_index];
    this.imgIndustry.url = "ui://House/industry" + t.id;
    this.imgDi.url = "ui://House/ibg" + t.id;
    this.effectNode && this.effectNode.destroy();
    r_ResSystem.ResSystem.loadBundleRes("game2", "house/effect" + t.id, cc.Prefab, function (t, o) {
      r_FguiResSystem.FguiResSystem.addAutoReleaseRes(r_HouseMarketUI.default.Inst, o);
      e.effectNode = cc.instantiate(o);
      e.effect.node.destroyAllChildren();
      e.effect.node.addChild(e.effectNode);
      e.effectNode.active = true;
    });
    this.labTitle.text = t.name;
    if (r_HouseSystem.HouseSystem.checkIndustry(t.id)) {
      if (this.getData()) {
        switch (this.getData().state) {
          case 1:
            this.getController("state").selectedIndex = 1;
            break;
          case 4:
            this.getController("state").selectedIndex = 4;
            r_TimeSystem.TimeSystem.unregistSecondUpdate("secondUpdate");
            r_TimeSystem.TimeSystem.registSecondUpdate("secondUpdate", this.onSecondUpdate.bind(this));
            this.onSecondUpdate();
            break;
          case 6:
            this.getController("state").selectedIndex = 5;
        }
      }
    } else {
      this.getController("state").setSelectedIndex(0);
      var o = Math.ceil(t.price * r_PlayerData.PlayerData.data.houseData.randomCeff);
      this.labPrice.text = "价格：" + r_UtilsSystem.UtilsSystem.getShowCoin(o);
    }
  };
  _ctor.prototype.onSecondUpdate = function () {
    var e = r_HouseCfg.HouseIndustryCfg[this.m_index].projects[this.m_select];
    var t = r_HouseCfg.HousePrejectCfg[e];
    this.imgHead.url = "ui://House/mishu" + this.getData().mishu;
    var o = (Date.now() - this.getData().startTime) / 1e3;
    if (this.getData().startTime > 0 && t.time > o) {
      this.pro.value = o;
      this.labTime.text = this.getTimeForm(900 - o);
    } else {
      r_TimeSystem.TimeSystem.unregistSecondUpdate("secondUpdate");
      r_HouseSystem.HouseSystem.getIndustryState(this.getData().id);
      this.onRefresh();
    }
  };
  _ctor.prototype.getTimeForm = function (e) {
    e = Math.round(e);
    var t = Math.floor(e / 60);
    var o = e % 60;
    return (t >= 10 ? "" + t : "0" + t) + ":" + (o >= 10 ? "" + o : "0" + o);
  };
  _ctor.prototype.setView = function () {};
  _ctor.prototype.onDisable = function () {
    e.prototype.onDestroy.call(this);
    r_TimeSystem.TimeSystem.unregistSecondUpdate("secondUpdate");
  };
  return _ctor;
}(fgui.GComponent);
exports.default = def_HouseIndustryCom;