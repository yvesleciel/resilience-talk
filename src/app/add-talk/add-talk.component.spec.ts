import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTalkComponent } from './add-talk.component';

describe('AddTalkComponent', () => {
  let component: AddTalkComponent;
  let fixture: ComponentFixture<AddTalkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddTalkComponent]
    });
    fixture = TestBed.createComponent(AddTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
