import { CustomValidationPipe } from './custom-validation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new CustomValidationPipe()).toBeDefined();
  });
});
