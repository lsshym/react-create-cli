#! /usr/bin/env node

// #! 符号的名称叫 Shebang，用于指定脚本的解释程序
// Node CLI 应用入口文件必须要有这样的文件头
// 如果是Linux 或者 macOS 系统下还需要修改此文件的读写权限为 755
// 具体就是通过 chmod 755 cli.js 实现修改
import ora from "ora";
import { Command } from "commander";

import chalk from "chalk";
import figlet from "figlet";
import { __dirname, packageFile } from "../src/utils.mjs";
import { createFcSync } from "../src/create.mjs";
import { test } from "../src/test.mjs";

const program = new Command();
program
    .command("create <app-name>")
    .description("create a new project")
    .option("-f, --force", "强制覆盖")
    .action((name, options) => {
        // 打印命令行输入的值
        createFcSync(name, options);
    });
program
    // 配置版本号信息
    .version(`version ${packageFile.version}`)
    .usage("<command> [option]");

program.option("-t, --test", "测试命令").action((name, option) => {
    console.log("test", name, option);
    test();
});
program
    // 监听 --help 执行
    .on("--help", () => {
        console.log(
            "\r\n" +
                figlet.textSync("R C C", {
                    horizontalLayout: "default",
                    verticalLayout: "default",
                    width: 80,
                    whitespaceBreak: true,
                })
        );
        // 新增说明信息
        console.log(
            `\r\nRun ${chalk.cyan(
                `zr <command> --help`
            )} for detailed usage of given command\r\n`
        );
    });
program.parse(process.argv);

// 自定义文本信息
// const message = 'Loading unicorns'
// // 初始化
// const spinner = ora(message);
// // 开始加载动画
// spinner.start();

// setTimeout(() => {
//     // 修改动画样式

//     // Type: string
//     // Default: 'cyan'
//     // Values: 'black' | 'red' | 'green' | 'yellow' | 'blue' | 'magenta' | 'cyan' | 'white' | 'gray'
//     spinner.color = 'red';
//     spinner.text = 'Loading rainbows';

//     setTimeout(() => {
//         // 加载状态修改
//         spinner.stop() // 停止
//         spinner.succeed('Loading succeed'); // 成功 ✔
//         // spinner.fail(text?);  失败 ✖
//         // spinner.warn(text?);  提示 ⚠
//         // spinner.info(text?);  信息 ℹ
//     }, 2000);
// }, 2000);
