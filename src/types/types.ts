export type MessageType = 'QUESTION' | 'ANALYSIS_COMPLETE';

export interface WSMessage {
  type: MessageType;
  content: string;
}
