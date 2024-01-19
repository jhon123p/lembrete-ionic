import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private storage: Storage) { }

  // Método para salvar dados
  salvarDados(dados: any[]) {
    return this.storage.set('dadosFormulario', dados);
  }
 
  // Método para recuperar dados
  recuperarDados() {
    return this.storage.get('dadosFormulario');
  }
}
