import { UnknownPipe } from './unknown.pipe';

describe('UnknownPipe', () => {
  it('create an instance', () => {
    const pipe = new UnknownPipe();
    expect(pipe).toBeTruthy();
  });
});
