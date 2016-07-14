## 0715 后端提交
1. 修改了`base.html`，主要是加了登录那块的的 `{% block logstatus %}`
1. 修改`profile.html`为django模板，并移到了users目录下
2. 修改了`users/login.html`,`users/regiseter_form.html`，用到了django的表单类，见[DB2.0 chapter 7](djangobook.py3k.cn/2.0/chapter07/),可以登录和注册了，只是样式还要你们改了。。。
3. 上传了一些用户操作的简单模板，麻烦你们调整样式。

## 请写login.html和registration_form.html

## 前端提交说明 （20160712）
1. login.html和registration_form.html 已添加， 请查收
2. 我把html 中的连接给修改回来了， 理由如下：
  - 后端应该是可以直接读取static 下面的文件的， 因而我直接去掉了 `/static` 前面的相对路径标识
  - 如果额外使用相对路径定位的话， 可能造成url 不统一的情况， 比如点击注册， url 为 `http://127.0.0.1:5000/accounts/login/`， 再次点击注册的话， 就成了 `http://127.0.0.1:5000/accounts/login/accounts/login/`， 所以我将 后端添加的连接 `accounts/login/` 改成了 `/accounts/login`
3. 如果有不正确的地方， 希望大家提出来

## 前端提交说明 （20160713）
1. 修正`registeration_form.html`中相对路径（上次没改过来）
2. 修改首页课程列表显示方式， 允许用户用户通过鼠标移入操作显示课程列表信息
3. 课程列表信息需要涉及与后端数据的交互， 后端可以尝试使用 for 循环加载显示数据库中的信息


## 前端提交说明 （20160714）
1. 添加了player.html 展示ppt 页面

##前端提交说明（2016年7月14日16:04:41）
1.上传了mycenter.html，对应教师个人页面

## 前端提交说明 （20160714 17:31 by zhyh2010）
将login， index， register， create， player生成django框架支持的模板格式
其余文件暂时没测试
ps mycenter.html 渲染效果有点问题， 可能需要修改下

## 前端提交说明（2016年7月14日19:24:05）
  已修复上述问题，并重新提交了profile.html文件代替mycenter.html文件，请测试反馈。
