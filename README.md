# logger

## TODO:

### Stream

* 输出到文件

### Encoder And Decoder

* 特定格式
* 纯粹二进制编码
* 自定义

### Serializer

* N条 1 文件
* x MB 1 文件

### 执行辅助文件

采用lua编写各平台版本的exe：

1. 文件可续传 - 边传边删
3. 格式可恢复成全量格式


## 如何处理库内的日志

库的日志相对来说
1. 注意隐藏复杂性
2. 允许disable

做法：

1. 每个App/项目，都会有一个Global代码文件，里面包含一个全局的Logger钩子
2. App的参数，应该全局常量的内容，应该再Global上面放置
3. Global内容可以export，意味着可以直接修改Global中关于Log的设置
4. 如果是库，采用index，如果是app，启动入口以app为前缀；Global的引用，应该放在index内部
5. 每个class都会有一个Logger
6. 如果懒得做，那么可以直接用Global的logger进行记录


