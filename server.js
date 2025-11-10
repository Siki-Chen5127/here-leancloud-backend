const express = require('express');
const AV = require('leanengine');

AV.init({
  appId: "0m5HgXwHNjbrLxC3DKOxgQom-gzGzoHsz",
  appKey: "pglFnDkid00IbYEf03SFL2Oh",
  masterKey:"uunG01A8yKAjGTeWpufb8GHZ"
});

AV.Cloud.define("sendVerificationCode", async (request) => {
  const phone = request.params.phone;
  if (!phone) {
    throw new AV.Cloud.Error("必须提供手机号码。", { code: 400 });
  }

  try {
    await AV.Cloud.requestSmsCode(phone, { useMasterKey: true });
    return { success: true, message: `验证码已发送到 ${phone}` };
  } catch (e) {
    console.error("在云函数 'sendVerificationCode' 中调用 requestSmsCode 失败:", e);
    throw new AV.Cloud.Error(e.message, { code: e.code || 500 });
  }
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
