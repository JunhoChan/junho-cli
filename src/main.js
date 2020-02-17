const program = require('commander');
const path = require('path');
const { version } = require('./utils/constants');
const { mapActions } = require('./utils/common');

// 数组的第一个元素process.argv[0]——返回启动Node.js进程的可执行文件所在的绝对路径 
// 第二个元素process.argv[1]——为当前执行的JavaScript文件路径 
// 剩余的元素为其他命令行参数

// Object.keys()
Reflect.ownKeys(mapActions).forEach((action)=>{
    program.command(action) //配置命令的名字
        .alias(mapActions[action].alias) // 命令的别名
        .description(mapActions[action].description) // 命令对应的描述
        .action(() => {  //动作
          console.log(action);
            if(action === '*'){  //访问不到对应的命令 就打印找不到命令
                console.log(mapActions[action].description); 
           }else{
                console.log(action);
                // 分解命令 到文件里 有多少文件 就有多少配置 create config
                 // lee-cli create project-name ->[node,lee-cli,create,project-name]
                console.log(process.argv);
                require(path.join(__dirname,action))(...process.argv.slice(3));
            }
        })});

// 监听用户的help事件
program.on('--help', () => {
  console.log('\nExamples:');
  Reflect.ownKeys(mapActions).forEach((action) => {
      mapActions[action].examples.forEach((example) => {
          console.log(` ${example}`);
      })
  })
})

program.version(version)
  .parse(process.argv); // process.argv就是用户在命令行中传入的参数