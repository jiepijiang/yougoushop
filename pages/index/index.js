// import 语句只支持相对路径 -- 导入自己封装的axios
import axios from "../../request/myAxios"
// axios({
//   url: '/home/swiperdata'
// }).then(res => {
//   console.log(res);
// })

Page({
  // 页面数据
  data: {
    // 轮播图的数据
    swiperData: [],
    // 导航的数据
    navData: [],
    // 楼层的数据
    floorData: [{
      floor_title: {},
      product_list: []
    }]
  },

  // 页面加载的声明周期函数
  onLoad() {

    // 1.这里是轮播图的请求
    wx.request({
      // 请求的接口地址
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      // 请求方式
      method: "GET",
      // 请求成功之后的回调函数
      success: (res) => {
        // console.log(res);
        const swiperData = res.data.message;
        // console.log(swiperData);
        // 将数据保存到data的swiperData
        this.setData({
          swiperData
        })
      }
    });

    // 2.轮播图下面导航的请求
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
      method: "GET",
      success: (res) => {
        const navData = res.data.message;
        // console.log(navData);
        // 为什么要做这一步呢?因为后台返回的跳转路径是/pages/category/main,但是我们创建的页面是/pages/category/index,所以要将后面的main给替换掉
        navData.forEach(element => {
          if (element.navigator_url) {
            element.navigator_url = element.navigator_url.replace('/main', "/index")
          }
        });
        // console.log(navData);
        // 将数据保存到data的swiperData
        this.setData({
          navData
        })
      }
    })

    // 3.时尚女装的请求
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
      method: "GET",
      success: (res) => {
        // console.log(res);
        const floorData = res.data.message;
        floorData.forEach((item, index) => {
          item.id = index
        })
        this.setData({
          floorData
        })
        // console.log(floorData);
      }
    })
  },

  // 导航栏事件处理函数 -- 点击跳转页面
  goToPage(e) {
    // console.log(e);
    const {
      open_type,
      navigator_url
    } = e.currentTarget.dataset.item;
    console.log(open_type, navigator_url);
    if (open_type === 'switchTab') {
      wx.switchTab({
        url: navigator_url
      })
    }

  }
})