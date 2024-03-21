import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as dayjs from 'dayjs';
import { AlertController } from '@ionic/angular';
import { LocalNotifications , ScheduleOptions } from '@capacitor/local-notifications';
import { RefresherEventDetail } from '@ionic/core';



@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private storage: Storage,
              private alertController: AlertController,
            ) {
    
   }
  // Método para salvar dados
  salvarDados(dados: any[]) {
    return this.storage.set('dadosFormulario', dados);
  }
  // Método para recuperar dados
  recuperarDados() {
    return this.storage.get('dadosFormulario');
  }
  async setAlarm() {
    const Storage = await this.storage.get('dadosFormulario');

    console.log(Storage?.length)
    Storage?.map((item: any) => {
        setInterval(async () => {
            const isTime = dayjs().isSame(dayjs(item.data), 'minute')

            const storageTime = await this.storage.get('istime')
            const isSameStorageTime = dayjs().isSame(dayjs(storageTime), 'minute')

            if (isTime && (!storageTime || !isSameStorageTime)) {
                await this.storage.set('istime', new Date())

                const formattedDate = dayjs(item.data).format('DD-MM-YYYY [às] HH:mm:ss')
                this.mostrarAlerta(item.nome, item.Detalhe)
            }
        }, 1000)
    })
    
  }
  async scheduleLocalNotificationn(dateAlert:any , id:number) {

      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'title',
            body: 'body',
            id: id,
            schedule: { at: dateAlert }
          }
          
        ]
      }).then(() => {
        console.log('Notificação agendada com sucesso!');
      }).catch((error) => {
        console.error('Error ao agendar notificação', error)
      })
    } 

  async alertOffreload(header:string , message:string){
    const alert = await this.alertController.create({
      header: header ,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          
        }
      }]
    })
    await alert.present();
  }
  async mostrarAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: [{
        text: 'OK',
        handler: () => {
          window.location.reload();
        }
      }]
    });
  
    await alert.present();
  }
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
  async scheduleNotification(id: number, title: string, body: string, dateAlert: Date) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: title,
          body: body,
          id: id,
          schedule: { at: dateAlert }
        }
        
      ]
    }).then(() => {
      console.log('Notificação agendada com sucesso!');
    }).catch((error) => {
      console.error('Error ao agendar notificação', error)
    })
  }

  async cancelNotification(id: number) {
    await LocalNotifications.cancel({ notifications: [{ id: id }] });
  }
}
