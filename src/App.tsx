import React from 'react'
import styled from '@emotion/styled'
import type { INote, IRenderer, IRenderOpts } from './@types/types'
import { WebRenderer } from './webRenderer'
import { SAMPLE_MIDI_DATA } from './data'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const Header = styled.header`
  background-color: black;
  color: white;
  /* height: 64px; */
  font-size: 64px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`
const Content = styled.header`
  background-color: white;
  color: black;
  flex: 1;
  position: relative;
`
const Footer = styled.header`
  background-color: black;
  color: white;
  height: 24px;
`

class Renderer<T> {
  constructor(private opts: { renderer: IRenderer<T> }) {}

  render(notes: Array<INote>, opts: IRenderOpts) {
    return this.opts.renderer.render(notes, opts)
  }
}

const renderer = new Renderer({ renderer: new WebRenderer() })
const result = renderer.render(SAMPLE_MIDI_DATA.tracks[0].notes, {
  noteWidth: 10,
})
function App() {
  return (
    <Container>
      <Header>Piano Notes Visualizer</Header>
      <Content>{result}</Content>
      <Footer>{new Date().getFullYear()}&copy;Copyright</Footer>
    </Container>
  )
}

export default App
