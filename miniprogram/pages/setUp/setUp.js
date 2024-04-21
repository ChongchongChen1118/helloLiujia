const rules = [
  {
      name: "name",
      rule: ["required","isChinese"],
      msg: ["请输入姓名","请输入正确的中文姓名"]
  },
  {
    name: "introduce",
    rule: ["required"],
    msg: ["请输入自我介绍"]
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
      name:"大连东软信息学院",
      introduce:"测试自我介绍！！！",
      formData: {},
      //校验规则
      rules: rules,
      show__1: false,
      showActionSheet: false,
      maskClosable: true,
      tips: "确认清空搜索历史吗？",
      itemList: [],
      color: "#9a9a9a",
      size: 26,
      isCancel: true
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
        showActionSheet,
        maskClosable,
        tips,
        itemList,
        color,
        size,
        isCancel,
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
    //退出登录
    closeActionSheet: function() {
      this.setData({
        showActionSheet: false
      })
    },
    openActionSheet: function(e) {
      let itemList = [{
        text: "退出登录",
        color: "#E3302D"
      }];
      let maskClosable = true;
      let tips = "退出登录会清除您的登录信息，确认退出吗？";
      let color = "#9a9a9a";
      let size = 26;
      let isCancel = true;
      setTimeout(() => {
        this.setData({
          showActionSheet: true,
          itemList: itemList,
          maskClosable: maskClosable,
          tips: tips,
          color: color,
          size: size,
          isCancel: isCancel
        })
      }, 0)
    },
    itemClick: function(e) {
      console.log(e.detail);
      let index = e.detail.index;
      this.closeActionSheet();
      console.log(`您点击的按钮索引为：${index}`);
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