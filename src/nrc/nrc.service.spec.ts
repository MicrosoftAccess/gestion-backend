import { Test, TestingModule } from '@nestjs/testing';
import { NrcService } from './nrc.service';

describe('NrcService', () => {
  let service: NrcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NrcService],
    }).compile();

    service = module.get<NrcService>(NrcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
