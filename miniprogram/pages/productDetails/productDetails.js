// pages/productDetails/productDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skeletonShow: true,
    detail:{
      picpath:[
        "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/莱阳梨.jpg",
        "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/蟠桃.jpg",
        "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/苹果梨.jpg",
        "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/软枣猕猴桃.jpg"
      ],
      title:"莱阳梨",
      pronum:"LJ20231000",
      grade:"精品",
      day:"2023-10-15",
      unit:"个",
      price:"2",
      inventory:"1024"
    },
    shuju:[
      {
        picpath:[
          "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/莱阳梨.jpg"
        ],
        title:"莱阳梨",
        pronum:"LJ20231000",
        grade:"精品",
        day:"2023-10-5",
        unit:"个",
        price:"2",
        inventory:"1024"
      },
      {
        picpath:[
          "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/王林苹果.jpg"
        ],
        title:"王林苹果",
        pronum:"LJ20231000",
        grade:"精品",
        day:"2023-10-15",
        unit:"个",
        price:"3",
        inventory:"500"
      },
      {
        picpath:[
          "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/软枣猕猴桃.jpg"
        ],
        title:"软枣猕猴桃",
        pronum:"LJ20231000",
        grade:"上等",
        day:"2023-10-15",
        unit:"个",
        price:"2",
        inventory:"1070"
      },
      {
        picpath:[
          "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/苹果梨.jpg"
        ],
        title:"苹果梨",
        pronum:"LJ20231000",
        grade:"上等",
        day:"2023-10-25",
        unit:"个",
        price:"2",
        inventory:"2400"
      },
      {
        picpath:[
          "https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/蟠桃.jpg"
        ],
        title:"蟠桃",
        pronum:"LJ20231000",
        grade:"精品",
        day:"2023-10-30",
        unit:"个",
        price:"1",
        inventory:"1001"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      detail: this.data.shuju[options.id]
    });
    setTimeout(() => {
      this.setData({
        skeletonShow:false
      })
    }, 1800);
  },
  buy(){
    wx.navigateTo({
      url: '../../pages/shopBuy/shopBuy',
    })
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