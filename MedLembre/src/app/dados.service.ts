import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as dayjs from 'dayjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  constructor(private storage: Storage,
              private alertController: AlertController,) {
    
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
  async mostrarAlerta(titulo: string, mensagem: string ) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
