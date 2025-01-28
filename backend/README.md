# Backend API Documentation

## Overview

This backend application is built using Express.js and integrates with OpenAI and Tavily to provide weather information and session management. The application exposes two main API endpoints: `/weather` and `/session`.

## API Endpoints

### 1. `/weather`

This endpoint allows users to search for weather information by sending a query to Tavily.

For more information about the Tavily documentation, visit [Tavily Documentation](https://docs.tavily.com/docs/javascript-sdk/tavily-search/getting-started).


- **Method**: `GET`
- **Request Parameters**:
  - `query` (string): The search term for the weather information (e.g., city name).
  
- **Response**:
  - **Success (200)**: Returns a response text from Tavily API like:
    ```
    "Today in Astana, the weather is characterized by blowing snow with a temperature of -12°C (10.4°F). The wind is blowing from the southwest at 11.9 mph (19.1 kph) with gusts up to 16.2 mph (26.1 kph). The humidity is high at 85%, and the visibility is reduced to 3.0 miles (6.0 km) due to the snow. The UV index is low at 1.0."
    ``` 
  - **Error (400)**: Returns an error message if the query is invalid.
    ```json
    {
      "error": "Location is required"
    }
    ```
  - **Error (500)**: Returns an error when something went wrong.
    ```json
    {
      "error": "Failed to fetch data"
    }
    ```

### 2. `/session`

This endpoint creates a session with OpenAI, which can be used by the frontend UI for future interactions.
For more information about the OpenAI Realtime documentation, visit [OpenAI Realtime Sessions Documentation](https://platform.openai.com/docs/api-reference/realtime-sessions/session_object).

- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "model": "gpt-4o-mini-realtime-preview-2024-12-17",
    "voice": "alloy",
    "tools": [
      {
        "type": "function",
        "name": "name",
        "description": "Description of the tool",
        "parameters": { "parameter_name": { "type": "string" } }
      }
    ],
    "instructions": "Your instructions here"
  }
  ```
  
- **Response**:
  - **Success (201)**: Returns a JSON object containing the session ID and other session details.
    ```json
    {
      "client_secret": {
        "value": "sk-proj-1234567890",
        "expires_at": 1717000000
      },
      
    }
    ```
  - **Error (400)**: Returns an error message if the request body is invalid.
    ```json
    {
      "error": "Invalid parameters"
    }
    ```

## Parameters Description

- **Model**: Specifies the OpenAI model to be used (e.g., `gpt-4o-mini-realtime-preview-2024-12-17`).
- **Voice**: Defines the voice settings for the session (e.g., `alloy, ash, echo, shimmer`).
- **Tools**: An array of tools that can be used during the session.
- **Instructions**: Custom instructions for the session to guide the AI's responses.

## Environment Variables

To run the application in development mode, you need to set up a `.env` file with the following constants:

- `TAVILY_API_KEY`: Your API key for Tavily to access weather data.
- `OPENAI_API_KEY`: Your API key for OpenAI to create sessions.
- `PORT`: The port number on which the server will run (default is `3001`).

### Example `.env` file

TAVILY_API_KEY=your_tavily_api_key
OPENAI_API_KEY=your_openai_api_key
PORT=3001

# Backend Configuration

## CORS Setup

In `src/app.ts`, configure CORS to match your frontend URL:
```
app.use(cors({
    origin: 'http://localhost:3000', // Change this to match your frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Important Notes:
- The `origin` should match your frontend application's URL
- Default port for Next.js development is 3000
- If your frontend runs on a different port, update accordingly
- For production, change to your actual domain

Example ports:
- Frontend (Next.js): http://localhost:3000
- Backend (Express): http://localhost:3001

## Running the Application

To run the application in development mode, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start and listen on the specified port. You can access the API endpoints at `http://localhost:<PORT>/weather` and `http://localhost:<PORT>/session`.

## Libraries Used

- **Express.js**: A web application framework for Node.js, designed for building web applications and APIs.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.
- **cors**: A package that provides a middleware to enable Cross-Origin Resource Sharing (CORS). This allows only specified domains to access the API, enhancing security.
- **tavily**: A library for interacting with the Tavily API to fetch weather data.
- **axios**: A promise-based HTTP client for the browser and Node.js, used for making API requests.

## Conclusion

This backend application provides a simple and effective way to interact with weather data and OpenAI sessions. For any questions or issues, please refer to the documentation or contact the development team.
