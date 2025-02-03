import { IChatBubbleProps } from "@/assets/svgs/ChatBubble";
import { Href } from "expo-router";

export interface IAppFeatures {
  id: number;
  title: string;
  icon: any;
  color: string;
  route: Href;
}

export interface IChitChatOptions {
  id: number;
  title: string;
  description: string;
  icon: ({ iconColor, ...props }: IChatBubbleProps) => React.JSX.Element;
  route: Href;
}
