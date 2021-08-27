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
}

export interface IRenderer<T> {
  render(notes: Array<INote>, opts: IRenderOpts): T
}
