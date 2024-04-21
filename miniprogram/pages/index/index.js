Page({

  /**
   * 页面的初始数据
   */
  data: {
    //消息提示框信息
    content:"你好·刘家村小程序开发版，版本V0.7，因小程序现处于开发待完成阶段，可能存在一些未知问题，如您发现问题请反馈至邮箱：2315405873@qq.com，感谢您的理解！",
    //滑动栏信息数组
    navArr:[
      {
        icon:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/数据监控.png",
        classname:"党建",
        url1:"../wait/wait",
        type: "navigate"
      },
      {
        icon:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/地址簿.png",
        classname:"游玩",
        url1:"../play/play",
        type: "navigate"
      },
      {
        icon:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/客服.png",
        classname:"联系",
        url1:"../committee/committee",
        type: "navigate"
      },
      {
        icon:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/农业技术.png",
        classname:"农技",
        url1:"../agriculture/agriculture",
        type: "navigate"
      },
      {
        icon:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/诉求.png",
        classname: "诉求",
        url1:"../appeal/appeal",
        type: "navigate"
      },
      {
        icon:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/更多.png",
        classname:"更多",
        url1:"../dang/dang",
        type: "reLaunch"
      }
  ],
  //热点新闻信息
  news:[
    {
      id: "0",
      title:"刘家生态农业认养项目简介",
      publish_date:"10-15",
      view_count:200,
      author:"村宣传",
      picurl:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/0M8A7309.JPG"
    },
    {
      id:"1",
      title:"红旗街道刘家村“果品浓香·红色文旅融合发展模式”",
      publish_date:"10-16",
      view_count:230,
      author:"村党委",
      picurl:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/图片1.png"
    },
    {
      id:"2",
      title:"刘家村2022年度旅游工作情况报告",
      publish_date:"10-19",
      view_count:207,
      author:"村党委",
      picurl:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/0M8A7434.JPG"
    },
    {
      id:"3",
      title:"大连鑫源实业总公司简介",
      publish_date:"10-31",
      view_count:56,
      author:"村宣传",
      picurl:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/1.认养基地照片 (8).JPG"
    }
],
navigate: [{
	url: "../../pages/index/index.js",
	type: "switchTab",
	text: "最终解释权归红旗街道刘家村所有",
	color: "#A7A7A7"
}],
jieshao: [
  "红旗街道刘家村位于大连市甘井子区西南部，处于旅顺中路之间，南与高新园区接壤，北与柳树村毗邻，东通百合山庄、理工大学、海事大学。刘家村村容村貌干净整洁，乡土气息保存良好，乡村文明古朴简素，辖区居民为人待事热情，乡村典型性突出。辖区内户籍户数260户，户籍人口657人，外来人口239人。",
  "全村建立土地台账，村内总面积8.16平方公里（包含0.3平方公里国有林地）；集体土地面积11790.11亩，其中耕地5.48亩；园地2036.56亩；林地9048.4亩；其他227.08亩；建设用地413.15亩；未利用地59.44亩。坐拥92%的森林覆盖率，原始植被保存完好，地理位置优越，生态环境优越，有着“八山半水一分田”的特点。同时，村内原各自承包的五个生产队于2018年全部收回，由村公司一体化管理经营，并于2013年后，村内对外出租的厂房和承包的果园地陆续收回统一管理。",
  "2004年5月，将刘家村农民转为城市居民，实行全域城市化，自此之后享受城市福利待遇。2008年9月，大连市政府决定甘井子区凌水街道划归大连市高新技术产业园区代管，与此同时，将凌水街道所辖刘家村划归红旗街道。2019年，顺利完成“撤村建居”工作，撤销了刘家村民委员会建制，新建刘家社区居民委员会。",
  "刘家村自2018年7月开始启动集体产权制度改革工作，圆满完成清产核资、成员身份界定、股权量化等规范性任务，历经4个月，刘家村股份经济合作社依照程序于2018年10月31日成立，共有成员505人、总股份额39589。2019年3月9日下发股份经济合作社赋码证，办理银行开户手续。同年4月17日刘家村股份经济合作社进行正式揭牌，集体产权制度改取得实质性进展。"
]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})