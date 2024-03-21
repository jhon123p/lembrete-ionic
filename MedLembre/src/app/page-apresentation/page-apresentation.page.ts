import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-page-apresentation',
  templateUrl: './page-apresentation.page.html',
  styleUrls: ['./page-apresentation.page.scss'],
})
export class PageApresentationPage implements OnInit {

  constructor(private rota: Router) { }

  ngOnInit() {
     this.userPermissions();
  }
async userPermissions(){
  const userPermissions = await LocalNotifications.requestPermissions();
    if(userPermissions){
      console.log('permissão conecedida')
    }else {
      console.log('oermissao negada')
    }
}

  navCad(){
    this.rota.navigateByUrl('new-lembrete');
  }
  NavHom(){
    this.rota.navigateByUrl('home')
  }
}
