/// <reference types='codeceptjs' />
type steps_file = typeof import('./stepObjects/custom.steps');
type SOAP = import('../src/SoapHelper');
type ExpectHelper = import('codeceptjs-expect');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends SOAP, ExpectHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<Methods> {}
  namespace Translation {
    interface Actions {}
  }
}
