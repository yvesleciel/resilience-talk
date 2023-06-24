import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTalkComponent } from './my-talk.component';

describe('MyTalkComponent', () => {
  let component: MyTalkComponent;
  let fixture: ComponentFixture<MyTalkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyTalkComponent]
    });
    fixture = TestBed.createComponent(MyTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
