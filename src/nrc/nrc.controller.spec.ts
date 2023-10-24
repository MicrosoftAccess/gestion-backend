import { Test, TestingModule } from '@nestjs/testing';
import { NrcController } from './nrc.controller';
import { NrcService } from './nrc.service';

describe('NrcController', () => {
  let controller: NrcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NrcController],
      providers: [NrcService],
    }).compile();

    controller = module.get<NrcController>(NrcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
