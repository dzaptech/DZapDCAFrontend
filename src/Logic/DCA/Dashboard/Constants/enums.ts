export enum ActionType {
  terminate = 1,
  modify = 2,
}

export enum PositionActions {
  active = 'ACTIVE',
  terminated = 'TERMINATED',
  completed = 'COMPLETED',
  swapped = 'SWAPPED',
  modifyRate = 'MODIFIED_RATE',
  modifyDuration = 'MODIFIED_DURATION',
  modifyRateDuration = 'MODIFIED_RATE_AND_DURATION',
  withdraw = 'WITHDREW',
}
