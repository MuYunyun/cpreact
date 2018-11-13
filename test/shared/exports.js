import { expect } from 'chai'
import cpreact, { Component, ReactDOM } from '../../src/index'
import { render } from '../../src/render'

describe('cpreact', () => {
  it('should be available as a default export', () => {
    expect(cpreact).to.be.an('object')
    expect(ReactDOM).to.be.an('object')
  })

  it('should be available as named exports', () => {
    expect(Component).to.be.a('function')
    expect(render).to.be.a('function')
  })
})
