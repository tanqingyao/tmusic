# tmusic

## 项目介绍

一个零基础自学vue后的练手项目，目标是实现一个web移动端的播放器。原本使用的vue2.x，在学习过程中查文档觉得vue3的API中的功能比较好，趁着才刚刚开始迁移过来。

全程参考QQ音乐APP，其中获取数据利用的[API转发项目文档](https://jsososo.github.io/QQMusicApi)。
项目初始的基本搭建过程，可以参考[B站教程](https://www.bilibili.com/video/BV15741177Eh)

慢慢实现，欢迎学习vue的同学一起交流。

## 运行项目

1. 本地后端接口
   参考[API接口转发文档](https://jsososo.github.io/QQMusicApi)，具体过程文档中有介绍，这里修改的配置有
   - 跨域设置。在`app.js`中加入如下设置

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

   - 设置cookie。开发过程中为了听杰伦的歌，其实也可以不设置。大概过程就是自己在网页登录了，获取自己的cookie，然后利用[API接口转发文档](https://jsososo.github.io/QQMusicApi)中的方法，用postman发送一个post请求既可

2. 前端项目

```shell
cd tmusic
npm install
npm run serve
```

## 开发记录及功能介绍

### 已完成

- [x] 2021年1月17日：迁移基本项目结构，显示推荐歌曲及详情页
- [x] 2021年1月18日：迁移完player组件，播放、暂停、切歌，自动播放；显示进度条
- [x] 2021年1月19日：进度条拖动定位

### 待完成

- [ ] 播放器切换添加动画
- [ ] 播放器自动切换下一曲
- [ ] 随机获取歌曲
- [ ] 播放时背景图及虚化
