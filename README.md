# AI Weather Assistant

## Overview

The **AI Weather Assistant** is a full-stack application that combines a Next.js frontend with an Express.js backend to provide users with real-time weather information through conversational audio responses. Users can ask about the weather in specific locations by clicking a button, and the app will respond with detailed audio messages.

The application utilizes the OpenAI real-time model to process user queries and Tavily to fetch accurate weather data. This integration allows for a seamless user experience where weather information is delivered in an interactive manner.

## Features

- **Real-time Weather Queries**: Users can inquire about the weather in their city.
- **Audio Responses**: The app provides audio feedback with detailed weather information.
- **Session Management**: Establishes a session with OpenAI for interactive conversations.
- **Dynamic Animation**: Utilizes `lottie-react` for engaging button animations.
- **Responsive Design**: Built with Tailwind CSS and Sass for a modern look and feel.

## Technologies Used

- **Frontend**: 
  - **Next.js**: A React framework for server-side rendering and static site generation.
  - **Lottie-React**: For rendering animations.
  - **Tailwind CSS**: For utility-first CSS styling.
  - **Sass**: For advanced styling capabilities.

- **Backend**:
  - **Express.js**: A web application framework for Node.js.
  - **Tavily**: For fetching weather data.
  - **OpenAI API**: For creating conversational sessions.
  - **CORS**: To enable secure cross-origin requests.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

3. Create a `.env` file in the root directory of the backend and add the following lines:
   ```plaintext
   TAVILY_API_KEY=<your-tavily-api-key>
   OPENAI_API_KEY=<your-openai-api-key>
   PORT=3001
   ```

4. Create a `.env` file in the root directory of the frontend and add:
   ```plaintext
   NEXT_PUBLIC_API_URL=<your-backend-api-url>
   ```

### Running the Application

To start the development servers for both frontend and backend, run:

- For the backend:
  ```bash
  cd backend
  npm run dev
  ```

- For the frontend:
  ```bash
  cd frontend
  npm run dev
  ```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the application.

## Usage

1. Click the microphone button to initiate a connection with the backend.
2. The app will retrieve session data and establish a connection with the OpenAI model.
3. Ask a question like "What is the weather in Astana?".
4. The app will respond with an audio message detailing the weather conditions.

## Conclusion

The AI Weather Assistant provides a unique and interactive way to access weather information using advanced AI technologies. For more technical details, please refer to the [frontend documentation](frontend/README.md) and [backend documentation](backend/README.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the real-time model.
- The developers of Next.js, Lottie, Tailwind CSS, and Sass for their amazing tools.
- Tavily for providing weather data.
