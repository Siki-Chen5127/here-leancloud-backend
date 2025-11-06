const AV = require('leanengine');

AV.Cloud.define('updateActivity', async (request) => {
  if (!request.currentUser) {
    throw new AV.Cloud.Error('用户未登录', { code: 401 });
  }

  const { location, activityType } = request.params;
  const user = request.currentUser;

  user.set('lastActiveAt', new Date());
  user.set('status', 'active');

  if (location && activityType) {
    const ActivityLog = AV.Object.extend('ActivityLog');
    const log = new ActivityLog();
    log.set('user', user);
    log.set('location', new AV.GeoPoint(location.latitude, location.longitude));
    log.set('activityType', activityType);
    await AV.Object.saveAll([user, log]);
  } else {
    await user.save();
  }

  return { status: 'success', message: '活跃状态已更新' };
});
