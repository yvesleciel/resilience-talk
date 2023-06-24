import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddTalkService} from "../add-talk.service";
import {AuthenticationService} from "../authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-talk',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-talk.component.html',
  styleUrls: ['./my-talk.component.scss']
})
export class MyTalkComponent implements OnInit{

  talkService = inject(AddTalkService);
  authService = inject(AuthenticationService);
  private router = inject(Router)
  talks:any[] = [];

  ngOnInit(){
    const a = 'retteteyeyyeyyuuuuduhdhhdhhdhhhdhhd\n' +
      '      dgdgdggdhdhhdhhdhdhdhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhddhdhdhhdhd\n' +
      '        ddhjdhdhhdh hdhhhdhh hdhdhdhh hdhhdhh hdhdhhd bdhdhh  dhgdhgdhdhhdhhd hdhdhdhdhhdh dghdhghdhdhd dghhgd\n' +
      '        dhdhhdhdhdhhfhhdhdjdj dhhjdjhdjdjd hdhdhdhdh hdhhdhd dbhdhdhdh hdhdghdghdg dhhdhdhd dhdhdhdh dgdghdh\n' +
      '        dbdbdbdbbdbdbbdbdbdbdb dbdhd dbdbdbhdhhdh dhdhdhdhhdhd dhdhdhdhdhdhdh dhdhhdhdhdhdhd hdhhdhdhdhdhdh dhdhdh\n' +
      '        dddhhhhhhhh dhdddddddddj djjdj\n' +
      '        ddkjdjdjdjdjdjjdjdjdjdddhgdhdhhdhdhhddd\n' +
      '        ddddddddddddddddd dddydyydydyy dyydyyydyydydyy ddydyydydydyyd dydyydydydyy dyydydydydydy dyydydyy dydyydydy dhdyhdhy\n' +
      '        ddhdhdhhdhdhgdgdgghd dghdhgdhdhhd ddfdffgdfgdg dgdggddggd ggdhghdghdh dhhydhdhhh dhyhydhydhydhyhy dhyhydhydhydhhyd dyydhydhy dyyhdyhdyh\n' +
      '        dhgdhgdhdhdhdhhdhdhh dhhdhdhdhdhh djdjj\n' +
      '      dbbdbdddddddddddddddddddddddddnnnnnnbbdbdbdbdddbdbdbdbdb';

    console.log(a.replace(/\s/g, "").length);
    let uid = ''
    this.authService.getUUID().then(uuid => {
      uid = uuid!
      console.log(uid)
      this.talkService.getTalkPerUser(uid).then((talk:any[]) => {
        this.talks = talk
        console.log(this.talks);
      })
    })
  }

  addTalk() {
    this.router.navigate(['/add-talk'])
  }

  updateTalk(id: string) {
    this.router.navigate(['/update-talk', id])
  }
}
