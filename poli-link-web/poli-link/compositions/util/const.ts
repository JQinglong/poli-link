import { MinistryType, CouncilType, CouncilMemberType, CouncilMeetingType, MeetingSpeechType } from "@/types";

export const defaultMinistryItem: MinistryType = {
  id: '',
  name: '',
  name_e: '',
  abbreviation: '',
  url: '',
};

export const defaultCouncilItem: CouncilType = {
  id: '',
  name: '',
  url: '',
  description: '',
  ministry: defaultMinistryItem,
};

export const defaultCouncilMemberItem: CouncilMemberType = {
  id: '',
  name: '',
  occupation: '',
  position: '',
  council: defaultCouncilItem,
  person: '',
};

export const defaultCouncilMeetingItem: CouncilMeetingType = {
  id: '',
  name: '',
  place: '',
  order: 0,
  meeting_date: new Date(),
  url_minute: '',
  url_document: '',
  council: defaultCouncilItem,
};

export const defaultMeetingSpeechItem: MeetingSpeechType = {
  id: '',
  council: defaultCouncilItem,
  council_meeting: defaultCouncilMeetingItem,
  order: 0,
  speaker: '',
  person: '',
  speech: '',
  description: '',
};
