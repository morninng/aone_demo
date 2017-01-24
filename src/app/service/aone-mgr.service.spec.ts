/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AoneMgrService } from './aone-mgr.service';

describe('AoneMgrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AoneMgrService]
    });
  });

  it('should ...', inject([AoneMgrService], (service: AoneMgrService) => {
    expect(service).toBeTruthy();
  }));
});
