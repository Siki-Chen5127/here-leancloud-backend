const AV = require('leancloud-storage');
const leanengine = require('leanengine');

const APP_ID = "0m5HgXwHNjbrLxC3DKOxgQom-gzGzoHsz"
const APP_KEY = "pglFnDkid00IbYEf03SFL2Oh"
const MASTER_KEY = "uunG01A8yKAjGTeWpufb8GHZ"

AV.express(); 

// 加载我们所有的云函数定义
require('./cloud');


const PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);
leanengine.listen(PORT, function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('LeanCloud Engine (V3.0 Stable) is running on port:', PORT);
});