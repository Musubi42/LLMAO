import { readFile } from "fs/promises";
import he from "he";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

async function parseClaudeConversations(filePath) {
  console.log("📂 Lecture du fichier:", filePath);

  const rawData = await readFile(filePath, "utf8");
  const conversations = JSON.parse(rawData);

  const summaries = conversations.map((conversation) => {
    const userQuestions = conversation.chat_messages
      .filter((msg) => msg.sender === "human")
      .map((msg) => {
        return he.decode(msg.text);
      });

    return {
      topic: conversation.name,
      userQuestions,
    };
  });

  return summaries;
}

const filePath = join(
  process.cwd(),
  "data",
  "claude",
  "original",
  "conversations.json"
);
const summaries = await parseClaudeConversations(filePath);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const captureDir = join(__dirname, "data", "claude", "parsed");
console.log("captureDir", captureDir);

await writeFile(
  join(captureDir, `conversations.json`),
  JSON.stringify(summaries, null, 2)
);
