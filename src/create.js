// const axios = require('axios');
const inquirer = require('inquirer');
const { fnLoadingByOra, fetchReopLists, getTagLists, downDir, copyTempToLoclhost } = require('./utils/common');
// // 1).获取仓库列表
// const fetchReopLists = async () => {
//   // 获取当前组织中的所有仓库信息,这个仓库中存放的都是项目模板
//   const { data } = await axios.get('https://api.github.com/orgs/junho-cli/repos');  return data
// };

module.exports = async (projectName) => {
  let repos = await fnLoadingByOra(fetchReopLists, '正在链接你的仓库...')();
  repos = repos.map((item) => item.name);
  // let repos = await fetchReopLists();
  // repos = repos.map((item) => item.name);
  // console.log(repos);
  // console.log(`此处是文件${projectName}`);

  const { repo } = await inquirer.prompt([
    {
        type: 'list',
        name:'repo',
        message:'请选择一个你要创建的项目',
        choices: repos
    }
  ]);
  console.log(repo);
  let tags = await fnLoadingByOra(getTagLists, `正在链接你的选择的仓库${repo}的版本号...`)(repo);
  tags = tags.map((item) => item.name);
  const { tag } = await inquirer.prompt([{
    type: 'list',
    name: 'tag',
    message: '请选择一个该项目的版本下载',
    choices: tags
}]);
  // console.log(`我现在选择了那个仓库？ ${repo}`);
  // console.log(`仓库 ${repo}的版本信息列表：${tag}`);
  const target = await fnLoadingByOra(downDir, '下载项目中...')(repo, tag);
  console.log('当前下载了:' + target);
  await copyTempToLoclhost(target, projectName);
};
