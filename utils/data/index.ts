export const exploreFeatures = [
  {
    id: 1,
    title: "Movie Night",
    icon: require("@/assets/images/movies.png"),
    color: "#0CBCF233",
    route: "/(explore)/CreateMovieNight",
  },
  {
    id: 2,
    title: "Games",
    icon: require("@/assets/images/games.png"),
    color: "#F700F633",
    route: "/(explore)/CreateMovieNight",
  },
  {
    id: 3,
    title: "Date Night",
    icon: require("@/assets/images/datenight.png"),
    color: "#0911E133",
    route: "/(explore)/create-date-night",
  },
  {
    id: 4,
    title: "Chit Chat",
    icon: require("@/assets/images/chitchat.png"),
    color: "#F6BB4233",
    route: "/(explore)/CreateMovieNight",
  },

  {
    id: 5,
    title: "Intimacy",
    icon: require("@/assets/images/intimacy.png"),
    color: "#E1160933",
    route: "/(explore)/CreateMovieNight",
  },

  {
    id: 6,
    title: "Celebration",
    icon: require("@/assets/images/celebration.png"),
    color: "#AF8BEA33",
    route: "/(explore)/CreateMovieNight",
  },

  // {
  //   id: 7,
  //   title: " Love Language",
  //   icon: require("@/assets/images/love-language.png"),
  //   color: "#33AB3F33",
  //   route: "/(explore)/love-language"
  // },

  {
    id: 7,
    title: "Lavender",
    icon: require("@/assets/images/lavender-purple.png"),
    color: "#592E8333",
    route: "/(explore)/CreateMovieNight",
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

export const settingsOptions = [
  {
    title: "Profile",
    link: "/(settings)/profile",
    subtitle: "Edit your profile",
    icon: require("@/assets/images/blue-chat.png"),
    toggle: false,
    comingSoon: false,
  },
  
  {
    title: "Flirt message secret code",
    subtitle: "Change your secret code to...",
    link: "/(settings)/FlirtMessageSecretCode",
    icon: require("@/assets/images/blue-chat.png"),
    toggle: false,
    comingSoon: false,
  },

  {
    title: "Reset Password",
    subtitle: "Reset your password..",
    link: "/(settings)/reset-password",
    icon: require("@/assets/images/blue-chat.png"),
    toggle: false,
    comingSoon: false,
  },

  {
    title: "Dark Mode",
    subtitle: "Change the app theme ",
    icon: require("@/assets/images/pink-chat.png"),
    toggle: true,
    comingSoon: true,
  },

  {
    title: "Disconnect with partner",
    link: "/(settings)/disconnect-with-partner",
    subtitle: "Disconnect with your partner...",
    icon: require("@/assets/images/pink-chat.png"),
    toggle: false,
    comingSoon: false,
  },

  {
    title: "Log out",
    subtitle: "Logout from the app",
    icon: require("@/assets/images/pink-chat.png"),
    toggle: false,
    comingSoon: false,
  },
];
