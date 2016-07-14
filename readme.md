# 请写login.html和registration_form.html

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
