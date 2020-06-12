// pages/home/home.js
var pageData={}

Page( 
  
  {


  /**
   * 页面的初始数据
   */

  data: {
    viewimage: [],
    imagelist: [],
    flag: false,
    text: '',
    array:['否','是'],
    font_size:100,
    line_spacing:100,
    left_margin:100,
    top_margin:100,
    right_margin:100,
    bottom_margin:100
  },
  slider1change(e){
    this.setData({
      line_spacing:e.detail.value
    })
    console.log('line_spacing:'+this.data.line_spacing);
    
  },
  slider2change(e){
    this.setData({
      font_size:e.detail.value
    })
    console.log('font_size:'+this.data.font_size);
    
  },
  slider3change(e){
    this.setData({
      left_margin:e.detail.value
    })
    console.log('left_margin:'+this.data.left_margin);
    
  },
  slider4change(e){
    this.setData({
      right_margin:e.detail.value
    })
    console.log('right_margin:'+this.data.right_margin);
    
  },
  slider5change(e){
    this.setData({
      bottom_margin:e.detail.value
    })
    console.log('bottom_margin:'+this.data.bottom_margin);
    
  },
  slider6change(e){
    this.setData({
      top_margin:e.detail.value
    })
    console.log('top_margin:'+this.data.top_margin);
    
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.viewimage,
      current: e.currentTarget.dataset.url
    });
    console.log(e);
    
  },
  view(e) {
    wx.previewImage({
      urls: this.data.imagelist,
      current: e.currentTarget.dataset.url
    });
    console.log(e);
    
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  bindPickerChange: function(e) {
    
    this.setData({
      index: e.detail.value,
      flag:Number(e.detail.value)?true:false
    })
    console.log(this.data.flag,e);
    
  },
  upload() {
    var that = this
    wx.chooseImage({
      success(res) {
        that.setData({
          viewimage: res.tempFilePaths
        })
        console.log(that.data.viewimage[0]);

      }
    })
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.viewimage.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            viewimage: this.data.viewimage
          })
        }
      }
    })
  },
  pb() {
var that=this
    if (!(this.data.text)) {
   
      wx.showToast({
        title: '文本内容不能为空',
        icon: 'none'
      })
      return
    }
    if (!(this.data.viewimage[0])) {

      wx.showToast({
        title: '图片内容不能为空',
        icon: 'none'
      })
      return
    }
    wx.uploadFile({
      
      url: 'https://www.yyyjcb3.cn/files/?flag=' + this.data.flag, //仅为示例，非真实的接口地址
      filePath: this.data.viewimage[0],
      name: 'file',
      formData: {
        world: this.data.text,
        font_size:this.data.font_size,
        line_spacing:this.data.line_spacing,
        left_margin:this.data.left_margin,
        top_margin:this.data.top_margin,
        right_margin:this.data.right_margin,
        bottom_margin:this.data.bottom_margin
      }, 
      success(res) {
        console.log(res);
        that.setData({
          imagelist: JSON.parse(res.data)
        })

        console.log(that.data.imagelist);

        //do something
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      text: e.detail.value
    })
    console.log(this.data.text);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
