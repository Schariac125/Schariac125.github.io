---
title: 萌新向：从零开始，用 VS Code 写出你的第一行Python代码
published: 2026-09-02
description: ""
tags: [萌新妙妙屋]
category: 程序设计
licenseName: "Unlicensed"
author: Schariac125
sourceLink: ""
draft: false
---
## 0. 前言

Python 对于很多第一次接触计算机的小白来说，其实并不算完全陌生，毕竟在不少省份的高中信息技术课上，第一门正式教授的编程语言就是 Python。那时候你可能已经学会了变量赋值、条件判断、循环这些基础语法，甚至能写出几个简单的计算小程序。

不过，高中的教学往往止步于“能用”，很少告诉你怎样把代码写得既清晰又规范，也就是所谓的“优雅”。

为了让你的 Python 之路有一个漂亮的起点，这篇文章会手把手带你从零开始配置 VS Code，并写下你的第一行 `print("hello world")`。别担心，不需要任何前置知识，跟着步骤一步步来就行。等你看到终端里跳出那句经典的问候语，你就正式踏入了编程的大门。

当然，如果在安装过程中出现问题，可以通过 AI 等工具寻找解决方案。

## 1. 下载 VS Code

VS Code 是现在最常用的编辑器之一，这一步将教会你如何下载到正确的 VS Code。记住，VS Code 的下载和使用是完全免费的，任何要求你付费的都是骗钱的。

首先进入 VS Code 的官网 https://code.visualstudio.com/ 

（请认准这个网址，其他的网址很多都是骗人的）

进入之后，你会看到这样的一个界面：

![deafcb8b8f32b3ce627209a14ef4446f.png](https://s3.bmp.ovh/2026/09/02/cPXazIVa.png)

直接点击 Download for Windows，之后浏览器会自动下载 VS Code 的安装程序。

下载好之后，直接双击打开

![6b0ba3600e0ffa7b22364b393aad7512.png](https://s3.bmp.ovh/2026/09/02/CAB5vPUa.png)

同意此协议之后，直接疯狂点击下一步即可，记得在第二步的时候将所有选项都勾选上，这样之后使用会更加方便。

安装好之后，直接打开 VS Code，你应该会看到类似于这样子的一个页面

![image.png](https://s3.bmp.ovh/2026/09/02/5WRvNTB7.png)

如果你能顺利进入，就说明你的 VS Code 已经安装好了，现在可以恭喜一下自己了，那么下一步就是该如何去安装 Python。

**当然你其实也可以在微软应用商店直接下载你的 VS Code**

## 2. 安装 Python

**首先，我们不建议直接在微软应用商店之类的地方去下载 Python**

Python 是一个对版本非常敏感的语言，有些包在旧版上能运行，但在新版上就会有各种各样的小问题，例如 `Pytorch` 就存在这种情况，它在高版本的 Python 环境下就容易出现错误。

为了追求稳定，我推荐你在琳琅满目的 Python 版本中选择 3.12.3 版本，这是目前比较稳定的版本。

因为在 Python 3.13 后，官网不再提供直接安装特定版本的 exe。既然这样，那我们推荐另一种方式，即使用 `uv` 安装 Python。

`uv` 是一个强大的工具，其用途非常广泛，在后面的学习中你将会更经常接触到它，而它也提供了很好的安装体验。

首先在 Windows 系统下打开终端（PowerShell），请不要打开 cmd。

你可以在开始菜单直接搜索 PowerShell 来打开它。

打开后，输入这行命令

```shell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

这条命令会将 `uv` 自动安装到你的计算机上，然后，关闭现有终端，重新打开一个新的终端。这一步很重要。

输入这一行命令验证 `uv` 是否生效。

```shell
uv --version
```

如果正常输出版本号，说明安装正常

然后使用 `uv` 安装 Python 3.12.3

```shell
uv python install 3.12.3
```

完成后输入

```shell
uv python list
```

即可查看本机管理的所有 Python 环境。

`uv` 的相关使用参考这篇文章：

https://blog.weijx.vip/p/uv%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8/

## 3. 怎么在 VS Code 上写 Python。

首先打开你安装好的 VS Code，找到左边的那四个小方块

![837de187654f0a924dfb5c0429ab26a2.png](https://s3.bmp.ovh/2026/09/02/WL1cKvDZ.png)

安装 Python 拓展，这个拓展会自行附带一些别的工具

安装完毕之后可以重启一次 VS Code。

随后随便打开一个文件夹，创建文件 `main.py`，在文件中写入代码

```python
print("hello world")
```

然后在 VS Code 中打开你的终端，使用快捷键 ctrl+shift+` 即可

然后依次在终端中输入命令

```shell
uv venv

.venv\Scripts\activate

uv run main.py
```

如果一切顺利，你应该会看到这样的结果

![8efb1e9508de43dc90983fec4c6c8fc8.png](https://s3.bmp.ovh/2026/09/02/28lpd2UO.png)

恭喜，到这一步基本就可以了。

后续更多关于 `uv`和 VS Code 的使用就需要自己去探索了

## 4. 写在最后

这有什么好写的兄弟（）

还不会建议去用 Pycharm 啊（）



