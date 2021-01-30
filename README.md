# tmusic

## 项目介绍

一个零基础自学vue后的练手项目，目标是实现一个web移动端的播放器。原本使用的vue2.x，在学习过程中查文档觉得vue3的API中的功能比较好，趁着才刚刚开始迁移过来。

全程参考网易云[API接口文档](https://github.com/Binaryify/NeteaseCloudMusicApi)(界面设计得更好看)~~QQ音乐APP~~。

项目初始的基本搭建过程，可以参考[B站教程](https://www.bilibili.com/video/BV15741177Eh)

慢慢实现，欢迎学习vue的同学一起交流。

## 运行项目

1. 本地后端接口(已更改为[网易云api](https://github.com/Binaryify/NeteaseCloudMusicApi),更容易运行直接按文档运行就行了,登录也更简单)
   ~~参考[API接口转发文档](https://jsososo.github.io/QQMusicApi)，具体过程文档中有介绍，这里修改的配置有~~
   - ~~跨域设置。在`app.js`中加入如下设置~~

        ```js
        const app = express()

        //设置允许跨域
        app.all('*', function (req, res, next) {
        //设置允许跨域的域名，*代表允许任意域名跨域
        res.header('Access-Control-Allow-Origin', '*')
        //允许的header类型
        res.header('Access-Control-Allow-Headers', 'content-type')
        //跨域允许的请求方式
        res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
        if (req.method.toLowerCase() == 'options') res.send(200)
        //让options尝试请求快速结束
        else next()
        })
        ```
   - ~~设置cookie。开发过程中为了听杰伦的歌，其实也可以不设置。大概过程就是自己在网页登录了，获取自己的cookie，然后利用[API接口转发文档](https://jsososo.github.io/QQMusicApi)中的方法，用postman发送一个post请求既可~~

2. 前端项目

```shell
cd tmusic
npm install
npm run serve
```

## 开发记录及功能介绍

### 已有功能

- [x] 推荐页面:轮播图，搜索框，推荐歌单
- [x] 歌单详情页
- [x] mini播放器，播放、暂停、进入歌曲列表
- [x] 全部播放器，切歌，选择播放顺序，自动播放；进度条显示和拖动定位
- [x] 歌词显示和滚动，歌词选择跳转

### 正在进行

- [ ] 搜索详情页显示
- [ ] 歌单详情页功能

### 待完成

- [ ] 播放器切换添加动画
- [ ] 播放器自动切换下一曲
- [ ] 随机获取歌曲

### 开发记录

- [x] 2021年1月17日：迁移基本项目结构，显示推荐歌曲及详情页
- [x] 2021年1月18日：迁移完player组件，播放、暂停、切歌，自动播放；显示进度条
- [x] 2021年1月19日：进度条拖动定位，player样式调整
- [x] 2021年1月20日：player组件抽离，播放时背景图及虚化
- [x] 2021年1月21日：歌词显示和滚动
- [x] 2021年1月22日：播放器相关变量存入vuex管理
- [x] 2021年1月23日：歌词显示优化，歌词跳转功能
- [x] 2021年1月24日：修改轮播图样式,添加显示搜索框
- [x] 2021年1月25日：更换网易云api,首页推荐歌单,歌单详情显示
- [x] 2021年1月27日：歌词滚动和跳转bug，歌词代码优化
- [x] 2021年1月28日：player组件组合式api改造完成player组件代码结构调整;功能图片全部使用foteawsome-icon
- [x] 2021年1月29日：添加typescript类型推断:vuex,network/player,歌词功能代码部分
- [ ] 2021年1月30日：搜索页面显示
