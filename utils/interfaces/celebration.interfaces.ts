export interface ICelebration {
  createdBy: string;
  note: string;
  date: string;
  reminder: boolean;
  celebrationType: "anniversary" | "birthday";
}
