---
title: hexo的使用
date: 2018-11-09 09:59:24
tags: hexo
---

### 基本用法 [hexo官网](https://hexo.io)

- hexo n "新文章"  创建文章
- hexo g 生成静态文件
- hexo s 启动server 本地预览
- hexo d 部署到github
- hexo clean 清除生成的静态文件

### 在hexo中插入图片
> https://github.com/CodeFalling/hexo-asset-image


### 关于更换电脑
hexo部署到github上的只有生成的静态文件,不包括hexo本身的环境以及md格式的post文件,如果你要在
两台电脑上同时写blog,或者更换了电脑,那情况就有点复杂,下面我们说一下解决方案 [参考链接](www.zhihu.com/question/21193762/answer/79109280)

###### hexo 的搭建流程

1. 创建仓库，http://idealspark.github.io
2. 使用git clone https://github.com/idealspark/idealspark.github.io.git拷贝仓库
3. 在master之外创建hexo分支,然后切换到hexo分支
4. 在hexo分支下安装,初始化hexo环境:
通过Git bash依次执行npm install hexo、hexo init、npm install 和 npm install hexo-deployer-git
6. 修改_config.yml中的deploy参数，分支应为master
7. 依次执行git add .、git commit -m "..."、git push origin hexo提交安装的环境到github上
8. 执行hexo g -d,生成静态文件会部署到GitHub的master分支上
9. 最终在GitHub上的http://idealspark.github.io仓库就有两个分支，
一个hexo分支用来存放搭建的环境和post文件，一个master分支用来存放生成的静态网页

###### 日常更新博客流程

1. 首先更新博客是在hexo分支上
2. 正常执行hexo n g 等hexo生成blog的指令
3. 依次执行git add .、git commit -m "..."、git push origin hexo指令将改动
推送到GitHub的hexo分支上；
4. 最后执行hexo g -d发布网站到github上,虽然现在是在hexo分支上,但hexo g -d 会把生成的静态文件推送到master分支上

###### 更换电脑或在其他电脑上更新博客流程

1. 使用git clone https://github.com/idealspark/idealspark.github.io.git拷贝仓库；
2. 切换到hexo分支
3. 通过Git bash依次执行下列指令：npm install hexo、npm install、npm install hexo-deployer-git
**不需要hexo init这条指令**

###### 更新hexo配置流程,如更改theme
1. 首先切换到hexo分支上
2. 更改hexo配置
3. 执行git add .、git commit -m "..."、git push origin hexo 推送到GitHub hexo分支上