const AV = require('leancloud-storage');
const leanengine = require('leanengine');

const APP_ID = "0m5HgXwHNjbrLxC3DKOxgQom-gzGzoHsz"
const APP_KEY = "pglFnDkid00IbYEf03SFL2Oh"
const MASTER_KEY = "uunG01A8yKAjGTeWpufb8GHZ"
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  masterKey: MASTER_KEY
});

require('./cloud');

// 端口设置
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

// 启动服务
leanengine.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('LeanCloud Engine is running on port:', PORT);
});