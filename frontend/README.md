# AI Weather Assistant

## Overview

The AI Weather Assistant is a Next.js frontend application that allows users to interact with an OpenAI model to get real-time weather information. The app connects to a backend service to establish a session and utilizes the OpenAI real-time model to process user queries about the weather.

## Features

- **Real-time Weather Queries**: Users can ask about the weather in their city.
- **Audio Responses**: The app provides audio responses with detailed weather information.
- **Session Management**: Establishes a session with the backend to interact with the OpenAI model.
- **Dynamic Animation**: Utilizes `lottie-react` for button animations.
- **Responsive Design**: Built with Tailwind CSS and Sass for styling.

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

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following line:
   ```plaintext
   NEXT_PUBLIC_API_URL=<your-backend-api-url>
   ```

### Running the Application

To start the development server, run:
```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Usage

1. Click the microphone button to start the connection with the backend.
2. The app will connect to the backend to retrieve session data and establish a connection with the OpenAI model.
3. Ask a question like "What is the weather in Astana?".
4. The app will respond with an audio message detailing the weather conditions.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **Lottie-React**: For rendering animations.
- **Tailwind CSS**: For utility-first CSS styling.
- **Sass**: For advanced styling capabilities.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI for providing the real-time model.
- The developers of Next.js, Lottie, Tailwind CSS, and Sass for their amazing tools.
