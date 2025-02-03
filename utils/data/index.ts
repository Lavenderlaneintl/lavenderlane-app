import ChatBubble from "@/assets/svgs/ChatBubble";
import { IAppFeatures, IChitChatOptions } from "../interfaces/index.interfaces";

export const exploreFeatures: IAppFeatures[] = [
  {
    id: 1,
    title: "Movie Night",
    icon: require("@/assets/images/movies.png"),
    color: "#0CBCF233",
    route: "/MovieNightScreen",
  },
  {
    id: 2,
    title: "Games",
    icon: require("@/assets/images/games.png"),
    color: "#F700F633",
    route: "/ComingSoonScreen",
  },
  {
    id: 3,
    title: "Date Night",
    icon: require("@/assets/images/datenight.png"),
    color: "#0911E133",
    route: "/DateNightScreen",
  },
  {
    id: 4,
    title: "Chit Chat",
    icon: require("@/assets/images/chitchat.png"),
    color: "#F6BB4233",
    route: "/ChitChatScreen",
  },

  {
    id: 5,
    title: "Intimacy",
    icon: require("@/assets/images/intimacy.png"),
    color: "#E1160933",
    route: "/ComingSoonScreen",
  },

  {
    id: 6,
    title: "Celebration",
    icon: require("@/assets/images/celebration.png"),
    color: "#AF8BEA33",
    route: "/ComingSoonScreen",
  },

  {
    id: 7,
    title: " Love Language",
    icon: require("@/assets/images/love-language.png"),
    color: "#33AB3F33",
    route: "/LoveLanguageScreen",
  },

  {
    id: 8,
    title: "Lavender",
    icon: require("@/assets/images/lavender-purple.png"),
    color: "#592E8333",
    route: "/ComingSoonScreen",
  },
];

export const loveLanguages = [
  {
    id: 1,
    title: "Words of affirmation",
    icon: require("@/assets/images/affirmation.png"),
  },
  {
    id: 2,
    title: "Physical Touch",
    icon: require("@/assets/images/physical-touch.png"),
  },
  {
    id: 3,
    title: "Quality Time",
    icon: require("@/assets/images/quality-time.png"),
  },
  {
    id: 4,
    title: "Acts of Service",
    icon: require("@/assets/images/service.png"),
  },

  {
    id: 5,
    title: "Receiving Gifts",
    icon: require("@/assets/images/recieve-gifts.png"),
  },
];

export const customBackgrounds = [
  {
    id: 1,
    background: require("@/assets/images/background1.png"),
  },
  {
    id: 2,
    background: require("@/assets/images/background2.png"),
  },
  {
    id: 3,
    background: require("@/assets/images/background3.png"),
  },
  {
    id: 4,
    background: require("@/assets/images/background4.png"),
  },
  {
    id: 5,
    background: require("@/assets/images/background5.png"),
  },

  {
    id: "add",
    isButton: true,
  },
];

export const chitchatOptions: IChitChatOptions[] = [
  {
    id: 1,
    title: "Sensitive Talk",
    description: "Talk about pressing issues",
    icon: ChatBubble,
    route: "/ChitChatScreen/SensitiveTalkScreen",
  },
  {
    id: 2,
    title: "Uninterrupted Gist",
    description: "Tell your partner everything...",
    icon: ChatBubble,
    route: "/ChitChatScreen/UninterruptedGistScreen",
  },
];
