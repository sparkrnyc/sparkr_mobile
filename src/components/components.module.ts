import { NgModule } from '@angular/core';
import { ProfileDetailFormComponent } from './profile-detail-form/profile-detail-form';
import { HeaderMenuPageComponent } from './header-menu-page/header-menu-page';
import { HeaderPageComponent } from './header-page/header-page';
@NgModule({
	declarations: [ProfileDetailFormComponent,
    HeaderMenuPageComponent,
    HeaderPageComponent],
	imports: [],
	exports: [ProfileDetailFormComponent,
    HeaderMenuPageComponent,
    HeaderPageComponent]
})
export class ComponentsModule {}
