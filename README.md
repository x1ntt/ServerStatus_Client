# ServerStatus_Client
是 ServerStatus 的一个客户端实现，原项目[cppla/ServerStatus: 云探针、多服务器探针、云监控、多服务器云监控，演示： https://tz.cloudcpp.com/ (github.com)](https://github.com/cppla/ServerStatus)

主要作为动态壁纸的控件使用

（非常欢迎提`PR` (★ ω ★)）

# 目录说明

## other

包含一些可以直接用的文件

### 2298673278

这个文件夹是修改完毕的`ASUKA/Neon Genesis Evangelion`的所有文件，一般来说直接覆盖对应壁纸目录，或者作为壁纸打开也是可以的。

### asuka

需要手动替换的版本

## 主要文件

+ `css`

  是悬浮窗的样式文件，修改其中的内容可以修改悬浮窗的样式

+ `js`

  + `mover.js`用于实现悬浮窗的拖动操作
  + `status.js`用于定时向服务器请求数据

+ `img`

  图片资源文件

+ `json`

  开发阶段的测试目录

+ `index.html`

  悬浮窗

## 如何二次开发

### 克隆本项目

+ `git clone https://github.com/x1ntt/ServerStatus_Client` （或者直接下载源码`zip`包也可以）
+ 进入`ServerStatus_Client`文件夹
+ 在地址栏执行`python -m http.server`  此时会打开一个`http`服务器，根目录就是当前目录
+ 打开浏览器，默认访问地址`http://127.0.0.1:8000` 应该就能看到例子程序

### 请求的网址链接

+ 你可以使用我的服务器进行测试（默认）
+ 也可以修改`status.js`中的请求连接为`json/stats.json` (推荐)。然后运行`getJson.py`程序会持续调用原项目的数据接口，方便调试和观察效果（这么干主要是为了解决跨域问题）

### 部署

+ 你可以把它镶嵌到动态壁纸中（网页类型的动态壁纸）
+ 也可以改吧改吧放到自己的网站上



## 作为动态壁纸的一部分

### 以`ASUKA/Neon Genesis Evangelion`壁纸为例

在`wallpaper engine`中订阅这个壁纸之后，选中它右键**在资源管理器中打开**，然后直接复制`Other/2298673278`文件夹里面的内容覆盖过去应该就可以了

### 手动替换

你也可以手动把`Other/asuka`文件夹里面的除`index.html`以外的内容手动替换过去，并且将其中的代码按需复制到壁纸对应的`html`文件中

讲道理，这个方法可以设置所有网页类型的动态壁纸



# 可能会遇到的问题

+ 新建项目之后，他会把代码复制一份到自己的目录

  `SteamLibrary\steamapps\common\wallpaper_engine\projects\myprojects`

  这样你怎么修改自己的代码都不好使

+ 有时候鼠标移动消息不会被响应，重启软件大概可以解决，可能和他的开发工具有关系，关掉试试看？

+ nginx设置解决跨域问题

  `add_header 'Access-Control-Allow-Origin' $http_origin;`

  放到server里面



