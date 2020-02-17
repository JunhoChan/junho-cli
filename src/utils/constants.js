const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.junho-template`;
// process.platform：列举node运行的操作系统的环境
// 只会显示内核相关的信息，如：linux2， darwin，而不是“Redhat ES3” ，“Windows 7”，“OSX 10.7”等。
const { name, version } = require('../../package.json');

module.exports = {
  name,
  version,
  downloadDirectory
};
