import axios from "axios";
axios.interceptors.response.use((res) => {
    console.log("res 这是啥", res);
    return res.data;
});
const templateUrl = "https://api.github.com/repos/lsshym/react-context";

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
    return axios.get(templateUrl);
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagList(repo) {
    return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}

module.exports = {
    getRepoList,
    getTagList,
};

