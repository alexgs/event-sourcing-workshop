import { expect } from 'chai';
import { sum } from './index';

describe('Function `sum`', () => {
  it('adds its arguments', () => {
    const output = sum(3, 5);
    expect(output).to.equal(3 + 5);
  });
});
