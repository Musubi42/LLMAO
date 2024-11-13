// index.js
import { claudeParser } from "./src/parsers/claude.js";
import { LLMaoRoaster } from "./src/roaster.js";
import { readFile } from "fs/promises"; 
import { join } from "path";

async function main() {
  try {
    const parsed = await claudeParser();
    // console.log(parsed);

    // const rawData = await readFile(filePath, "utf8");
    // const conversations = JSON.parse(rawData);

    // // Pour chaque conversation dans le fichier
    // for (const chatData of conversations) {
    //   console.log(`\n📝 Analyse de la conversation: ${chatData.name}`);

    //   const parser = new ClaudeParser(chatData);
    //   const questions = parser.extractQuestions();

    //   console.log("🔍 Questions extraites:", questions);

      const roaster = new LLMaoRoaster(process.env.OPENAI_API_KEY);
      const prompt = roaster.createPrompt(parsed);

      // console.log("🔥 Génération du roast...");
      const roast = await roaster.generateRoast(prompt);

      console.log("\n🤖 Votre roast:\n");
      console.log(roast);
      console.log("\n-------------------\n");
    // }
  } catch (error) {
    console.error("💥 Erreur:", error);
    process.exit(1);
  }
}

main();
