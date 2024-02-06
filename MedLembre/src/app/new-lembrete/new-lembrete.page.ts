import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadosService } from '../dados.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { Title } from '@angular/platform-browser';

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
    private dadosService: DadosService,
     ) { 

      this.meuForm = this.formBuilder.group({
        nome: ['',Validators.required],
        Detalhe: ['',Validators.required],
        data:[''],
      });
  }
  
  
  submitForm() {
    this.storage.get('dadosFormulario')

    if (this.meuForm.valid) {

      const dadosFormulario = this.meuForm.value;
      const uniqueId = Date.now().toString();

      this.dadosService.recuperarDados().then((existingData) => {
        let dataToSave: any[] = existingData || [];
  
        // Adicione os novos dados ao array
        dadosFormulario.id = uniqueId;

        dataToSave.push(dadosFormulario);
        this.dadosService.mostrarAlerta('Cadastro Realizado com sucesso','');
        console.log(dadosFormulario);

        //config alarme screduler
        const getData =  new Date(dadosFormulario.data)
        this.scheduleLocalNotification(getData)
        
        this.dadosService.salvarDados(dataToSave).then(() => {
          console.log('Dados do formulário salvos no Local Storage');
        });
      });
  
      if (!dadosFormulario.nome || !dadosFormulario.Detalhe) {
        this.dadosService.mostrarAlerta('Campos Vazios', 'Por favor, preencha todos os campos obrigatórios.');
        return; // Encerre a função se os campos estiverem vazios
      }
  
      this.storage.get('dadosFormulario').then((existingData) => {
        let dataToSave: any[] = [];
  
        if (existingData && Array.isArray(existingData)) {
          dataToSave = existingData;
  
          // Verifique se os novos dados já existem no array
          const isDuplicate = dataToSave.some((item) => {
            //return JSON.stringify(item) === JSON.stringify(dadosFormulario);
            return item.nome === dadosFormulario.nome;
          });

        }
  
        if (this.selectedImage) {
          dadosFormulario.imagem = this.selectedImage; // Adicione a imagem aos dados do formulário
          
        }
      
      });
  
    } else {
      this.dadosService.mostrarAlerta('Campos Inválidos', 'Por favor, preencha os campos corretamente.');
    }
    
  }

  async scheduleLocalNotification(dateAlert:Date) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'title',
            body: 'body',
            id: 1,
            schedule: { at: dateAlert }, // Agendando para 5 segundos a partir de agora
            actionTypeId: '',
            extra: null
          }
        ]
      });
      console.log('Notificação agendada com sucesso!');
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
    }
  }

  async ngOnInit() {
    this.dadosService.setAlarm()
  }
  async visualizarDados() {
    const dadosArmazenados = await this.storage.get('dadosFormulario');
    console.log('Dados armazenados: ', dadosArmazenados);
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
