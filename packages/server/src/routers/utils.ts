import type { NominationDoc } from '@acs/shared';

import { deleteFile } from '../utils/aws';

export const deleteNomination = async (nomination: NominationDoc) => {
  deleteFile(
    `${nomination.candidate.toString()}-${nomination.position}.mp4`,
    async (error) => {
      if (error) throw error;
      await nomination.remove();
    },
  );
};
