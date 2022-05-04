export interface Event {
  date: Date,
  feat: {},
  description: '',
  note: ''
}

export interface Liver {
  name: string,
  urls: {
    twitter?: string,
    youtube?: string,
    twitch?: string,
  }
  color: string
}