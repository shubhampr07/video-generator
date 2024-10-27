/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
    export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
   history: [
    {
      role: "user",
      parts: [
        {text: "Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "```json\n[\n  {\n    \"imagePrompt\": \"A bustling marketplace in ancient Rome, with merchants selling goods, people walking by, and a large, imposing structure in the background.\",\n    \"ContentText\": \"In the heart of ancient Rome, a bustling marketplace teemed with life. Merchants hawked their wares, their voices a cacophony of competing calls. The aroma of exotic spices and fresh bread hung heavy in the air. This was the Forum, the center of Roman life, where commerce and politics intertwined.\"\n  },\n  {\n    \"imagePrompt\": \"A portrait of a young, ambitious Roman senator, dressed in fine robes, with a determined look on his face.\",\n    \"ContentText\": \"Among the throng, a young man named Marcus stood out. He was a senator, ambitious and intelligent, with dreams of power and glory. His eyes, however, held a hint of sadness, a secret burden he carried.\"\n  },\n  {\n    \"imagePrompt\": \"A dramatic scene of a Roman chariot race, with horses straining, dust flying, and spectators cheering wildly.\",\n    \"ContentText\": \"One day, Marcus found himself drawn to the Circus Maximus, where a chariot race was underway. The roar of the crowd, the thunder of hooves, the spectacle of speed and danger, it all captivated him. He felt a strange sense of kinship with the charioteers, their lives a reflection of his own ambition.\"\n  },\n  {\n    \"imagePrompt\": \"A tense scene, with Marcus meeting secretly with a group of conspirators, whispering in a dark room.\",\n    \"ContentText\": \"But Marcus's ambition had a darker side. He had become entangled in a plot to overthrow the Emperor. He was a pawn in a game of power, his dreams of glory now tainted by treason.\"\n  },\n  {\n    \"imagePrompt\": \"A dramatic scene of a Roman execution, with Marcus kneeling before the Emperor, his face a mask of despair.\",\n    \"ContentText\": \"The plot was uncovered, and Marcus found himself facing the Emperor's wrath. He was betrayed by those he trusted, his dreams shattered, his fate sealed.\"\n  },\n  {\n    \"imagePrompt\": \"A close-up shot of a Roman coin, bearing the Emperor's image, with a somber tone.\",\n    \"ContentText\": \"The coin, a symbol of power and ambition, now seemed like a cruel reminder of the price Marcus had paid. His story, a cautionary tale of ambition gone wrong, became a legend whispered through the ages.\"\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON array represents a 30-second video script broken down into 6 scenes. Each object in the array represents a scene, containing:\n\n* **imagePrompt:** A descriptive text prompt for an AI image generator, like Midjourney or DALL-E, to create a visually compelling image for that scene. The prompts aim for realistic depictions of ancient Rome and its settings.\n* **ContentText:** The text that would be spoken or displayed on the screen during that scene. The text narrates the story of Marcus, a Roman senator caught in a web of ambition and betrayal.\n\n**How to Use:**\n\n1. **Generate Images:** Use the provided image prompts with an AI image generator to create visuals for each scene.\n2. **Edit Content:** Adjust the ContentText as needed for clarity and narrative flow. You can add more details, create dialogue, or adjust the tone of the narration.\n3. **Assemble the Video:** Combine the generated images with the edited ContentText to create your 30-second video. You can use video editing software like Adobe Premiere Pro or iMovie to assemble the scenes, add music, transitions, and any other desired effects.\n\n**Tips:**\n\n* **Consider the pacing:**  The script is designed for a 30-second video, so ensure each scene is concise and impactful.\n* **Experiment with visuals:** Play with the AI image prompts to achieve different styles and moods.\n* **Add sound effects:** Sound effects can enhance the drama and realism of the story.\n\nThis JSON format provides a flexible framework for quickly creating a historical video. Remember to adjust the details and style to fit your specific needs and artistic vision. \n"},
      ],
    },
  ],
    });