/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { VertexAI } = require("@google-cloud/vertexai");

const projectId = "navegation1234";
const location = "us-central1";
const model = "gemini-pro";
const vertexAI = new VertexAI({ project: projectId, location: location });

// Instantiate the model
const generativeModel = vertexAI.preview.getGenerativeModel({
  model: model,
});

exports.promptGPT = onRequest(async (req, res) => {
  logger.info("promptGemini", req.body);
  const location = JSON.parse(req.body).location;
  logger.info("location", location);

  // const context = `You are an assistant that takes in a location, and returns a list of the best-rated vegan dishes near that location, in a 10km radius. Feel free to utilize Google searches for information. When returning your output, please return a list of dishes in the following format: { dish: (dish name) restaurant: (restaurant name) rating: (average rating if applicable) review: (relevant review about the dish) }`;
  const chat = generativeModel.startChat({
    temperature: 0.9,
    // context: context,
    topP: 1,
    topK: 1,
  });
  res.set("Access-Control-Allow-Origin", "*");

  // const prompt = `Search google to find me the best vegan dishes near ${location}, in a 10km radius.  When returning your output, please return a list of dishes in the following format: { dish: (dish name) restaurant: (restaurant name) rating: (average rating if applicable) review: (relevant review about the dish) }`;
  const prompt = `Search the web and find me the best vegan dishes near ${location}, in a 10km radius. Return to me a list of dishes in the following format: {dish: (dish name) restaurant: (restaurant name) rating: (average rating if applicable) review: (relevant review about the dish)}`;
  console.log(`User: ${prompt}`);

  // const result1 = await chat.sendMessage(prompt);
  const result1 = await chat.sendMessageStream(prompt);

  console.log(`Gemini: ${JSON.stringify(result1)}`);
  const response = await result1.response;

  console.log("response", response);

  const fullTextResponse = response.candidates[0].content.parts[0].text;

  logger.info("after chat send", fullTextResponse);

  res.send({ response: fullTextResponse });
});
