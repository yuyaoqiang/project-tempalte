export interface connectionProps {
  dispatch: Function;
  [random: string]: any;
}
export interface connectionState {
  [random: string]: any;
}

export interface Payload {
  type: string;
  payload?: any;
  cb?: Function;
}
