// pages/playDetail/playDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infor:{
      text:"测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！测试景点！！！",
      address:"刘家村XX街道XXX号",
      phone:"18812341234",
      lunbo:["https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/0M8A7497.JPG","https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/航拍20201103.jpg","https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/DJI_0654.JPG","https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/0M8A7650.JPG"]
    },
    shuju:[
      {
        text:"<p style='margin-bottom: 15px;'>长青湖——寓意“山水长青、幸福常在、生机无限”，位于国家AAAA级旅游景区——大连西郊国家森林公园内，水域面积2万平方米，蓄水总量5万立方米。景区内湖色宜人，清透如镜，锦鲤成群，常有珍稀鸟类在此迁徙休养。岸边物种丰富，四季繁花、树木茂密，夏季虫鸣鸟叫此起彼伏，百余种鲜花争相开放，形成一个天然、绿色的生态氧吧。</p><p style='margin-bottom: 15px;'>景区内设置5公里景观木栈道,贯穿全域，形成都市森林网红健身打卡地。果岸咖啡屋依湖而建，直通湖岸，是喧嚣城市中难得的休憩之地，也是艺术家灵感泉涌的理想摇篮。景区环湖造景，搭配景观台、露营地，泛舟旖旎，波光粼粼，投喂锦鲤，怡然自得。</p><p style='margin-bottom: 15px;'>让我们在青山绿水中品味咖啡的浓香，尽情享受大自然赐予的美好生活吧……</p>",
        address:"大连市甘井子区红旗街道刘家村长青湖景区自驾：导航“长青湖景区”乘车：1、乘坐1123路公交车在“长青湖公园”站下车即可",
        phone:"15940576339",
        lunbo:["https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/0M8A7444.JPG","https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/0M8A7506.JPG"]
      },
      {
        text:"<p style='margin-bottom: 15px;'>红旗街道刘家村位于大连市甘井子区西南部，处于旅顺中路之间，南与高新园区接壤，北与柳树村毗邻，东通百合山庄、理工大学、海事大学。</p><p style='margin-bottom: 15px;'>刘家村村容村貌干净整洁，乡土气息保存良好，乡村文明古朴简素，辖区居民为人待事热情，乡村典型性突出。辖区内户籍户数260户，户籍人口657人，外来人口239人。</p><p style='margin-bottom: 15px;'>全村建立土地台账，村内总面积8.16平方公里（包含0.3平方公里国有林地）；集体土地面积11790.11亩，其中耕地5.48亩；园地2036.56亩；林地9048.4亩；其他227.08亩；建设用地413.15亩；未利用地59.44亩。坐拥92%的森林覆盖率，原始植被保存完好，地理位置优越，生态环境优越，有着“八山半水一分田”的特点。</p><p style='margin-bottom: 15px;'>同时，村内原各自承包的五个生产队于2018年全部收回，由村公司一体化管理经营，并于2013年后，村内对外出租的厂房和承包的果园地陆续收回统一管理。</p><p style='margin-bottom: 15px;'>2004年5月，将刘家村农民转为城市居民，实行全域城市化，自此之后享受城市福利待遇。2008年9月，大连市政府决定甘井子区凌水街道划归大连市高新技术产业园区代管，与此同时，将凌水街道所辖刘家村划归红旗街道。</p>",
        address:"大连市甘井子区",
        phone:"15940576339",
        lunbo:["https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/0M8A7444.JPG","https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/0M8A7506.JPG"]
      }
    ],
    skeletonShow: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      infor:this.data.shuju[options.id]
    });
    setTimeout(() => {
      this.setData({
        skeletonShow:false
      })
    }, 1800);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})