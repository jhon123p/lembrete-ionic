import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadosService } from '../dados.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private router:Router , private service:DadosService , private storage:Storage) {
   
  }

  ngOnInit() {
  }
  async login() {
    // Se a validação for bem-sucedida, redirecione o usuário para a página principal.
    if (this.username === 'usuario' && this.password === 'senha') {
      // Login bem-sucedido, redirecione para a página principal
      this.router.navigate(['/splash']);
    } else {
      // Exiba uma mensagem de erro ou trate o login inválido de outra forma
      // this.service.mostrarAlerta('falha nas credenciais por favor verifique novamente','');
      console.log('Credenciais inválidas');
    }



  }
  }

