# vue-lego-cli

**一个可插拔式的vue项目脚手架**

**该脚手架依旧基于webpack来构建**

#### 开始

```bash
npm i vue-lego-cli -g

vue-lego-cli

npm run add child1 child2 ...
``` 


#### 目录结构
```bash
    |-- dist
    |-- src
    |   |-- main.js   // 入口文件
    |   |-- components   // 所有组件
    |       |-- child   // 所有的业务模块
    |       |   |-- exampleA   // 例子：模块A
    |       |   |   |-- index.js   // 注意！必要文件，模块A通过此文件暴露
    |       |   |   |-- common   // 业务模块下的目录结构其实都可以自定义，只需要在index.js中暴露即可
    |       |   |   |-- view
    |       |   |   |   |-- a1.vue,
    |       |   |   |   |-- a2.vue,
    |       |-- root   // 根
    |           |-- App.vue
    |           |-- main.vue,
    |           |-- mount.js   // 挂载各个模块
    |           |-- relation.js   // 模块之间的关联关系
    |           |-- router
    |               |-- index.js   // router实例，可以预设一些404，login等等，主要路由是通过mount.js来挂载
    |-- webpack  // webpack配置

```

##### relation.js
目前还没做多层路由解析，所以现在只支持一级路由
relation.js必须配置，模块的关联关系都是通过该文件来获取的
```
export default [
    {
        "path":"/a1",   // 要访问的路径
        "name":"a1",
        "parent":"home"    // 该路径组件所在哪个模块下
    }
]
```
##### mount.js
使用loadjs来进行动态挂载，在路由守卫中会判定`to.path`是否挂载过组件，如果没有将会进行挂载



目前整体还比较简陋，预设也比较简单，webpack还有很多地方需要手动配置，不过该项目会持续更新。