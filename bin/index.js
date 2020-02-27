#!/usr/bin/env node

const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');
const { exec } = require('child_process');
const chalk = require('chalk')
const fs = require('fs')

const inquirerList = [{
    type: 'input',
    message: '项目名称:',
    name: 'project_name',
    default: "new_vue_Project" // 默认值
},{
    type: "confirm",
    message: "是否使用cnpm?",
    name: "npm_type"
}]

async function answer(){
    let answerList = await inquirer.prompt(inquirerList)
    fs.mkdir(`${process.cwd()}/${answerList.project_name}`,(error) => {
        if(error){
            console.log(error)
            console.log(chalk.red('目录创建失败'))
            return
        }
        const dt = ora('开始下载项目模板...').start();
        download('github:MaZhiQing123/vue-lego', `${process.cwd()}/${answerList.project_name}/`, function (err) {
            if(err){
                console.log(err)
                dt.fail('模板下载失败')
                return
            }
            dt.succeed('模板下载完成');

            const dm = ora('开始下载依赖...').start();
            exec(`cd ${answerList.project_name} && ${answerList.npm_type?'cnpm':'npm'} i`, (err, stdout, stderr) => {
                console.log(answerList.project_name)
                if(err){
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
    })

}

answer()
