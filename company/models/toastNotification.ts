import { CustomConfigToast } from './customConfigToast';
import { DefaultConfigToast } from './defaultConfigToast';

export interface ToastNotification
  extends CustomConfigToast,
    DefaultConfigToast {}
