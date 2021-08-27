import React from 'react'
import type { INote, IRenderer, IRenderOpts } from './@types/types'

const WhiteKey: React.FC<{ border: boolean }> = function Piano(props) {
  return (
    <div
      style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        flexGrow: 1,
        borderRight: props.border ? '2px solid black' : undefined,
      }}
    >
      {props.children}
    </div>
  )
}

const BlackKey: React.FC<{ borderAlign: 'left' | 'center' | 'right' }> =
  function Piano(props) {
    const align = {
      left: '30%',
      center: '50%',
      right: '70%',
    }
    return (
      <div
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div
          style={{
            background: 'black',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '8px',
            color: 'white',
            fontSize: '11px',
            fontWeight: 'bold',
            flexGrow: 3,
          }}
        >
          {props.children}
        </div>
        <div
          style={{
            background: 'white',
            flexGrow: 1.5,
          }}
        >
          <div
            style={{
              backgroundColor: 'black',
              height: '100%',
              width: '2px',
              marginLeft: align[props.borderAlign],
            }}
          ></div>
        </div>
      </div>
    )
  }

const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const Piano: React.FC<{ keys: number }> = function Piano(props) {
  let currentKey = 0
  let octaves = 1
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#BF616A',
        padding: '16px 0',
        height: '360px',
        width: '100%',
        marginBottom: '24px',
      }}
    >
      {Array.from(Array(props.keys).keys()).map((_, index) => {
        currentKey++
        if (currentKey === 13) {
          currentKey = 1
          octaves++
        }
        const key = keys[currentKey - 1]
        const isBlackKey = key.indexOf('#') !== -1
        const blackKeysAlignment = {
          'F#': 'right',
          'C#': 'right',
          'A#': 'left',
          'D#': 'left',
        } as any
        return isBlackKey ? (
          <BlackKey
            borderAlign={blackKeysAlignment[key] || 'center'}
            key={index}
          >{`${key}${octaves}`}</BlackKey>
        ) : (
          <WhiteKey
            key={index}
            border={key === 'E' || key === 'B'}
          >{`${key}${octaves}`}</WhiteKey>
        )
      })}
    </div>
  )
}

export class WebRenderer implements IRenderer<React.ReactNode> {
  render(notes: INote[], opts: IRenderOpts) {
    const lowestNote = Math.min(...notes.map(x => x.midi))
    const pianoKeys = 61
    const keyStart = 'C'

    return (
      <div
        style={{
          alignItems: 'flex-end',
          display: 'flex',
          height: '100%',
        }}
      >
        <Piano keys={61} />
      </div>
      // <div
      //   style={{
      //     position: 'relative',
      //     width: '100%',
      //     height: '100%',
      //     background: 'black',
      //     overflowY: 'auto',
      //   }}
      // >
      //   {notes.map((note, index) => {
      //     return (
      //       <div
      //         key={index}
      //         style={{
      //           position: 'absolute',
      //           left: `calc(32px * ${note.midi})`,
      //           width: '32px',
      //           height: `calc(200px * ${note.duration})`,
      //           backgroundColor: 'white',
      //           top: `calc(200px * ${note.time})`,
      //           fontSize: '16px',
      //           display: 'flex',
      //           justifyContent: 'center',
      //           fontWeight: 'bold',
      //           alignItems: 'center',
      //         }}
      //       >
      //         <div title={JSON.stringify(note, null, 2)}>{note.name}</div>
      //       </div>
      //     )
      //   })}
      // </div>
    )
  }
}
