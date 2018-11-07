import { TestBed } from '@angular/core/testing';

import { UploadService } from './upload-service.service';

describe('UploadServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadService = TestBed.get(UploadService);
    expect(service).toBeTruthy();
  });
});
