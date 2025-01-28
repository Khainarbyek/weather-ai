import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { tavily } from "@tavily/core";
import axios from 'axios';
import { INSTRUCTION } from './instruction';
dotenv.config();

const app = express();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const TAVILY_API_KEY = process.env.TAVILY_API_KEY || '';

app.use(express.json());

// Configure CORS with more secure options
app.use(cors({
  origin: 'http://localhost:3000', // Your Next.js app URL
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add CORS pre-flight
app.options('*', cors());

const tvly = tavily({ apiKey: TAVILY_API_KEY });

// Get weather information from Tavily
app.get('/weather', async (req: Request, res: Response) => {
  try {
    const location = req.query.location as string;
    if (!location) {
      res.status(400).json({ error: 'Location is required' });
      return;
    }
    const response = await tvly.searchQNA(`Today's weather in ${location}`, {
      searchDepth: "basic",
      topic: "general",
      days: 1,
      maxResults: 5,
      includeImages: false,
      includeImageDescriptions: false,
      includeAnswer: true,
      includeRawContent: false,
      includeDomains: undefined,
      excludeDomains: undefined,
      maxTokens: 300,
    });
    // console.log("tavily response: ", response);
    res.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

//
app.get('/session', async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/realtime/sessions',
      {
        model: 'gpt-4o-mini-realtime-preview-2024-12-17',
        voice: 'alloy',
        tools: [
          {
            type: 'function',
            name: 'get_weather',
            description: 'Get the current weather. Works only for Earth',
            parameters: {
              type: 'object',
              properties: { location: { type: 'string' } },
              required: ['location'],
            },
          },
        ],
        instructions: INSTRUCTION,
        turn_detection: { type: "server_vad" }
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching session:', error);
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;