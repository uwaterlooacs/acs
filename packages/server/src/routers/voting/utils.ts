import type { ObjectId } from 'mongodb';
import type { NominationDoc } from '@acs/shared';

import NominationModel from '../../models/Nomination/Nomination';
import PositionModel from '../../models/Position';
import { deleteNomination } from '../utils';

/**
 * Takes an array of nominations and returns a record with position id as keys
 * and the nominations for that position as the value
 * @param nominations NominationDoc[]
 */
export const getNominationsByPosition = (nominations: NominationDoc[]) => {
  const nominationsByPosition = nominations.reduce<
    Record<string, NominationDoc[]>
  >((partialNomsByPos, nomination) => {
    const positionId = String(nomination.position);
    if (!partialNomsByPos[positionId]) {
      partialNomsByPos[positionId] = [nomination];
    } else {
      partialNomsByPos[positionId].push(nomination);
    }
    return partialNomsByPos;
  }, {});
  return nominationsByPosition;
};

/**
 * Takes an array of nominations for the same position and returns the nomination
 * with the most votes
 * @param nominations NominationDoc[]
 */
const getWinner = (
  nominations: NominationDoc[],
): ObjectId | string | undefined => {
  let maxVotes = 0;
  let winner;
  nominations.forEach((nomination) => {
    if (nomination.votes.length > maxVotes) {
      maxVotes = nomination.votes.length;
      winner = nomination.candidate;
    }
  });
  return winner;
};

/**
 * Checks all nominations for the winning nominee of each position and updates
 * the position document with the new occupant (winner)
 */
export const finalizeResults = async () => {
  const nominations = await NominationModel.find({});
  const nominationsByPosition = getNominationsByPosition(nominations);

  await Promise.all(
    Object.keys(nominationsByPosition).map(async (positionId) => {
      const winner = getWinner(nominationsByPosition[positionId]);
      await PositionModel.findByIdAndUpdate(positionId, {
        isOpen: false,
        occupant: winner,
      });
    }),
  );

  await Promise.all(
    nominations.map(async (nomination) => {
      await deleteNomination(nomination);
    }),
  );
};
