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
  icon: any;
}
