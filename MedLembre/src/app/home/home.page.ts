import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DadosService } from '../dados.service';
import { Storage } from '@ionic/storage-angular';
import { RefresherEventDetail } from '@ionic/core';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dadosSalvos: any[] = [];
  dadosExibicao: any[] =[];
  loadedItems: number = 2; // Inicialmente carrega 2 itens
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
     private platform: Platform) { 
      //inicializador do som do alarme
     }
    reproduzirAudio() {
      const audio = new Audio();
      audio.src = this.platform.is('android')
        ? '/android_asset/www/assets/alarme.mp3'
        : 'assets/alarme.mp3';
  
      audio.load();
      audio.play();
    }


   async updateObjeto(id:number){
     this.rota.navigateForward(`/update-item/${id}`)
     }
     
  async apagar(item: any) {
    const storedItems = await this.storage.get('dadosFormulario');
    const index = storedItems.findIndex((element: any) => element.id === item.id);
  
    if (index !== -1) {
      // Remove o item da lista exibida
      this.dadosExibicao.splice(index, 1);
  
      // Atualiza o armazenamento removendo o item correspondente
      await this.removerItemLocalStorage(item.id);
      console.log('Item removido da lista e do Local Storage:', item.id);
      window.location.reload()
    }
  }
  async removerItemLocalStorage(itemId: any) {
    let storedItems = await this.storage.get('dadosFormulario');
  
    if (storedItems) {
      // Filtra os itens, removendo aquele com o ID correspondente
      storedItems = storedItems.filter((element: any) => element.id !== itemId);
      
      // Atualiza os dados no armazenamento
      await this.storage.set('dadosFormulario', storedItems);
    }
  }
  ngOnInit() {
    this.dadosService.recuperarDados().then((dados) => {
      this.dadosSalvos = dados || [];
      this.dadosExibicao = this.dadosSalvos.slice(0, 2); // Configure this.dadosExibicao após a recuperação de dados
    });
    this.dadosService.setAlarm();
  }
  
  carregarMaisItens() {
    this.loadedItems += 2; // Aumenta o número de itens em 2
    this.dadosExibicao = this.dadosSalvos.slice(0, this.loadedItems); // Atualiza a exibição com mais itens
  }

}
