// pages/gpt/gpt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question:"",
    answer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  search(e){
    this.setData({
      question:e.detail.value
    });
    wx.showLoading({
      title: "人工智能回答中",
      mask: true
    });
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ZFEFvhGYVA7WofE2Ob1ovfA5&client_secret=k7It7Phg8kOf2iQakG7fl9xfN3j9iuPB',
      header: {
        "Content-Type": "application/json"
      },
      method: "POST",
      success: res=>{
        wx.request({
          url: 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token='+res.data.access_token,
          header: {
            "Content-Type": "application/json"
          },
          method: "POST",
          data: {
            messages: [
              {
                role: "user",
                content: e.detail.value
              }
          ]
          },
          success: res=>{
            this.setData({
              answer: res.data.result
            });
            wx.hideLoading();
          }
        })
      }
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