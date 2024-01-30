import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DadosService } from '../dados.service';


@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {

  item: any;
  constructor( private rotas:NavController , 
              private rota: ActivatedRoute , 
              private storage:Storage ,
              private service:DadosService) { }

  async ngOnInit() {
    this.rota.paramMap.subscribe(async params => {
      const id = params.get('id');
      
      // Recupere os itens do Storage
      const items = await this.storage.get('dadosFormulario');
  
      // Verifique se 'items' é nulo antes de chamar 'find'
      if (items !== null) {
        // Encontrar o item na lista com base no ID
        this.item = items.find((item: any) => item.id === id);
  
        // Se necessário, faça alguma lógica adicional com o item
        console.log(this.item);
      } else {
        this.service.mostrarAlerta("item nao encontrado na base",'')
      }
    });
  }

  
  /*async trocarFoto(event: any) {
    const file = event.target.files[0]; // Pega o arquivo de imagem selecionado
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Atribui a URL da imagem ao item para exibir no <img>
        this.item.fotoUrl = reader.result as string;
      };
      reader.readAsDataURL(file); // Lê o arquivo como URL de dados
    }
  }*/
  
  async trocarFoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Atualize o objeto item com a nova imagem
        this.item.imagem = reader.result as string;
      };
      reader.readAsDataURL(file);
  }
  
}

  
async atualizarItem() {
  console.log('Item atualizado:', this.item);

  // Salvar no armazenamento do Ionic
  const items = await this.storage.get('dadosFormulario');
  if (items) {
    // Encontre e atualize o item no array
    const index = items.findIndex((i: any) => i.id === this.item.id);
    if (index !== -1) {
      items[index] = this.item;
      await this.storage.set('dadosFormulario', items);
      console.log('Item atualizado no armazenamento.');
    } else {
      console.log('Item não encontrado no armazenamento.');
    }
  } else {
    console.log('Não há itens no armazenamento.');
  }
  
  // Redirecionar para a página anterior ou fazer outra ação após a atualização
  this.rotas.navigateForward("/home");
  
  
}

}
