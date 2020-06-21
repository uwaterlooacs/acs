import cron from 'node-cron';
import User from '../models/user';
import { MEMBERSHIP_STATUS } from '../types/user';

cron.schedule('0 0 1 JAN,MAY,SEP *', async function () {
  const members = await User.find({
    $or: [
      { membershipStatus: MEMBERSHIP_STATUS.PAID },
      { membershipStatus: MEMBERSHIP_STATUS.UNPAID },
    ],
  });
  members.forEach(async (member) => {
    Object.assign(member, { membershipStatus: MEMBERSHIP_STATUS.EXPIRED });
    await member.save();
  });
});
