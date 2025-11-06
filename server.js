const AV = require('@leancloud/storage');
const engine = require('@leancloud/engine');

const APP_ID = "0m5HgXwHNjbrLxC3DKOxgQom-gzGzoHsz"
const APP_KEY = "pglFnDkid00IbYEf03SFL2Oh"
const MASTER_KEY = "uunG01A8yKAjGTeWpufb8GHZ"
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  masterKey: MASTER_KEY
});
engine.init(AV);
require('./cloud');

// 端口设置
const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);
engine.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('LeanCloud Engine (V2.0) is running on port:', PORT);
});