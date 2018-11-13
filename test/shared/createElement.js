import { createElement } from '../../src/index'
import { expect } from 'chai'

/* create jsx */
const buildVNode = (nodeName, attributes, children = []) => ({
  nodeName,
  children,
  attributes,
  key: attributes && attributes.key
})

describe('createElement(jsx)', () => {
  it('should return a VNode', () => {
    let r
    expect(() => r = createElement('foo')).not.to.throw()
    expect(r).to.be.an('object')
    expect(r).to.have.property('nodeName', 'foo')
    expect(r).to.have.property('attributes', undefined)
    expect(r).to.have.property('children').that.eql([])
  })

  it('should preserve raw attributes', () => {
    let attrs = { foo: 'bar', baz: 10, func: () => { } },
      r = createElement('foo', attrs)
      expect(r).to.be.an('object')
      .with.property('attributes')
      .that.deep.equals(attrs)
  })

  it('should support element children', () => {
    let r = createElement(
      'foo',
      null,
      createElement('bar'),
      createElement('baz')
    )

    expect(r).to.be.an('object')
      .with.property('children')
      .that.deep.equals([
        buildVNode('bar'),
        buildVNode('baz')
      ])
  })

  it('should support multiple element children, given as arg list', () => {
    let r = createElement(
      'foo',
      null,
      createElement('bar'),
      createElement('baz', null, createElement('test'))
    )

    expect(r).to.be.an('object')
      .with.property('children')
      .that.deep.equals([
        buildVNode('bar'),
        buildVNode('baz', undefined, [
          buildVNode('test')
        ])
      ])
  })

  it('should support text children', () => {
    let r = createElement(
      'foo',
      null,
      'textstuff'
    )

    expect(r).to.be.an('object')
      .with.property('children')
      .with.length(1)
      .with.property('0')
      .that.equals('textstuff')
  })

  it('should not merge children of components', () => {
    let Component = ({ children }) => children
    let r = createElement(Component, null, 'x', 'y')

    expect(r).to.be.an('object')
      .with.property('children')
      .that.deep.equals(['x', 'y'])
  })
})
