#!/usr/bin/env node

const download = require('download-git-repo');
const ora = require('ora');
const inquirer = require('inquirer');
const { exec } = require('child_process');
const chalk = require('chalk')

const inquirerList = [{
    type: "confirm",
    message: "更新项目模板?",
    name: "project_tmp"
},{
    type: "confirm",
    message: "是否使用cnpm更新依赖?",
    name: "npm_type"
}]

async function answer(){
    let answerList = await inquirer.prompt(inquirerList)
    if(!answerList.project_tmp){
        return
    }
    const dt = ora('开始更新项目模板...').start();
    download('github:MaZhiQing123/vue-lego', `${process.cwd()}/`, function (err) {
        if(err){
            console.log(err)
            dt.fail('模板下载失败')
            return
        }
        dt.succeed('模板下载完成');

        const dm = ora('开始更新依赖...').start();
        exec(`${answerList.npm_type?'cnpm':'npm'} i`, (err, stdout, stderr) => {
            console.log(answerList.project_name)
            if(err){
                console.log(err);
                dm.fail('依赖下载失败')
                return;
            }
            dm.succeed('依赖下载完成');

            console.log(chalk.green(`
        更新完成
            `))
        })

    })

}

answer()

