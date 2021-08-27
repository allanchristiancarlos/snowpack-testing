import React from 'react'
import type { INote, IRenderer, IRenderOpts } from './@types/types'

export class WebRenderer implements IRenderer<React.ReactNode> {
  render(notes: INote[], opts: IRenderOpts) {
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'tomato',
          overflowY: 'auto',
        }}
      >
        {notes.map((note, index) => {
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `calc(40px * ${note.midi})`,
                height: `calc(100px * ${note.duration})`,
                backgroundColor: 'white',
                top: `calc(100px * ${note.time})`,
              }}
            >
              {note.name}
            </div>
          )
        })}
      </div>
    )
  }
}
