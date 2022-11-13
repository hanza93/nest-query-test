import { registerEnumType } from '@nestjs/graphql';

export enum LoanStatus {
  draft = 'draft',
  reviewInProgress = 'reviewInProgress',
  closedNotReviewed = 'closedNotReviewed',
  closed = 'closed',
  closedDead = 'closedDead',
  postClosePending = 'postClosePending',
  postCloseMonitoring = 'postCloseMonitoring',
  postCloseNotActive = 'postCloseNotActive',
}

registerEnumType(LoanStatus, {
  name: 'LoanStatus',
});
