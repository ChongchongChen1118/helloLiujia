const rules = [
  {
      name: "name",
      rule: ["required","isChinese"],
      msg: ["请输入收货人","请输入真实的中文收货人姓名"]
  },
  {
    name: "phone",
    rule: ["required", "isMobile"],
    msg: ["请输入手机号", "请输入正确的手机号"]
  },
  {
    name: "house",
    rule: ["required"],
    msg: ["请选择地区"]
  },
  {
    name: "xxhouse",
    rule: ["required"],
    msg: ["请输入详细地址"]
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
      name:"",
      phone:"",
      house:"",
      xxhouse:"",
      formData: {},
      shuliang:1,
      //校验规则
      rules: rules,
      show__3: false,
      items__3: [{
        text: '广东省',
        value: '100',
        children: [{
           text: '广州市',
           value: '10001',
           children: [{
            text: '荔湾区',
            value: '1000101'
           },{
            text: '天河区',
            value: '1000102'
           }]
        }, {
           text: '深圳市',
          value: '10002',
          children: [{
            text: '荔湾区',
            value: '1000201'
           },{
            text: '天河区',
            value: '1000202'
           }]
        }]
       }, {
        text: '安徽省',
        value: '200',
        children: [{
         text: '合肥市',
         value: '20001',
         children: [{
          text: '荔湾区',
          value: '2000101'
         },{
          text: '天河区',
          value: '2000102'
         }]
       }, {
          text: '安庆市',
          value: '20002',
          children: [{
            text: '荔湾区',
            value: '2000201'
           },{
            text: '天河区',
            value: '2000202'
           }]
       }]
     }]
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
        show__3,
        items__3,
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
        house:e.detail.text
      })
    },
    change1: function (e) {
      this.setData({
        shuliang:e.detail.value
      })
    },
    hide(e) {
      this.setData({
        show__3:false
      })
     },
     hide(e) {
     this.setData({
       show__3:false
     })
    },
    xuanze() {
      this.setData({
        show__3:true
      })
    },
    change2(e) {
      this.setData({
        house: e.detail.result
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