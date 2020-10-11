import type { ServiceAccountCredentials } from 'google-spreadsheet';

import cron from 'node-cron';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { MEMBERSHIP_STATUS } from '@acs/shared';
import UserModel from '../models/user';

let GoogleCreds: ServiceAccountCredentials = {
  client_email: '',
  private_key: '',
};

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  GoogleCreds = require('../config/acs-web-5aaaf-768e669e2d39.json');
}

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
    const members = await UserModel.find({
      $or: [
        { membershipStatus: MEMBERSHIP_STATUS.PAID },
        { membershipStatus: MEMBERSHIP_STATUS.UNPAID },
      ],
    });
    members.forEach(async (member) => {
      const {
        firstName,
        lastName,
        email,
        watIAMUserId,
        studentNumber,
        semester,
        faculty,
        membershipStatus,
      } = member;
      const newRow = {
        firstName,
        lastName,
        email,
        watIAMUserId,
        studentNumber,
        semester,
        faculty,
        membershipStatus,
      };
      await newSheet.addRow(newRow);
      member.membershipStatus = MEMBERSHIP_STATUS.EXPIRED;
      await member.save();
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('CRON Job Reset Membership failed', error);
  }
});
