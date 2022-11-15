import { gql } from '@apollo/client';

export const GetAllPositions = gql`
  query GetAllPositions($id: String) {
    position(where: { id: $id }) {
      id
      user
      from
      to
      swapInterval
      status
      rate
      remainingSwaps
      toWithdraw
      totalDeposited
      totalSwapped
      totalWithdrawn
      totalSwaps
      totalExecutedSwaps
      history
    }
  }
`;

export const GetAllTokens = gql`
  query GetAllTokens {
    tokens {
      id
      name
      symbol
      decimals
    }
  }
`;
export const GetAllProjectPools = gql`
  query GetAllProjects {
    projects {
      id
      projectId
      stakeToken
      rewardNftToken
      totalFundsStaked
      maxBatchSize
      rewardPerSec
      rewardNftIds
      totalAvailableRewards
      startTime
      timestamp
      type
      unbondingPeriod
      endTime
    }
  }
`;
