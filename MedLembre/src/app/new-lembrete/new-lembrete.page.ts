import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { DadosService } from '../dados.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-new-lembrete',
  templateUrl: './new-lembrete.page.html',
  styleUrls: ['./new-lembrete.page.scss'],
})
export class NewLembretePage implements OnInit {

  meuForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null;  
  horaSelecionada: string = '';
  alarmTime: string ='';

  constructor(
    private rota:NavController ,
    private storage:Storage,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private dadosService: DadosService,
     ) { 

      this.meuForm = this.formBuilder.group({
        nome: ['',Validators.required],
        Detalhe: ['',Validators.required],
        Horario:['',Validators.required],
        data:[''],
      });
  }
  
  
  submitForm() {
    const data = this.storage.get('dadosFormulario')

    if (this.meuForm.valid) {
      const dadosFormulario = this.meuForm.value;
      const uniqueId = Date.now().toString();

      this.dadosService.recuperarDados().then((existingData) => {
        let dataToSave: any[] = existingData || [];
  
        // Adicione os novos dados ao array
        dadosFormulario.id = uniqueId;

        dataToSave.push(dadosFormulario);
        console.log(dadosFormulario)
  
        this.dadosService.salvarDados(dataToSave).then(() => {
          console.log('Dados do formulário salvos no Local Storage');
        });
      });
  
      if (!dadosFormulario.nome || !dadosFormulario.Detalhe) {
        this.mostrarAlerta('Campos Vazios', 'Por favor, preencha todos os campos obrigatórios.');
        return; // Encerre a função se os campos estiverem vazios
      }
  
      this.storage.get('dadosFormulario').then((existingData) => {
        let dataToSave: any[] = [];
  
        if (existingData && Array.isArray(existingData)) {
          dataToSave = existingData;
  
          // Verifique se os novos dados já existem no array
          const isDuplicate = dataToSave.some((item) => {
            return JSON.stringify(item) === JSON.stringify(dadosFormulario);
          });
  
          if (isDuplicate) {
            //console.log('Dados iguais, não serão salvos novamente.');
            this.mostrarAlerta('Dados Iguais', 'Os dados já existem.');
            return; // Encerre a função se os dados forem iguais
          }
        }
  
        if (this.selectedImage) {
          dadosFormulario.imagem = this.selectedImage; // Adicione a imagem aos dados do formulário
        }
        
        dataToSave.push(dadosFormulario); // Adicione os novos dados ao array
        this.storage.set('dadosFormulario', dataToSave).then(() => {
        //  console.log('Dados do formulário (incluindo a imagem) salvos no Local Storage');
          window.location.reload();
          this.setAlarm();
          
        });
       
      });
  
    } else {
      this.mostrarAlerta('Campos Inválidos', 'Por favor, preencha os campos corretamente.');
    }
    
  }


  //config alrme
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

//fim alarme

  async ngOnInit() {
    this.setAlarm()
  }
  async visualizarDados() {
    const dadosArmazenados = await this.storage.get('dadosFormulario');
    console.log('Dados armazenados: ', dadosArmazenados);
  }
  async mostrarAlerta(titulo: string, mensagem: string ) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImage = reader.result;
    };

    reader.readAsDataURL(file);
  }
  returnHome(){
    this.rota.navigateForward("/home")
  }
}
