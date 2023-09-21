import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastNotification } from '../../company/models/toastNotification';
import { CustomConfigToast, ToastPosition } from '../../company/models/customConfigToast';

@Injectable({
  providedIn: 'root',
})
export class CompanyNotificationService {
  constructor(private toastr: ToastrService) {
  }

  defaultConfig: CustomConfigToast = {
    positionClass: ToastPosition.BottomRight
  }

  public showSuccessMessage(defaulConfigToast: ToastNotification) {
    this.toastr.success(defaulConfigToast.body, defaulConfigToast.title, this.defaultConfig);
  }

  public showInfoMessage(defaulConfigToast: ToastNotification) {
    this.toastr.info(defaulConfigToast.body, defaulConfigToast.title, this.defaultConfig);
  }

  public showWarningMessage(defaulConfigToast: ToastNotification) {
    this.toastr.warning(defaulConfigToast.body, defaulConfigToast.title, this.defaultConfig);
  }

  public showErrorMessage(defaulConfigToast: ToastNotification) {
    this.toastr.error(defaulConfigToast.body, defaulConfigToast.title, this.defaultConfig);
  }

  public showToastNotification(toastNotification: ToastNotification) {
    const toastOptions: Partial<ToastNotification> = {
      ...toastNotification,
    };

    this.toastr.show(
      toastNotification.body,
      toastNotification.title,
      toastOptions,
    );
  }
}
