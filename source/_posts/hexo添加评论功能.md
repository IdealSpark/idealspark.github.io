---
title: hexo添加评论功能
date: 2018-11-10 14:48:09
tags: 
  - hexo
  - 工具 
categories: 
  - 工具
  - hexo
---

  目前网上有很多给hexo添加评论的插件,比如disqus,畅言,友言,gitment等,但发现他们都不适合我,我想要一个
足够简单,最好评论放在github上,这样我只需要维护一个Github就可以了,[gitment](https://imsun.net/posts/gitment-introduction/)是挺符合我的需求,但不知道
为什么现在用不了,于是我就自己动手做了一个[源码](https://gist.github.com/idealspark/fbbce66d4a8cb1d3cc4beeea46aba103)

### 设计思路
主要用了一下Github的issue功能,每使用hexo n新建一篇文章就到GitHub的仓库下创建一个issue,然后在文章的
末尾添加一个评论的链接,定位到issue,具体效果请点击[查看评论或留言](https://github.com/idealspark/idealspark.github.io/issues/8),评论需要注册github账号,
只会在使用hexo n 命令时创建issue

### 使用
1. 在blog的根目录下创建script目录,拷贝[源码](),放到script目录下
2. [创建GitHub访问token](https://github.com/settings/tokens),scope选择public_repo即可
3. 在blog根目录下的_config.yml 添加如下配置
    ```yml
    comment:
      username: github用户名 #github用户名
      repository: 仓库名 #blog仓库地址
      token: 你的token #github生成的token
    ```
4. 每次使用hexo n 创建文章时会自动创建评论链接,如果不想创建issue,手动到soure/_post创建文章的md文件
5. 文章标题修改后,需要手动修改issue的描述
6. 请不要滥用github,定期删除文章不存在,也没有评论的issue

<!-- more -->

### 一点感悟
1. 在文章后面追加评论链接时,一开始我希望hexo给我提供操作文章模板的API,找了半天也没找到,既然能直接拿到
生成的文件,为什么不直接用fs去操作文件呢
2. 为了把GitHub的token做成可配置的,我以为hexo会提供读取_config.yml配置变量的API,搜索了一圈也没找到,为什么
不直接去读取解析_config.yml的配置文件呢
3. 不要对api有过度依赖,可以思考能直接拿到那些些资源,自己动手

相关阅读
[hexo的使用](http://localhost:4000/2018/11/09/hexo%E7%9A%84%E4%BD%BF%E7%94%A8/)

　
[查看评论或留言](https://github.com/idealspark/idealspark.github.io/issues/8)

### 源码
```js
const fs = require('fs');
yaml = require('js-yaml');
var GitHub = require('github-api');

var doc = yaml.safeLoad(fs.readFileSync('_config.yml', 'utf8'));
var repository = doc.comment.repository;
var token = doc.comment.token;
var username = doc.comment.username;

var github = new GitHub({
  username: username,
  token: token
});
try {
  hexo.on('new', function (post) {//当generate完成后执行备份
    var path = post.path
    let name = path.substring(1 + path.lastIndexOf("\\"),
        path.lastIndexOf("."));
    console.log("生成了新的post ：" + name);

    var blogIssure = github.getIssues(username, repository);
    blogIssure.createIssue({
      "title": name,
      "body": "欢迎留言,如果不能留言,请先注册GitHub账号"
    }).then(function ({data}) {
      var commentUrl = data.html_url
      console.log("评论链接: " + data.html_url)
      var comementLink = "\r\n　\r\n[查看评论或留言](" + commentUrl + ")"
      fs.appendFile(path, comementLink, function (err) {
        if (err) {
          console.log('创建评论连接出错: ' + err);
        }
        console.log('成功的创建了评论连接');
      })
    });

  });
} catch (e) {
  console.log("生成评论连接出错,错误详情为：" + e.toString());
}

```