import { useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import { Toaster } from "react-hot-toast";

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      {!quizStarted ? (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md sm:max-w-lg text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Welcome to the Quiz!
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">Instructions:</p>
          <ul className="text-left text-gray-700 list-disc list-inside mb-4 text-sm sm:text-base">
            <li>For multiple-choice questions, select the best answer.</li>
            <li>For integer-type questions, enter the correct number.</li>
            <li>Each question has a time limit of 30 seconds.</li>
            <li>You cannot skip a question without answering.</li>
          </ul>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer w-full sm:w-auto"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <Quiz />
      )}
    </div>
  );
}

export default App;
