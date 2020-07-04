import cron from 'node-cron';
import User from '../models/user';
import { MEMBERSHIP_STATUS } from '../types/user';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import GoogleCreds from '../config/acs-web-5aaaf-768e669e2d39.json';

const getTerm = () => {
  const date = new Date();
  const month = date.getMonth();
  if (month === 0) {
    return 'Fall' + (date.getFullYear() - 1);
  } else if (month === 4) {
    return 'Winter' + date.getFullYear();
  } else if (month === 8) {
    return 'Spring' + date.getFullYear();
  }
};

const doc = new GoogleSpreadsheet(
  '1Kn3Fc1vmi2dd9I645BxBQZMXXNvIJi1zEGnBiHuHDtk',
);

cron.schedule('0 0 1 JAN,MAY,SEP *', async function () {
  try {
    await doc.useServiceAccountAuth(GoogleCreds);
    await doc.loadInfo();
    const newSheet = await doc.addSheet({
      title: getTerm(),
    });
    const members = await User.find({
      $or: [
        { membershipStatus: MEMBERSHIP_STATUS.PAID },
        { membershipStatus: MEMBERSHIP_STATUS.UNPAID },
      ],
    });
    members.forEach(async (member) => {
      const { name, email, watIAMUserId, membershipStatus } = member;
      const newRow = { name, email, watIAMUserId, membershipStatus };
      await newSheet.addRow(newRow);
      member.membershipStatus = MEMBERSHIP_STATUS.EXPIRED;
      await member.save();
    });
  } catch (error) {
    console.log('CRON Job Reset Membership failed', error);
  }
});
