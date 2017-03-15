# myapp-v2

> a app base on juhe data

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
#### 开发历程
----
在使用vue、vue-router、vuex写完两个组件以后，发现使用axios获取数据的代码很多，且多次使用同一个接口的代码。是以狠下决心花一天时间引入vuex管理状态。并且使用vue-cli自带的代理来开发，解决跨域问题

#### 开发中遇到的问题
-----
**在手机中border-1px显示过粗问题**  
[解决方法](http://efe.baidu.com/blog/1px-on-retina/),除了淘宝的解决方案没试用过，别的在圆角解决上都不怎么好
最终使用了IOS8+自带的```border-width:0.5```来解决了

**在同一无线网内的手机端的测试**  
在本地开发中注意请求后端接口的地址要写ip地址！

**点击事件绑定vshow，vshow中展示的列表即使添加到nextTick也无法滚动**  
经分析，vshow展示的数据应该并没有真正撑开dom文档，必须用computed进行刷新，并且放到nextTick才可以

**引入vuex以后,使用refs获取dom节点时会报错**  
只有将better-scroll的使用放在updated。从生命周期看，只有当vdom重新渲染才可以

#### 开发中未解决的问题 ✅  
**在加载书籍列表的时候，过度动画完成之后，数据渲染之前，左边的图片会莫名出现border和右边的背景会先渲染**  
现在使用的是，异步加载组件的方式，但是没有作用

#### v2版本  
在使用了vuex管理数据状态，并且异步获取数据后问题消失了！那么就此看来是因为是数据获取的问题了？但是axios不就是使用promise异步获取数据的吗？❓

**在使用watch和computed的疑惑**  
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
监控分类更新书籍

**infinite-scroll使用疑惑**  
按别人已经成功的例子来说我的并没有问题，并且观察vue-devtools的时候数据也是分段加载完成的。是不是因为使用了better-scroll的原因，自动加载剩下的数据？而且不使用better-scroll是无法下拉的！

**router-link使用，vuex-router-sync组件**  
我在booklist中使用点击进入bookdetail，但是更为优雅的使用方法应该是用router-link，用路由来控制，但是我在使用路由控制的时候，是吧book这个对象，全传进params，在使用$route获取的时候，每次关闭detail页，$route总的数据就直接置空了，而导致后退后总会控制台报错。
而我现在使用的方式是用vshow来控制，props传递对象数据。这种保证的，数据在组件内流通。但是我想着事不利于维护的。
而现在我可以通过vuex-router-sync来同步state和¥route的属性。这样就能简单的通过store.route.params获取。


### 功能
因为聚合免费的api很翔，只能提供这些简陋的功能了。






