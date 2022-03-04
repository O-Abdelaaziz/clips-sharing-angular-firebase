import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import {NotificationType} from "../../enums/notification-type.enum";

@Injectable({
  providedIn: 'root'
})
export class AngularNotifierService {

  public constructor(private _notifier: NotifierService) {
  }

  public showNotification(type: NotificationType, message: string): void {
    this._notifier.notify(type, message);
  }

  public hideAllNotifications(): void {
    this._notifier.hideAll();
  }

  public showSpecificNotification(
    type: NotificationType,
    message: string,
    id: string
  ): void {
    this._notifier.show({
      id,
      message,
      type,
    });
  }

  public hideSpecificNotification(id: string): void {
    this._notifier.hide(id);
  }
}
