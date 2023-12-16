import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env["REACT_APP_OPENAI_KEY"],
});

export async function runNavegationOpenAIQuery(location: string) {
  const assistants = await client.beta.assistants.list();
  const assistant = assistants.data[0];

  const thread = await client.beta.threads.create();

  const run = await client.beta.threads.runs.create(thread.id, {
    assistant_id: assistant.id,
    instructions:
      "Please address the user as Jane Doe. The user has a premium account.",
  });

  console.log("run result", run);
}
