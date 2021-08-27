import React from 'react'
import type { INote, IRenderer, IRenderOpts } from './@types/types'
import { NOTES_BY_MIDI_NUMBER } from './data'

const WhiteKey: React.FC<{ border: boolean; fullkey: boolean }> =
  function Piano(props) {
    return (
      <div
        style={{
          background: 'white',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px',
          fontSize: '12px',
          fontWeight: 'bold',
          flexGrow: props.fullkey ? 2 : 1,
          borderRight: props.border ? '2px solid black' : undefined,
          borderBottom: '2px solid black',
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
            borderBottom: '2px solid black',
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

const chords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const Piano: React.FC<{ keys: number; startKey: string }> = function Piano(
  props
) {
  let currentKey = chords.indexOf(props.startKey)
  let octaves = 1
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#900',
        padding: '8px 0 16px 0',
        height: '360px',
        width: '100%',
      }}
    >
      {Array.from(Array(props.keys).keys()).map((_, index) => {
        currentKey++
        if (currentKey === 13) {
          currentKey = 1
          octaves++
        }
        const isLastKey = index + 1 === props.keys
        const key = chords[currentKey - 1]
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
            fullkey={isLastKey && !isBlackKey}
          >{`${key}${octaves}`}</WhiteKey>
        )
      })}
    </div>
  )
}

export class WebRenderer implements IRenderer<React.ReactNode> {
  render(notes: INote[], opts: IRenderOpts) {
    const lowesMidiNote = Math.min(...notes.map(x => x.midi))
    const midiNumberStart = opts.piano === '88' ? 22 : 24
    const startKey = opts.piano === '88' ? 'A' : 'C'
    const totalKeys = parseInt(opts.piano)
    const keyWidth = 100 / totalKeys
    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'black',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            flex: 1,
            overflow: 'scroll',
          }}
        >
          <div
            style={{
              position: 'relative',
              top: '900px',
              left: 0,
              width: '100%',
              transition: 'ease-in-out top .2s',
            }}
          >
            {notes.map((note, index) => {
              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    left: `calc((${keyWidth}% * ${
                      note.midi - midiNumberStart
                    }) - 7px)`,
                    width: `${keyWidth}%`,
                    height: `calc(200px * ${note.duration})`,
                    backgroundColor: '#ffc905',
                    top: `-${200 * note.time}px`,
                    fontSize: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    alignItems: 'center',
                  }}
                >
                  <div title={JSON.stringify(note, null, 2)}>{note.name}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div
          style={{
            zIndex: 1,
          }}
        >
          <Piano keys={totalKeys} startKey={startKey} />
        </div>
      </div>
    )
  }
}
