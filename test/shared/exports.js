// import cpreact, { h, Component, render, rerender, options } from '../../src/index';
import cpreact, { Component, ReactDOM } from '../../src/index';
import { expect } from 'chai';

describe('cpreact', () => {
  it('should be available as a default export', () => {
    expect(cpreact).to.be.an('object');
    expect(ReactDOM).to.be.an('object');
  });

  it('should be available as named exports', () => {
    expect(Component).to.be.a('function');
    // expect(render).to.be.a('function');
    // expect(rerender).to.be.a('function');
    // expect(options).to.exist.and.be.an('object');
  });
});
