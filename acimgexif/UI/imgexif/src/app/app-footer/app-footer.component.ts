import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent {

  version = '1.0';

  constructor() { }
}

@NgModule({
  exports: [AppFooterComponent],
  declarations: [AppFooterComponent],
})
export class FooterModule {}
