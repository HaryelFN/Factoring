import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { GlobalService } from './../providers/global/global.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../providers/user.service';
import { User } from './../models/user.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any, image: string }>;
  isAuthenticated: boolean = false;
  typeUser: string;

  user: User;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private afAuth: AngularFireAuth,
    private global: GlobalService,
    private userService: UserService) {

    platform.ready().then(() => {
      this.init();

      afAuth.authState.subscribe(user => {
        if (user) {

          this.global.setCurrentUser(user);
          this.isAuthenticated = true;

          this.userService.getUserByUid(user.uid).subscribe(s => {
            this.menu(this.isAuthenticated, s.tipo);
            this.global.setTypeUser(s.tipo);

            this.global.getTypeUser().then((tipo => {
              if (tipo == 'pro') {
                this.openPage('DashBordPage');
              } else {
                this.openPage('CalcPage');
              }
            }));

          }, error => {
            this.global.setCurrentUser('');
            this.isAuthenticated = false;
            this.menu(this.isAuthenticated, '');
            this.openPage('HomePage');
          });

          //findUser.unsubscribe();

        } else {
          this.global.setCurrentUser('');
          this.isAuthenticated = false;
          this.menu(this.isAuthenticated, '');
          this.openPage('HomePage');
        }
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  init() {
    this.global.getCurrentUser().then((user) => {
      if (user != '') {
        this.global.getTypeUser().then((tipo => {
          if (tipo == 'pro') {
            this.openPage('DashBordPage');
          } else {
            this.openPage('CalcPage');
          }
        }));
      } else {
        this.openPage('HomePage');
      }
    });
  }

  menu(isAuthenticated, tipoUsuario) {
    if (isAuthenticated && tipoUsuario == "pro") {
      this.pages = [
        { title: 'DashBord', component: 'DashBordPage', image: './assets/icon/menu/chart.png' },
        { title: 'Calculadora', component: 'CalcPage', image: './assets/icon/menu/calc.png' },
        { title: 'Clientes', component: 'ClientsPage', image: './assets/icon/menu/clients.png' },
        { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
      ];
    } else if (isAuthenticated && tipoUsuario == "free") {
      this.pages = [
        { title: 'Calculadora', component: 'CalcPage', image: './assets/icon/menu/calc.png' },
        { title: 'Clientes', component: 'ClientsPage', image: './assets/icon/menu/clients.png' },
        { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
      ];
    } else {
      this.pages = [
        { title: 'Início', component: 'HomePage', image: './assets/icon/menu/inicio.png' },
        { title: 'Sobre', component: 'SobrePage', image: './assets/icon/menu/sobre.png' }
      ];
    }
  }

  openPage(page) {
    let view = this.nav.getActive();
    if (view == undefined) {
      this.nav.setRoot(page);
    } else {
      if (view.component.name === page) { // Previnir que ela tente acessar a mesma view
        return;
      } else {
        this.nav.setRoot(page);
      }
    }
  }

  openPageMenu(page) {
    let view = this.nav.getActive();
    if (view.component.name != page.component) { // Previnir que ela tente acessar a mesma view
      this.nav.setRoot(page.component);
    }
  }

  deslogar() {
    this.afAuth.auth.signOut().then(() => {
      this.global.setTypeUser('');
    });
  }
}
