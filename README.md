# myapp-v2

> 一个简陋的app，基于聚合数据api

# 前言
在刚开始开发的，没有使用vuex，不仅代码杂乱无章，且出现莫名的css先渲染bug，后解决不果，并且思考当两个组件需要数据共享时，不用vuex，用props，emit来传递和响应数据范儿不方便，特别是两个组件高度耦合的时候。遂完全改变数据获取方式，这样反而让我对es2016的各种特性有了一定程度的了解。 
现在开发完成后，发现其实这个app功能并不多，充其量算是一个具备基本开发流程的demo。本来还想做一下电影的查询和详情页，但是聚合的免费api太渣了，能用的不多，能做的更少了。反而觉得豆瓣api起码功能齐全。或者用别人收集好的知乎api，更甚之自己写个爬虫。
api转发后台在[这里](https://github.com/idenet/myappserver)

# 技术栈
vue2 + vuex + vue-router + ES2016 + axios + flex + stylus (写多一点是不是特别有气势😄)

# 项目运行
```
git clone https://github.com/idenet/myapp.git

cd myapp-v2

npm i

npm run dev
```

# 关于数据说明
数据是用的聚合免费的api，因使用的是api，所以有跨域请求，请配合[简易koa后台](https://github.com/idenet/myappserver)，里面有appkey和api求情方式，有需要的可以直接使用。不明白的查看一下聚合那个api的说明就行了。我使用的分别是**微信精选**、**影视影讯检索**、**图书电商数据**这三个。

# 目标功能
- [x] 书籍分类及目录下书籍展示 -- ✅
- [x] 电影列表展示 -- ✅
- [x] 微信精选展示 -- ✅
- [ ] 根据城市搜素电影 -- ❎ （这个功能没做肯定是因为我太懒了）
- [ ] 电影详情页 -- ❎ (这个没做仅仅是因为查询api太渣了)

# 遇到的问题
#### 在苹果手机中border-1px显示过粗问题
网络上的各种方法其实都不太好，苹果的话，0.5px就能解决大部分机型，如果想完美可以用[淘宝](http://efe.baidu.com/blog/1px-on-retina/)

#### 使用vuex保存数据后，better-scroll的使用
这个和vue的生命周期有很大关系。只有放在updated，当dom完全渲染后才能获取真实dom的高度

#### 在使用keep-alive缓存数据后，当在book时不滚动，马上在别的tab页切换，最后回到book页发现better-scroll未生效
这个我想是因为当刷新后，在book页不滚动马上切换，keep-alive缓存了数据，且数据并没有更新的情况下，updated钩子不生效。解决办法是使用activated刷新下就行了。

#### infinite-scroll使用疑惑
按别人已经成功的例子来说我的并没有问题，并且观察vue-devtools的时候数据也是分段加载完成的。是不是因为使用了better-scroll的原因，自动加载剩下的数据？而且不使用better-scroll是无法下拉的

#### 在使用watch和computed的疑惑 
1. computed只要在数据发生改变，就重新渲染
2. watch在vm实例化时，遍历该属性。
watch监控另外的属性来实现数据更新？  
```
watch: {
  'id'() {
    this.loadMore()
  }
}
```

# 能改进的地方
#### router-link使用，vuex-router-sync组件 
我在booklist中使用点击进入bookdetail，但是更为优雅的使用方法应该是用router-link，用路由来控制，但是我在使用路由控制的时候，是吧book这个对象，全传进params，在使用$route获取的时候，每次关闭detail页，$route总的数据就直接置空了，而导致后退后总会控制台报错。
而我现在使用的方式是用vshow来控制，props传递对象数据。这种保证的，数据在组件内流通。但是我想着事不利于维护的。
而现在我可以通过vuex-router-sync来同步state和¥route的属性。这样就能简单的通过store.route.params获取。


# 总结
这个收获是巨大的，对vue有了进一步了解，再实用vuex的时候，对es2016也有了更深的了解，只能说我现在算是真正入门了，顺带一提，使用api开发的时候跨域直接在config／index的dev中的proxyTable中添加下列代码就行了，还是很方便的
```
'/api': 
  {
    target: 'http://api.douban.com/v2',
    changeOrigin: true,
    pathRewrite: {
      '^/api': ''
    }
  }
```

# 演示
#### 为啥录制的只有这么几秒？而且清洗度好低。额，先放着吧。
<img src="https://github.com/idenet/myapp/blob/master/gif/myapp.gif" width="400" height="600" /> 








