export interface IMessage {
  id: string;
  senderId: string;
  partnerId: string;
  message: string;
  type: MessageTypeEnum;
  conversationType: ConversationTypeEnum;
  coupleId: string;
  isSender: boolean;
}

export enum ConversationTypeEnum {
  Direct = "direct",
  Group = "group",
  ChitChat = "chit-chat",
  Flirt = "flirt",
}

export enum MessageTypeEnum {
  Text = "text",
  Image = "image",
  Audio = "audio",
  Video = "video",
}
