export enum OpenAiRoleEnum {
  System = "system",
  User = "user",
  Assistant = "assistant",
}

export enum OpenAiModelEnum {
  GPT_3_5_TURBO = "gpt-3.5-turbo",
  GPT_4 = "gpt-4",
  DAVINCI = "davinci",
  CURIE = "curie",
  BABBAGE = "babbage",
  ADA = "ada",
  GPT_4O_MINI = "gpt-4o-mini",
}

export interface IOpenAiMessage {
  role: OpenAiRoleEnum;
  content: string;
}

export interface IOpenAiChatResponse {
  id: string;
  object: string;
  created: number;
  choices: {
    index: number;
    message: IOpenAiMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface IOpenAiChatRequest {
  model: OpenAiModelEnum;
  messages: IOpenAiMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface IAiMessage {
  time: Date;
  message: string;
  isUser: boolean;
  id: string;
}
