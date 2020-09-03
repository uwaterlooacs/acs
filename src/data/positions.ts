import type { PositionDoc } from '../models/position';

const positions: Pick<PositionDoc, 'title' | 'description'>[] = [
  {
    title: 'President',
    description: 'Runs things',
  },
  {
    title: 'Vice President',
    description: 'Helps run things',
  },
  {
    title: 'Secretary',
    description: 'Takes minutes',
  },
  {
    title: 'Treasurer',
    description: 'Cooks books',
  },
  {
    title: 'Web Admin',
    description: 'Codes',
  },
  {
    title: 'Public Relations Officer',
    description: 'Manages public relations',
  },
  {
    title: 'Publications Officer',
    description: 'Manages publications',
  },
  {
    title: 'Social Coordinater',
    description: 'Coordinates social events',
  },
  {
    title: 'Education Officer',
    description: 'Coordinates education events',
  },
  {
    title: 'Sports Coordinator',
    description: 'Coordinates education events',
  },
  {
    title: 'First Year Coordinator',
    description: 'Coordinates first years',
  },
];

export default positions;
