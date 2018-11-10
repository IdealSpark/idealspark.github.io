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
