import { NgModule } from '@angular/core';
import { MemberDetailFormComponent } from './member-detail-form/member-detail-form';
import { HeaderMenuPageComponent } from './header-menu-page/header-menu-page';
import { HeaderPageComponent } from './header-page/header-page';

@NgModule({
	declarations: [
        MemberDetailFormComponent,
        HeaderMenuPageComponent,
        HeaderPageComponent
    ],
	imports: [],
	exports: [
        MemberDetailFormComponent,
        HeaderMenuPageComponent,
        HeaderPageComponent
    ]
})
export class ComponentsModule {}
