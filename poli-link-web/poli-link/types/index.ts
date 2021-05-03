export type ResponseType<V> = Promise<V>
export type ResponseMapType<K extends string, V> = Promise<{ [P in K]: V }>

export type ResponseTypes<T> = Promise<T>

export type CustomErrors = {
  errors: {
    errorName: string[]
  }
}

export interface ListRequestType  {
  limit?: number
  offset?: number
}

export interface Memo {
  id: number
  title: string
  memo: string
}
export interface CouncilType {
  id: string
  name: string
  url: string
  description: string
  ministry_id: string
}

export interface MinistryType {
  id: string
  name: string
  name_e: string
  abbreviation: string
  url: string
}

export interface PersonType {
  id: string
  name: string
  name_kana: string
  name_e: string
  url_official: string
  url_wikipedia: string
  url_twitter: string
  url_facebook: string
  url_youtube: string
  career_summary: string
}

export interface CouncilMemberType {
  id: string
  name: string
  occupation: string
  position: string
  council: string
  person: string
}

export interface CouncilMeetingType {
  id: string
  name: string
  place: string
  order: number
  meeting_date: Date
  council: string
}

export interface MeetingSpeechType {
  id: string
  council: string
  council_meeting: string
  order: number
  speaker: string
  person: string
  speech: string
  description: string
}
