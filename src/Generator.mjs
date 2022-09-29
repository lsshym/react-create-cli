// lib/Generator.js
import { getRepoList } from "./https.mjs";
import inquirer from "inquirer";
import ora from "ora";

async function wrapLoading(fn, message, ...args) {
    // 使用 ora 初始化，传入提示信息 message
    const spinner = ora(message);
    // 开始加载动画
    spinner.start();

    try {
        // 执行传入方法 fn
        const result = await fn(...args);
        // 状态为修改为成功
        spinner.succeed();
        return result;
    } catch (error) {
        // 状态为修改为失败
        spinner.fail("Request failed, refetch ...");
    }
}

class Generator {
    constructor(name, targetDir) {
        // 目录名称
        this.name = name;
        // 创建位置
        this.targetDir = targetDir;
    }

    // 核心创建逻辑
    async create() {
        // 1）获取模板名称
        const repo = await this.getRepo();

        console.log("用户选择了，repo=" + repo);
    }
    async getRepo() {
        // 1）从远程拉取模板数据
        const repoList = await wrapLoading(
            getRepoList,
            "waiting fetch template"
        );
        if (!repoList) return;

        // 过滤我们需要的模板名称
        const repos = repoList.map((item) => item.name);

        // 2）用户选择自己新下载的模板名称
        const { repo } = await inquirer.prompt({
            name: "repo",
            type: "list",
            choices: repos,
            message: "Please choose a template to create project",
        });

        // 3）return 用户选择的名称
        return repo;
    }
}

export default Generator;
