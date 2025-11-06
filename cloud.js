const AV = require('@leancloud/storage');
const engine = require('@leancloud/engine'); // 以前叫 leanengine

engine.define('updateActivity', async (request) => {
  // 1. 检查用户是否登录
  if (!request.currentUser) {
    throw new engine.Cloud.Error('用户未登录', { code: 401 });
  }

  // 2. 从 App 获取参数
  const { location, activityType } = request.params;
  const user = request.currentUser;

  // 3.更新用户的“最后活跃时间”和“状态”
  user.set('lastActiveAt', new Date());
  user.set('status', 'active');

  // 4. (可选) 如果 App 上报了位置，才创建日志
  if (location && activityType) {
    const ActivityLog = AV.Object.extend('ActivityLog');
    const log = new ActivityLog();
    log.set('user', user); // 设置 Pointer 关联
    log.set('location', new AV.GeoPoint(location.latitude, location.longitude));
    log.set('activityType', activityType);

    // 两个操作一起保存 (原子操作)
    await AV.Object.saveAll([user, log]);
  } else {
    // 如果 App 只是“打卡”，没有传位置，就只保存 user
    await user.save();
  }

  return { status: 'success', message: '活跃状态已更新' };
});