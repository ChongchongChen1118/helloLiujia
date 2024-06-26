/**
 * 注意：组件中使用的图片地址，将文件复制到自己项目中
 * 拷贝static下整个components文件夹
 * */
Component({
  properties: {
    //图片路径
    imageUrl: {
      type: String,
      value: ''
    },
    //裁剪框高度 px
    height: {
      type: Number,
      value: 280
    },
    //裁剪框宽度 px
    width: {
      type: Number,
      value: 280
    },
    //是否为圆形裁剪框
    isRound: {
      type: Boolean,
      value: true
    },
    //裁剪框边框
    border: {
      type: String,
      value: '1px solid #fff'
    },
    //生成的图片尺寸相对剪裁框的比例
    scaleRatio: {
      type: Number,
      value: 2
    },
    //图片的质量，取值范围为 (0, 1]，不在范围内时当作1.0处理
    quality: {
      type: Number,
      value: 0.8
    },
    //图片旋转角度
    rotateAngle: {
      type: Number,
      value: 0
    },
    //图片最小缩放比
    minScale: {
      type: Number,
      value: 0.5
    },
    //图片最大缩放比
    maxScale: {
      type: Number,
      value: 2
    },
    //自定义操作栏（为true时隐藏底部操作栏）
    custom: {
      type: Boolean,
      value: false
    },
    //值发生改变开始裁剪（custom为true时生效）
    startCutting: {
      type: Number,
      optionalTypes:[String],
      value: 0
    },
    /**
     * 是否返回base64(H5端默认base64)
     * 支持平台：App，微信小程序，支付宝小程序,H5(默认url就是base64)
     **/
    isBase64: {
      type: Boolean,
      value: false
    },
    //裁剪时是否显示loadding
    loadding: {
      type: Boolean,
      value: true
    },
    //旋转icon
    rotateImg: {
      type: String,
      value: '/static/components/cropper/img_rotate.png'
    }
  },
  data: {
    TIME_CUT_CENTER: null,
    cutX: 0, //画布x轴起点
    cutY: 0, //画布y轴起点0
    imgWidth: 0,
    imgHeight: 0,
    scale: 1, //图片缩放比
    angle: 0, //图片旋转角度
    animation: false, //是否开启图片过渡效果
    animationTime: null,
    imgTop: 0,
    imgLeft: 0,
    ctx: null,
    sysInfo: {},
    props: '',
    sizeChange: 0, //2
    angleChange: 0, //3
    resetChange: 0, //4
    centerChange: 0 //5
  },
  observers: {
    'imageUrl': function (val) {
      if (val) {
        this.showLoading();
        this.imageReset();
        wx.getImageInfo({
          src: val,
          success: res => {
            //计算图片尺寸
            this.imgComputeSize(res.width, res.height);
            this.data.angleChange++;
            this.setData({
              props: `3,${this.data.angleChange}`
            })
          },
          fail: err => {
            this.imgComputeSize();
            this.data.angleChange++;
            this.setData({
              props: `3,${this.data.angleChange}`
            })
          }
        });
      }
    },
    'rotateAngle': function (val) {
      this.setData({
        animation: true,
        angle: val
      })
      this.angleChanged(val);
    },
    'animation': function (val) {
      //开启过渡220毫秒之后自动关闭
      clearTimeout(this.data.animationTime);
      if (val) {
        this.data.animationTime = setTimeout(() => {
          this.setData({
            animation: false
          })
        }, 220);
      }
    },
    'startCutting': function (val) {
      if (this.data.custom && val) {
        this.getImage();
      }
    }
  },
  lifetimes: {
    ready: function () {
      let sysInfo = wx.getSystemInfoSync();
      this.setData({
        sysInfo: sysInfo,
        imgTop: sysInfo.windowHeight / 2,
        imgLeft: sysInfo.windowWidth / 2,
        ctx: wx.createCanvasContext('tui-image__cropper', this)
      }, () => {
        if (!this.data.imageUrl) {
          this.imageReset();
        }
        this.setData({
          props: '1,1'
        })
        setTimeout(() => {
          this.triggerEvent('ready', {});
        }, 180);
      })
    }
  },
  methods: {
    //网络图片转成本地文件[同步执行]
    async getLocalImage(url) {
      return await new Promise((resolve, reject) => {
        wx.downloadFile({
          url: url,
          success: res => {
            resolve(res.tempFilePath);
          },
          fail: res => {
            reject(false)
          }
        })
      })
    },
    //返回裁剪后图片信息
    getImage() {
      if (!this.data.imageUrl) {
        wx.showToast({
          title: '请选择图片',
          icon: 'none'
        });
        return;
      }
      this.data.loadding && this.showLoading();
      let draw = async () => {
        //图片实际大小
        let imgWidth = this.data.imgWidth * this.data.scale * this.data.scaleRatio;
        let imgHeight = this.data.imgHeight * this.data.scale * this.data.scaleRatio;
        //canvas和图片的相对距离
        let xpos = this.data.imgLeft - this.data.cutX;
        let ypos = this.data.imgTop - this.data.cutY;
        //旋转画布
        this.data.ctx.translate(xpos * this.data.scaleRatio, ypos * this.data.scaleRatio);
        this.data.ctx.rotate((this.data.angle * Math.PI) / 180);
        let imgUrl = this.data.imageUrl;
        if (~this.data.imageUrl.indexOf('https:')) {
          imgUrl = await this.getLocalImage(this.data.imageUrl)
        }
        this.data.ctx.drawImage(imgUrl, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);
        this.data.ctx.draw(false, () => {
          let params = {
            width: this.data.width * this.data.scaleRatio,
            height: Math.round(this.data.height * this.data.scaleRatio),
            destWidth: this.data.width * this.data.scaleRatio,
            destHeight: Math.round(this.data.height) * this.data.scaleRatio,
            fileType: 'png',
            quality: this.data.quality
          };
          let data = {
            url: '',
            base64: '',
            width: this.data.width * this.data.scaleRatio,
            height: this.data.height * this.data.scaleRatio
          };

          if (this.data.isBase64) {
            wx.canvasGetImageData({
              canvasId: 'tui-image__cropper',
              x: 0,
              y: 0,
              width: this.data.width * this.data.scaleRatio,
              height: Math.round(this.data.height * this.data.scaleRatio),
              success: res => {
                const arrayBuffer = new Uint8Array(res.data);
                const base64 = wx.arrayBufferToBase64(arrayBuffer);
                data.base64 = base64;
                this.data.loadding && wx.hideLoading();
                this.triggerEvent('cropper', data);
              }
            }, this);
          } else {
            wx.canvasToTempFilePath({
                ...params,
                canvasId: 'tui-image__cropper',
                success: res => {
                  data.url = res.tempFilePath;
                  data.base64 = res.tempFilePath;
                  this.data.loadding && wx.hideLoading();
                  this.triggerEvent('cropper', data);
                },
                fail(res) {
                  console.log(res)
                }
              },
              this
            );
          }

        });
      };
      draw();
    },
    change(e) {
      this.setData({
        cutX: e.cutX || 0,
        cutY: e.cutY || 0,
        imgWidth: e.imgWidth || this.data.imgWidth,
        imgHeight: e.imgHeight || this.data.imgHeight,
        scale: e.scale || 1,
        angle: e.angle || 0,
        imgTop: e.imgTop || 0,
        imgLeft: e.imgLeft || 0
      })
    },
    imageReset() {
      let sys = this.data.sysInfo.windowHeight ? this.data.sysInfo : wx.getSystemInfoSync();
      this.data.resetChange++;
      this.setData({
        scale: 1,
        angle: 0,
        imgTop: sys.windowHeight / 2,
        imgLeft: sys.windowWidth / 2,
        props: `4,${this.data.resetChange}`
      }, () => {
        //初始化旋转角度 0deg
        this.triggerEvent('initAngle', {});
      })
    },
    imageLoad(e) {
      this.imageReset();
      wx.hideLoading();
      setTimeout(() => {
        this.triggerEvent('imageLoad', {});
      }, 20)
    },
    imgComputeSize(width, height) {
      //默认按图片最小边 = 对应裁剪框尺寸
      let imgWidth = width,
        imgHeight = height;
      if (imgWidth && imgHeight) {
        if (imgWidth / imgHeight > this.data.width / this.data.height) {
          imgHeight = this.data.height;
          imgWidth = (width / height) * imgHeight;
        } else {
          imgWidth = this.data.width;
          imgHeight = (height / width) * imgWidth;
        }
      } else {
        let sys = this.data.sysInfo.windowHeight ? this.data.sysInfo : wx.getSystemInfoSync();
        imgWidth = sys.windowWidth;
        imgHeight = 0;
      }
      this.data.sizeChange++;
      this.setData({
        imgWidth: imgWidth,
        imgHeight: imgHeight,
        props: `2,${this.data.sizeChange}`
      })

    },
    moveStop() {
      clearTimeout(this.data.TIME_CUT_CENTER);
      this.data.TIME_CUT_CENTER = setTimeout(() => {
        //动画启动
        if (!this.data.cutAnimation) {
          this.data.centerChange++;
          this.setData({
            props: `5,${this.data.centerChange}`
          })
        }
      }, 666)
    },
    moveDuring() {
      clearTimeout(this.data.TIME_CUT_CENTER);
    },
    showLoading() {
      wx.showLoading({
        title: '请稍候...',
        mask: true
      });
    },
    stop() {},
    back() {
      wx.navigateBack();
    },
    angleChanged(val) {
      this.moveStop();
      if (val % 90) {
        this.setData({
          angle:Math.round(val / 90) * 90
        })
      }
      this.data.angleChange++;
      this.setData({
        props: `3,${this.data.angleChange}`
      })
    },
    setAngle() {
      this.setData({
        animation: true,
        angle: this.data.angle + 90
      }, () => {
        this.angleChanged(this.data.angle);
      })
    }

  }
})