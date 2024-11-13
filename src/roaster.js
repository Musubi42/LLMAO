import { OpenAI } from "openai";

export class LLMaoRoaster {
  constructor(apiKey) {
    this.client = new OpenAI({ apiKey });
  }

  createPrompt(questions) {
    // Formater chaque conversation
    const formattedQuestions = questions
      .map(
        (conv) =>
          `Topic: ${conv.topic}
Questions:
${conv.userQuestions.map((q) => `- ${q}`).join("\n")}`
      )
      .join("\n\n");

    return `Based on these previous chats from a user:

${formattedQuestions}

Create a funny roast about this person based on their interests and questions.
Make it personal and spicy but not offensive.`;
  }

  async generateRoast(prompt) {
    const completion = await this.client.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  }
}
