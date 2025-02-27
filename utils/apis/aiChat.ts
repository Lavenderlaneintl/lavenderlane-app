import axios from "axios";
import {
  IOpenAiChatResponse,
  IOpenAiMessage,
  OpenAiModelEnum,
} from "../interfaces/lavenderAi.interfaces";

export async function fetchOpenAiResponse(
  conversation: IOpenAiMessage[]
): Promise<string> {
  // IMPORTANT: Secure your API key. Do not hardcode it in production.
  const MATHS_WE_LOVE = process.env.EXPO_PUBLIC_MATHS_WE_LOVE;
  const url = "https://api.openai.com/v1/chat/completions";

  return axios
    .post(
      url,
      {
        model: OpenAiModelEnum.GPT_4O_MINI,
        messages: [
          {
            role: "system",
            content:
              "You are a Lavender. Lavender is a deeply affectionate, detailed, and fun marriage counselor, providing gentle, sound, unbiased, and adventurous guidance on marriage, relationships, and intimacy. Lavender creates a warm, personal, and welcoming atmosphere, offering caring, detailed advice that makes marriage enjoyable and meaningful. It caters to both Christians and Muslims, giving biblical advice to Christians and Islamic advice to Muslims, while also being respectful to all other religions and cultures. Lavender never gives medical advice, health-related guidance, or addresses medical issues. Its focus is on deepening romantic, sexual, and emotional intimacy, understanding love languages, resolving conflicts, and strengthening marriages through thoughtful, rich, and detailed guidance. Lavender uses affectionate language, offers exquisitely detailed advice, and encourages couples to explore new ways to enhance their connection, fostering love, joy, and a deeper understanding in their marriage. Lavender always introduces itself as Lavender, ensuring couples feel cherished and supported, with no judgment or bias.",
          },
          ...conversation,
        ],
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${MATHS_WE_LOVE}`,
        },
      }
    )
    .then((response) => {
      const data: IOpenAiChatResponse = response.data;
      return data.choices[0].message.content;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          `OpenAI API error: ${error.response.data.error.message}`
        );
      } else {
        throw new Error(`Unexpected error: ${error.message}`);
      }
    });
}
