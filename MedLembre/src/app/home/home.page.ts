import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DadosService } from '../dados.service';
import { Storage } from '@ionic/storage-angular';
import { RefresherEventDetail } from '@ionic/core';
import { Platform } from '@ionic/angular';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dadosSalvos: any[] = [];
  dadosExibicao: any[] =[];
  loadedItems: number = 50; // Inicialmente carrega 2 itens
  item:any;


  async atualizarConteudo(event: CustomEvent<RefresherEventDetail>) {
    console.log('Atualizando conteúdo...');

    // Coloque aqui a lógica para atualizar os dados, por exemplo:
    await this.carregarDados();

    // Complete o evento de atualização quando terminar de atualizar os dados
    event.detail.complete();
  }

  async carregarDados() {
    window.location.reload();
    
  }


  constructor(
    private dadosService: DadosService ,
     private rota:NavController , 
     private storage:Storage,
     private platform: Platform,
     private alerControl:AlertController) { 
     }


   async updateObjeto(id:number){
     this.rota.navigateForward(`/update-item/${id}`)
     }
     
     async apagar(item: any) {
      const alert = await this.alerControl.create({
        header: 'Confirmação',
        message: 'Tem certeza que deseja apagar este item?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Ação cancelada');
            }
          }, {
            text: 'Apagar',
            handler: async () => {
              console.log('Item a ser apagado:', item);
              await this.removerItem(item.id);
              console.log('Item apagado com sucesso');
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    async removerItem(itemId: any) {
      let storedItems = await this.storage.get('dadosFormulario');
  
      if (storedItems) {
        // Filtra os itens, removendo aquele com o ID correspondente
        storedItems = storedItems.filter((element: any) => element.id !== itemId);
  
        // Atualiza os dados no armazenamento
        await this.storage.set('dadosFormulario', storedItems);
      }
  
      // Atualiza a lista exibida após a remoção do item
      this.dadosExibicao = storedItems;
    }
  ngOnInit() {
    this.dadosService.recuperarDados().then((dados) => {
      this.dadosSalvos = dados || [];
      this.dadosExibicao = this.dadosSalvos.slice(0, 50); // Configure this.dadosExibicao após a recuperação de dados
    });
    this.dadosService.setAlarm();

  }
  
  carregarMaisItens() {
    this.loadedItems += 2; // Aumenta o número de itens em 2
    this.dadosExibicao = this.dadosSalvos.slice(0, this.loadedItems); // Atualiza a exibição com mais itens
  }


}
