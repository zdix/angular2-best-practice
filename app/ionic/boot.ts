import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, Platform} from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TabsPage } from './page/tabs/tabs';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

@NgModule({
    imports: [
    ],
    declarations: [
        TabsPage,
    ],
    providers: [
    ],
    bootstrap: [ IonicApp ]
})
class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
