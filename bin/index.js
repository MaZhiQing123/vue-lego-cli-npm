#!/usr/bin/env node

const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');
const { exec } = require('child_process');
const chalk = require('chalk')

const inquirerList = [{
    type: 'input',
    message: '项目名称:',
    name: 'project_name',
    default: "new_vue_Project" // 默认值
},{
    type: "confirm",
    message: "是否使用cnpm?",
    name: "npm_type"
},{
    type: "confirm",
    message: "是否使用router?",
    name: "router"
}]

async function answer(){
    let answerList = await inquirer.prompt(inquirerList)
    console.log(answerList)
    fs.mkdir(`${process.cwd()}/${answerList.project_name}`,(error) => {
        if(error){
            console.log(error)
            console.log(chalk.red('目录创建失败'))
        }
    })
    const dt = ora('开始下载项目模板...').start();
    download('github:MaZhiQing123/vue-lego', `${process.cwd()}/${answerList.project_name}/`, function (err) {
        if(err){
            console.log(err)
            dt.fail('模板下载失败')
            return
        }
        dt.succeed('模板下载完成');
        const dm = ora('开始下载依赖...').start();
        exec('cnpm i', (err, stdout, stderr) => {
            if(err) {
                console.log(err);
                dm.fail('依赖下载失败')
                return;
            }
            dm.succeed('依赖下载完成');

            console.log(chalk.green(`
                cd ${answerList.project_name}

                npm start

                npm run build
            `))
        })
    })
}

answer()
// const spinner = ora('开始下载项目模板...').start();
// // download('github:MaZhiQing123/vue-lego', process.cwd(), function (err) {
// //     console.log(err ? err : '')
//     setTimeout(() => {
//         spinner.color = 'yellow';
//         spinner.text = 'Loading rainbows';
//         spinner.succeed('下载完成');
//     }, 1000);


//   })
