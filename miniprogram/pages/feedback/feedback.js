const rules = [
{
    name: "feedback",
    rule: ["required"],
    msg: ["请输入详细诉求描述"]
},
{
  name: "phone",
  rule: ["required", "isMobile"],
  msg: ["请输入手机号", "请输入正确的手机号"]
},
];
let form;

// pages/actionApplication/actionApplication.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //表单数据 （小程序双向绑定不支持formData.name格式）
    phone:"",
    feedback:"",
    formData: {},
    //校验规则
    rules: rules,
    show__1: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  submit() {
    if (!form) return;
    let {
      formData,
      rules,
      show__1,
      ...rest
    } = this.data;
    //表单数据
    console.log(rest)
    this.setData({
      formData: rest
    })
    form.validate(rest,this.data.rules).then(res => {
      console.log('校验通过！')
    }).catch(errors => {
      console.log(errors)
    })
  },
  change(e) {
    this.setData({
      home:e.detail.text
    })
  },
  hide(e) {
 	this.setData({
 		show__1:false
 	})
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    form = this.selectComponent("#form")
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