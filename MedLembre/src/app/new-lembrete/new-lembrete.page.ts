import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadosService } from '../dados.service';
import { LocalNotifications, ScheduleOptions } from '@capacitor/local-notifications';
import { IonDatetimeButton } from '@ionic/angular';

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
  
  
  onFileSelected(event: any) {
    const file = event.target.files[0];

    // Verifica se um arquivo foi selecionado
    if (file) {
      // Cria um FileReader para ler o arquivo
      const reader = new FileReader();

      // Define o evento onload do FileReader
      reader.onload = (e) => {
        // Atribui o resultado da leitura (data URL da imagem) à variável selectedImage
        this.selectedImage = reader.result;
      };

      // Lê o arquivo como uma URL de dados (data URL)
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.meuForm.valid) {
      const dadosFormulario = this.meuForm.value;
  
      // Verificar se campos obrigatórios estão preenchidos
      if (!dadosFormulario.nome || !dadosFormulario.Detalhe || !this.selectedImage) {
        this.dadosService.alertOffreload('Campo sem Imagem', 'Por favor, Adicionar uma Imagem');
        return; // Encerrar a função se os campos estiverem vazios
      }
  
      const idForm = Date.now().toString();
      const idNoti = Math.floor(Math.random() * 4294967296) - 2147483648;
  
      // Recuperar dados existentes e adicionar os novos dados ao array
      this.dadosService.recuperarDados().then((existingData) => {
        let dataToSave: any[] = existingData || [];
        dadosFormulario.id = idForm;
        dadosFormulario.idNotifictions = idNoti
  
        // Adicionar a imagem aos dados do formulário
        dadosFormulario.imagem = this.selectedImage;
  
        dataToSave.push(dadosFormulario);
  
        // Salvar dados e mostrar alerta de sucesso
        this.dadosService.salvarDados(dataToSave).then(() => {
          console.log('Dados do formulário salvos no Local Storage');
          this.dadosService.mostrarAlerta('Cadastro Realizado com sucesso', '');
  
          // Agendar notificação local
          const getData = new Date(dadosFormulario.data);
          const title = dadosFormulario.nome;
          const body = dadosFormulario.Detalhe;
          this.scheduleLocalNotification(title, body, getData, idNoti);
        });
      });
  
      // Verificar se novos dados já existem no array
      this.storage.get('dadosFormulario').then((existingData) => {
        let dataToSave: any[] = [];
  
        if (existingData && Array.isArray(existingData)) {
          dataToSave = existingData;
          const isDuplicate = dataToSave.some((item) => {
            return item.nome === dadosFormulario.nome;
          });
        }
      });
    } else {
      this.dadosService.mostrarAlerta('Campos Inválidos', 'Por favor, preencha os campos corretamente.');
    }
  }
  

  

  async scheduleLocalNotification(title:string , body:string , dateAlert:Date , idNoti:number) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: title,
            body: body,
            id: idNoti,
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

  
  returnHome(){
    this.rota.navigateForward("/home")
  }
  async atualizarConteudo(event: CustomEvent) {
    this.dadosService.atualizarConteudo(event)
}
}