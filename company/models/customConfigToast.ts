export enum ToastType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export enum ToastPosition {
  TopRight = 'toast-top-right',
  BottomRight = 'toast-bottom-right',
  BottomLeft = 'toast-bottom-left',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  BottomFullWidth = 'toast-bottom-full-width',
  TopCenter = 'toast-top-center',
  BottomCenter = 'toast-bottom-center',
}

export interface CustomConfigToast{
  type?: ToastType;
  positionClass?: ToastPosition;
  enableHtml?: boolean;
  tapToDismiss?: boolean;
  closeButton?: boolean;
  progressBar?: boolean;
  preventDuplicates?: boolean;
  timeout?: number;
}
