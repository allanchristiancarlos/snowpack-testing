import React from 'react'
import type { INote, IRenderer, IRenderOpts } from './@types/types'

export class WebRenderer implements IRenderer<React.ReactNode> {
  render(notes: INote[], opts: IRenderOpts) {
    return <>testing</>
  }
}
