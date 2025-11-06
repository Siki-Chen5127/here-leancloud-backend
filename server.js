const express = require('express');
const AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || "0m5HgXwHNjbrLxC3DKOxgQom-gzGzoHsz",
  appKey: process.env.LEANCLOUD_APP_KEY || "pglFnDkid00IbYEf03SFL2Oh",
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || "uunG01A8yKAjGTeWpufb8GHZ"
});

const app = express();
app.use(AV.express());

require('./cloud');

app.get('/', (req, res) => {
  res.send('LeanCloud Engine (v3.8) running successfully!');
});

const PORT = process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LeanCloud Engine is running on port ${PORT}`);
});
