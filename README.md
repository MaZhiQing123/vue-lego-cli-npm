# vue-lego-cli-npm

**一个可插拔式的vue项目脚手架**

**该脚手架依旧基于webpack来构建**

#### 开始

```bash
npm i vue-lego-cli-npm -g

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