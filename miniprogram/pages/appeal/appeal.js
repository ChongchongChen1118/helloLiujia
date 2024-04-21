const rules = [{
  name: "name",
  rule: ["required", "isChinese"],
  msg: ["请输入姓名", "请输入正确的中文姓名"]
}, {
  name: "phone",
  rule: ["required", "isMobile"],
  msg: ["请输入手机号", "请输入正确的手机号"]
}, {
  name: "sephone",
  rule: ["required", "isMobile"],
  msg: ["请输入第二联系人手机号", "请输入正确的第二联系人方式"]
}, {
  name: "idCard",
  rule: ["required", "isIdCard"],
  msg: ["请输入身份证号", "请输入正确的身份证号"]
}, {
  name: "home",
  rule: ["required"],
  msg: ["请选择家庭住址"]
},{
  name:"familyNum",
  rule:["required"],
  msg:["请输入家庭成员数量"]
},{
  name: "appeal",
  rule: ["required"],
  msg: ["请输入详细诉求描述"]
}
];
let form;

// pages/appeal/appeal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 //表单数据 （小程序双向绑定不支持formData.name格式）
    name: '',
    phone:"",
    sephone:"",
    idCard: '',
    home:"",
    appeal:"",
    familyNum:"",
    formData: {},
    //校验规则
    rules: rules,
    show__1: false,
    items__1: [{
    	text: "刘家村街道001",
    	value: "1001"
    }, {
    	text: "刘家村街道002",
    	value: "1002"
    }, {
    	text: "刘家村街道003",
    	value: "1003"
    },
    {
    	text: "刘家村街道004",
    	value: "1004"
    },
    {
    	text: "刘家村街道005",
    	value: "1005"
    }
  ]
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
      items__1,
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
  //调用此方法显示picker选择器
  clickZhuzhi() {
 	 this.setData({
 	 	show__1:true
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