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
              
              
              async ngOnInit() {
                this.rota.paramMap.subscribe(async params => {
                  const id = params.get('id');
                  
                  // Recupere os itens do Storage
                  const items = await this.storage.get('dadosFormulario');
              
                  if (items !== null) {
                    // Encontre o item na lista com base no ID
                    this.item = items.find((item: any) => item.id === id);
              
                    if (this.item) {
                      // Cancelar notificação do item antigo
                      const ts = this.service.cancelNotification(this.item.idNotifictions);
                      console.log(ts);
              
                      // Se necessário, faça alguma lógica adicional com o item
                      console.log(this.item);
                    } else {
                      this.service.mostrarAlerta("Item não encontrado na base", '');
                    }
                  } else {
                    this.service.mostrarAlerta("Não há itens no armazenamento", '');
                  }
                });
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
              
                    // Agendar nova notificação
                    const newNotificationId = Math.floor(Math.random() * 4294) - 3648;
                    const newDate = new Date(this.item.data);
                    this.service.scheduleNotification(newNotificationId, this.item.nome, this.item.Detalhe, newDate);
                    console.log('Nova notificação agendada.');
              
                    this.rotas.navigateForward("/home");
                  } else {
                    console.log('Item não encontrado no armazenamento.');
                  }
                } else {
                  console.log('Não há itens no armazenamento.');
                }
              }
              

}
