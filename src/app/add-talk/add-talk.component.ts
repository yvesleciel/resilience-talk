import {Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AddTalkService} from "../add-talk.service";
import {AuthenticationService} from "../authentication.service";


const toBase64 = (file: File) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

@Component({
  selector: 'app-add-talk',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-talk.component.html',
  styleUrls: ['./add-talk.component.scss']
})
export class AddTalkComponent implements OnInit{

  fb = inject(FormBuilder);
  talkService = inject(AddTalkService);
  authService = inject(AuthenticationService);
  imgAlreadyLoad = false;

  talkForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    phoneNumber: ['', [Validators.required,]],
    localisation:['',[]],
    displayEmail:[''],
    titleOfTalk:['', [Validators.required, Validators.minLength(5)]],
    descriptionOfTalk:['', [Validators.required, Validators.minLength(50), Validators.maxLength(1000)]],
    tags: ['User Experience,UI Design, React JS, HTML & CSS, JavaScript, Bootstrap 4'],
    linkLinkedin:[''],
    linkTwitter:[''],
    linkGithub:[''],
  })
   profilImg = '';
  uuid = '';

  @Input() talk!:any;
   byteArray: any;

  ngOnInit() {
    console.log(this.talk?.data());
    console.log(this.byteArray)
    const script = document.createElement("script");
    script.src = '../../assets/scripts/app/app-edit-user-profile.1.3.1.js'
    document.head.append(script);
    this.authService.getUUID().then(uuid => {
      this.uuid = uuid!;
    });
    if(this.talk != undefined){
      this.updateTalkForm(this.talk.data());
    }
  }

  onSubmitTalk(){
    if(this.talk === undefined){
      console.log('submit..................')
      console.log(this.talkForm.value)
      this.talkService.addTalk({...this.talkForm.value, imgUrl: this.profilImg, uuid: this.uuid, status:'WAITING', email: this.authService.user.email})
        .then(()=>{
          alert('Submit Talk Success')
        console.log('submit Talk success...............')
      })
    }
    else{
      this.talkService.updateTalk({...this.talkForm.value, imgUrl: this.profilImg, uuid: this.uuid, status:'WAITING'},
                                 this.talk!.ref.id).then(()=>{
                                   alert('Update Talk Success')
      })
    }
  }

  async onDetectImages(event: any) {
    this.imgAlreadyLoad = false;
    console.log(typeof event);
    console.log(event.target.files[0]);
    const file = event.target.files[0];
    this.byteArray = await toBase64(file);
    console.log(this.byteArray)
    this.talkService.uploadImage(file).then((url: string) => {
      this.imgAlreadyLoad = true;
      this.profilImg = url;
    })
  }

  updateTalkForm(talk:any){
    this.talkForm.patchValue({
    firstName: talk.firstName,
    lastName: talk.lastName,
    phoneNumber: talk.phoneNumber,
    localisation: talk.localisation,
    displayEmail: talk.displayEmail,
    titleOfTalk: talk.titleOfTalk,
    descriptionOfTalk: talk.descriptionOfTalk,
    tags: talk.tags,
    linkLinkedin: talk.linkLinkedin,
    linkTwitter: talk.linkTwitter,
    linkGithub: talk.linkGithub
    })
  }
}
