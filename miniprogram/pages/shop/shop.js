Page({

  /**
   * 页面的初始数据
   */
  data: {
    dropdownShow: false,
    dropdownlistData:[
      {
        icon:"loading",
        size:"15",
        color:"#1AAD19",
        name:"苹果"
      },
      {
        icon:"loading",
        size:"15",
        color:"#1AAD19",
        name:"梨"
      },
      {
        icon:"loading",
        size:"15",
        color:"#1AAD19",
        name:"猕猴桃"
      },
      {
        icon:"loading",
        size:"15",
        color:"#1AAD19",
        name:"桃子"
      },
      {
        icon:"loading",
        size:"15",
        color:"#1AAD19",
        name:"樱桃"
      },
      {
        icon:"loading",
        size:"15",
        color:"#1AAD19",
        name:"其他"
      }
    ],
    proarr:[
      {
        _id:"0",
        picpath:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/liujiaphoto/莱阳梨.jpg",
        title:"莱阳梨",
        pronum:"12345678",
        grade:"精品",
        year:"2023",
        weight:"20g",
        price:"2"
      },
      {
        _id:"1",
        picpath:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/王林苹果.jpg",
        title:"王林苹果",
        pronum:"12345678",
        grade:"精品",
        year:"2023",
        weight:"20g",
        price:"3"
      },
      {
        _id:"2",
        picpath:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/软枣猕猴桃.jpg",
        title:"软枣猕猴桃",
        pronum:"12345678",
        grade:"上等",
        year:"2023",
        weight:"20g",
        price:"2"
      },
      {
        _id:"3",
        picpath:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/苹果梨.jpg",
        title:"苹果梨",
        pronum:"12345678",
        grade:"上等",
        year:"2023",
        weight:"20g",
        price:"2"
      },
      {
        _id:"4",
        picpath:"https://mp-d4bf0096-2db6-4061-9c32-da817c708bcf.cdn.bspapp.com/蟠桃.jpg",
        title:"蟠桃",
        pronum:"12345678",
        grade:"精品",
        year:"2023",
        weight:"20g",
        price:"1"
      }
    ],
    scrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  dropDownList: function() {
	  this.setData({
		  dropdownShow:!this.data.dropdownShow
	  })
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
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