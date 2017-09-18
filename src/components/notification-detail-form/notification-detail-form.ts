import { Component, Input } from '@angular/core';
import { NotificationModel } from '../notification-model';
@Component({
  selector: 'notification-detail-form',
  templateUrl: 'notification-detail-form.html'
})
export class NotificationDetailFormComponent {
  @Input() notification: NotificationModel = null;
  edit: boolean = null;
  constructor() {
    this.edit = false;
  }
  onClicked(toggle){
    if(this.edit==true){
    }
    this.edit = toggle;
  }
  onSubmit(formValue: any){
    console.log(formValue);
  }
}
