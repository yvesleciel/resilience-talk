import { TestBed } from '@angular/core/testing';

import { AddTalkService } from './add-talk.service';

describe('AddTalkService', () => {
  let service: AddTalkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTalkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
