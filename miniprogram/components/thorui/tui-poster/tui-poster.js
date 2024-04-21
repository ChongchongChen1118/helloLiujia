const posterId = `poster_${Math.ceil(Math.random() * 10e5).toString(36)}`
Component({
  properties: {
     //海报宽度，单位rpx
			width: {
        type: String,
        optionalTypes:[Number],
        value: 800,
        observer(val){
          this.setData({
            cv_width:this.getPX(this.data.width)
          })
        }
			},
			//海报高度，单位rpx
			height: {
        type: String,
        optionalTypes:[Number],
        value: 1200,
        observer(val){
          this.setData({
            cv_height:this.getPX(this.data.height)
          })
        }
			},
			//像素比
			pixel: {
        type: String,
        optionalTypes:[Number],
				value: 3
			}
  },
  lifetimes:{
     attached:function(){
       this.setData({
        cv_width:this.getPX(this.data.width),
        cv_height:this.getPX(this.data.height)
       })
     },
     ready:function(){
      setTimeout(() => {
				this.data.ctx = wx.createCanvasContext(this.data.posterId, this)
				this.triggerEvent('ready', {})
			}, 50)
     }
  },
  data: {
    posterId: posterId,
    cv_width: 400,
    cv_height: 600,
    ctx:null
  },
  methods: {
    toast(msg) {
      wx.showToast({
        title: msg,
        icon: 'none'
      })
    },
    rpx2px(value){
      let sys=wx.getSystemInfoSync()
      return sys.windowWidth / 750 * value
    },
    getPX(val) {
      return this.rpx2px(Number(val) * Number(this.data.pixel))
    },
    getWrapText(text, fontSize, textWidth, width, ctx, rows = 2) {
      let textArr = [];
      if (textWidth > width) {
        let fillText = '';
        let lines = 1;
        let arr = text.split('')
        for (let i = 0, len = arr.length; i < len; i++) {
          fillText = fillText + arr[i];
          if (ctx.measureText(fillText).width >= width) {
            if (lines === rows && rows !== -1) {
              if (i !== arr.length - 1) {
                fillText = fillText.substring(0, fillText.length - 1) + '...';
              }
              textArr.push(fillText);
              break;
            }
            textArr.push(fillText);
            fillText = '';
            lines++;
          } else if (i === arr.length - 1) {
            textArr.push(fillText);
          }
        }
      } else {
        textArr.push(text)
      }
      return textArr;
    },
    startDrawText(ctx, param) {
      let styles = param.style || {}
      let {
        left,
        top,
        fontSize,
        color,
        baseLine = 'normal',
        textAlign = 'left',
        frontSize,
        spacing,
        opacity = 1,
        lineThrough = false,
        width = 600,
        rows = 1,
        lineHeight = 0,
        fontWeight = 'normal',
        fontStyle = 'normal',
        fontFamily = "sans-serif"
      } = styles;
      ctx.save();
      ctx.beginPath();
      ctx.font = fontStyle + " " + fontWeight + " " + this.getPX(fontSize).toFixed(0) + "px " + fontFamily
      ctx.setGlobalAlpha(opacity);
      // ctx.setFontSize(this.getPX(fontSize));
      ctx.setFillStyle(color);
      ctx.setTextBaseline(baseLine);
      ctx.setTextAlign(textAlign);
      let textWidth = ctx.measureText(param.text).width;
      width = this.getPX(width);
      let textArr = this.getWrapText(param.text, fontSize, textWidth, width, ctx, rows)
      if (param.frontText) {
        ctx.setFontSize(this.getPX(frontSize));
        left = ctx.measureText(param.frontText).width + this.getPX(left + spacing);
        ctx.setFontSize(this.getPX(fontSize));
      } else {
        left = this.getPX(left)
      }
      textArr.forEach((item, index) => {
        ctx.fillText(item, left, this.getPX(top + (lineHeight || fontSize) * index))
      })
      ctx.restore();
      if (lineThrough) {
        let lineY = top;
        switch (baseLine) {
          case 'top':
            lineY += fontSize / 2 + 4;
            break;
          case 'middle':
            break;
          case 'bottom':
            lineY -= fontSize / 2 + 4;
            break;
          default:
            lineY -= fontSize / 2 - 3;
            break;
        }
        ctx.save();
        ctx.moveTo(left, this.getPX(lineY));
        ctx.lineTo(left + textWidth + 2, this.getPX(lineY));
        ctx.setStrokeStyle(color);
        ctx.stroke();
        ctx.restore();
      }
    },
    drawRadiusRect(ctx, styles) {
      let {
        left,
        top,
        width,
        height,
        borderRadius
      } = styles;
      let r = this.getPX(borderRadius / 2);

      left = this.getPX(left)
      top = this.getPX(top)
      width = this.getPX(width)
      height = this.getPX(height)

      ctx.beginPath();
      ctx.arc(left + r, top + r, r, Math.PI, Math.PI * 1.5);
      ctx.moveTo(left + r, top);
      ctx.lineTo(left + width - r, top);
      ctx.lineTo(left + width, top + r);

      ctx.arc(left + width - r, top + r, r, Math.PI * 1.5, Math.PI * 2);
      ctx.lineTo(left + width, top + height - r);
      ctx.lineTo(left + width - r, top + height);

      ctx.arc(left + width - r, top + height - r, r, 0, Math.PI * 0.5);
      ctx.lineTo(left + r, top + height);
      ctx.lineTo(left, top + height - r);

      ctx.arc(left + r, top + height - r, r, Math.PI * 0.5, Math.PI);
      ctx.lineTo(left, top + r);
      ctx.lineTo(left + r, top);
    },
    startDrawImage(ctx, param) {
      let styles = param.style || {}
      let {
        left,
        top,
        width,
        height,
        sx,
        sy,
        borderRadius = 0,
        borderWidth = 0,
        borderColor
      } = styles;
      ctx.save();
      if (borderRadius > 0) {
        this.drawRadiusRect(ctx, styles);
        ctx.strokeStyle = 'rgba(0,0,0,0)'
        ctx.stroke();
        ctx.clip();
      }
      ctx.drawImage(param.src, this.getPX(left), this.getPX(top), this.getPX(width), this.getPX(
        height))
      if (borderWidth && borderWidth > 0) {
        ctx.setStrokeStyle(borderColor);
        ctx.setLineWidth(this.getPX(borderWidth));
        ctx.stroke();
      }
      ctx.restore();
    },
    startDrawRect(ctx, param) {
      let styles = param.style || {}
      let {
        width,
        height,
        left,
        top,
        borderWidth,
        backgroundColor,
        gradientColor,
        gradientType = 1,
        borderColor,
        borderRadius = 0,
        opacity = 1,
        shadow
      } = styles;
      if (backgroundColor) {
        ctx.save();
        ctx.setGlobalAlpha(opacity);
        if (gradientColor) {
          let grd = null;
          if (gradientType == 1) {
            grd = ctx.createLinearGradient(0, 0, this.getPX(width), this.getPX(height))
          } else {
            grd = ctx.createLinearGradient(0, this.getPX(width), this.getPX(height), 0)
          }
          grd.addColorStop(0, backgroundColor)
          grd.addColorStop(1, gradientColor)
          ctx.setFillStyle(grd);
        } else {
          ctx.setFillStyle(backgroundColor);
        }

        if (shadow) {
          const {
            offsetX,
            offsetY,
            blur,
            color
          } = shadow;
          ctx.shadowOffsetX = this.getPX(offsetX)
          ctx.shadowOffsetY = this.getPX(offsetY)
          ctx.shadowBlur = blur
          ctx.shadowColor = color
        }

        if (borderRadius > 0) {
          this.drawRadiusRect(ctx, styles);
          ctx.fill();
        } else {
          ctx.fillRect(this.getPX(left), this.getPX(top), this.getPX(width), this.getPX(height));
        }
        ctx.restore();
      }
      if (borderWidth) {
        ctx.save();
        ctx.setGlobalAlpha(opacity);
        ctx.setStrokeStyle(borderColor);
        ctx.setLineWidth(this.getPX(borderWidth));
        if (borderRadius > 0) {
          this.drawRadiusRect(ctx, styles);
          ctx.stroke();
        } else {
          ctx.strokeRect(this.getPX(left), this.getPX(top), this.getPX(width), this.getPX(height));
        }
        ctx.restore();
      }

    },
    startDrawLine(ctx, param) {
      let styles = param.style
      let {
        left,
        top,
        endLeft,
        endTop,
        color,
        width = 1
      } = styles;
      ctx.save();
      ctx.beginPath();
      ctx.setStrokeStyle(color);
      ctx.setLineWidth(this.getPX(width));
      ctx.moveTo(this.getPX(left), this.getPX(top));
      ctx.lineTo(this.getPX(endLeft), this.getPX(endTop));
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    },
    judgePermissionPhotoLibrary: async function(callback) {
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success() {
          callback && callback(true)
        },
        fail() {
          wx.showModal({
            title: '提示',
            content: '您还没有开启相册权限，是否立即开启？',
            showCancel: true,
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success(res) {}
                });
              }
            }
          })
        }
      })
    },
    imgDownload(url) {
      return new Promise((resolve, reject) => {
        wx.downloadFile({
          url: url,
          success: res => {
            resolve(res.tempFilePath);
          },
          fail: err => {
            reject(false)
          }
        })
      })
    },
    base64ToImg(base64) {
      const uniqueId = `poster_${Math.ceil(Math.random() * 10e5).toString(36)}`
      return new Promise((resolve, reject) => {
        const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || [];
        let arrayBuffer = wx.base64ToArrayBuffer(bodyData)
        const filePath = `${wx.env.USER_DATA_PATH}/${uniqueId}.${format}`;
        wx.getFileSystemManager().writeFile({
          filePath,
          data: arrayBuffer,
          encoding: 'binary',
          success() {
            resolve(filePath);
          },
          fail() {
            reject(false)
          }
        })
      })
    },
    startDraw(data, callback) {
      let ctx = this.data.ctx
      if (ctx) {
        ctx.clearRect(0, 0, this.data.cv_width, this.data.cv_height)
        data.forEach((item) => {
          if (item.type === 'image') {
            this.startDrawImage(ctx, item)
          } else if (item.type === 'text') {
            this.startDrawText(ctx, item)
          } else if (item.type === 'rect') {
            this.startDrawRect(ctx, item)
          } else if (item.type === 'line') {
            this.startDrawLine(ctx, item)
          }
        });
        const platform = wx.getSystemInfoSync().platform;
        let time = 80;
        if (platform === 'android') {
          time = 300;
        }
        setTimeout(() => {
          ctx.draw(false, () => {
            setTimeout(() => {
              wx.canvasToTempFilePath({
                x: 0,
                y: 0,
                canvasId: this.data.posterId,
                fileType: 'png',
                quality: 1,
                success: function(res) {
                  callback && callback(res.tempFilePath)
                },
                fail() {
                  callback && callback(false)
                }
              }, this)
            }, time)
          })
        }, 50)
      } else {
        callback && callback(false)
      }
    },
    draw(data, callback) {
      // text（文本）、image（图片）、rect（矩形），line（线条）
      // {
      // 	type:'image',
      //  src:'',
      // 	style:{

      // 	}
      // }
      if (!data || data.length === 0) return;
      let func = [],
        idxes = [];
      data.forEach((item, index) => {
        if (item.type === 'image') {
          //图片类型：1-本地图片（需要平台支持）；2-网络图片； 3- base64 图片（仅App，微信小程序，H5支持）
          if (item.imgType == 2) {
            func.push(this.imgDownload(item.src))
            idxes.push(index)
          }
          // #ifdef APP-PLUS || H5 || MP-WEIXIN
          if (item.imgType == 3) {
            func.push(this.base64ToImg(item.src))
            idxes.push(index)
          }
          // #endif
        }
      })
      if (func.length > 0) {
        Promise.all(func).then(res => {
          res.forEach((imgRes, idx) => {
            let item = data[idxes[idx]]
            item.src = imgRes
          })
          this.startDraw(data, callback)

        }).catch(err => {
          console.log(err)
          this.toast('图片处理失败!')
        })
      } else {
        this.startDraw(data, callback)
      }
    },
    save(file) {
      this.judgePermissionPhotoLibrary((res) => {
        if (res) {
          wx.saveImageToPhotosAlbum({
            filePath: file,
            success: (res) => {
              this.toast('图片已保存到相册')
            },
            fail: (res) => {
              this.toast('图片保存失败')
            }
          })
        }
      })
    }

  }
})
