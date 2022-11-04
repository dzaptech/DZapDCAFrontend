import * as Sentry from '@sentry/react';

type Scope = { trxName?: string };

export const setScope = (scopeParams?: Scope) => {
  Sentry.withScope(scope => {
    scope.setTransactionName(scopeParams?.trxName);
  });
};

export const Logger = {
  info: (info: any, scope?: Scope) => {
    setScope(scope);
    Sentry.captureMessage(info);
    console.log(scope?.trxName, info);
  },
  error: (error: any, scope?: Scope) => {
    setScope(scope);
    Sentry.captureException(error);
    console.error(scope?.trxName, error);
  },
};
