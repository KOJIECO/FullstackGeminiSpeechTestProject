import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI;

const initGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = initGenAI();
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Error calling Gemini:', error);
    res.status(500).json({ 
      error: 'Failed to get response from Gemini', 
      details: error.message 
    });
  }
};
