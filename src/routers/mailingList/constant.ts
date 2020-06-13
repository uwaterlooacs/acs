export const EVENT_NAMES = [
  'Games Night',
  'Movie Night',
  'Online Party',
  'Scavenger Hunt',
  'Talent Show',
  'Study Buddies',
  'Lewwe Talk',
  'Trivia Night',
  'Workout Sessions',
  'Dance Sessions',
];

// Object with event names as keys and all values set to false
export const DEFAULT_EVENT_RESPONSES = EVENT_NAMES.reduce<
  Record<string, boolean>
>((partial, eventName) => {
  partial[eventName] = false;
  return partial;
}, {});
