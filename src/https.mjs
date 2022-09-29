import axios from "axios";
axios.interceptors.response.use((res) => {
    return res.data;
});
const templateUrl = "https://api.github.com/repos/lsshym/react-context";
const testeUrl = "https://api.github.com/orgs/zhurong-cli/repos";

/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
    return axios.get(templateUrl);
    // return axios.get(testeUrl);
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function getTagList(repo) {
    return axios.get(`https://api.github.com/repos/zhurong-cli/${repo}/tags`);
}

export { getRepoList, getTagList };
