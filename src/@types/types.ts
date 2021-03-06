export interface INote {
  duration: number
  durationTicks: number
  midi: number
  name: string
  ticks: number
  time: number
  velocity: number
}

export interface IRenderOpts {
  noteWidth: number
  piano: '61' | '88'
}

export interface IRenderer<T> {
  render(notes: Array<INote>, opts: IRenderOpts): T
}
