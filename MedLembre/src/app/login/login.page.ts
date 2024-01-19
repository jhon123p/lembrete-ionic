import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  constructor(private router:Router) {}

  ngOnInit() {
  }
  login() {
    // Aqui, você pode adicionar a lógica de validação do usuário e senha.
    // Por exemplo, você pode verificar se o nome de usuário e a senha estão corretos.
    // Se a validação for bem-sucedida, redirecione o usuário para a página principal.
    if (this.username === 'usuario' && this.password === 'senha') {
      // Login bem-sucedido, redirecione para a página principal
      this.router.navigate(['/home']);
    } else {
      // Exiba uma mensagem de erro ou trate o login inválido de outra forma
      console.log('Login inválido. Verifique suas credenciais.');
    }
  }
}
