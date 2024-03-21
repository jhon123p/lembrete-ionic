import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  
})
export class AppComponent {
  constructor(private storage: Storage , private rota:NavController) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.storage.create();
    // Outras inicializações do aplicativo
  }
  returnHome(){
    this.rota.navigateForward("/home")
    
  }
  navNewLembrete() {
    this.rota.navigateForward('/new-lembrete');
    
  }
}
