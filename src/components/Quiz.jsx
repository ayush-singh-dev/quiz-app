import { useEffect, useState } from "react";
import { quizData } from "../quizData";
import Result from "./Result";
import { getQuizHistory, saveQuizResult } from "../utils/indexDb";
import toast from "react-hot-toast";
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCorrectAnswer(true);
      setFeedback("Time's Up!");
    }
  }, [timeLeft, quizCompleted]);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      const history = await getQuizHistory();
      setQuizHistory(history);
    };
    fetchQuizHistory();
  }, [quizCompleted]);

  const handleAnswerClick = (option) => {
    if (selectedAnswer !== null) {
      return;
    }
    setSelectedAnswer(option);
    setTextAnswer(option);
    setFeedback(
      option === quizData[currentQuestion].answer ? "Correct!" : "Wrong Answer"
    );
    setScore((prev) =>
      option === quizData[currentQuestion].answer ? prev + 1 : prev
    );
    setShowCorrectAnswer(true);
  };
  const handleNextQuestion = () => {
    if (!selectedAnswer && textAnswer.trim() === "" && !showCorrectAnswer) {
      toast.error("Please select or type an answer before proceeding! 🚨");
      return;
    }
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTextAnswer("");
      setFeedback("");
      setTimeLeft(30);
      setShowCorrectAnswer(false);
    } else {
      saveQuizResult(score);
      setQuizCompleted(true);
      toast.success(
        `🎉 Quiz Completed! Your Score: ${score}/${quizData.length}`
      );
    }
  };

  const handleTextAnswerSubmit = () => {
    if (textAnswer.trim() === "") return; // Prevent submitting empty input
    setSelectedAnswer(textAnswer);
    setFeedback(
      textAnswer.trim().toLowerCase() ===
        quizData[currentQuestion].answer.toLowerCase()
        ? "Correct!"
        : "Wrong Answer"
    );
    setScore((prev) =>
      textAnswer.trim().toLowerCase() ===
      quizData[currentQuestion].answer.toLowerCase()
        ? prev + 1
        : prev
    );
    setShowCorrectAnswer(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTextAnswer("");
    setFeedback("");
    setScore(0);
    setTimeLeft(30);
    setShowCorrectAnswer(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    return (
      <>
        <Result
          handleRestartQuiz={handleRestartQuiz}
          score={score}
          quizData={quizData}
          quizHistory={quizHistory}
        />
      </>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto text-center">
      <div className="flex justify-between items-center mb-4">
        <p className=" top-2 left-4 text-gray-700 font-semibold">
          Q {currentQuestion + 1} / {quizData.length}
        </p>
        <p
          className={`text-lg font-semibold ${
            timeLeft < 10 ? "text-red-500" : "text-gray-600"
          }`}
        >
          Time Left: {timeLeft}s
        </p>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        {quizData[currentQuestion].question}
      </h2>

      <div className="mb-4">
        {quizData[currentQuestion].options.length > 0 ? (
          quizData[currentQuestion].options.map((option) => (
            <button
              key={option}
              className={`w-full px-4 py-2 mb-2 text-white rounded cursor-pointer ${
                selectedAnswer === option ||
                (showCorrectAnswer &&
                  option === quizData[currentQuestion].answer)
                  ? option === quizData[currentQuestion].answer
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null || showCorrectAnswer}
            >
              {option}
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <input
              type="text"
              placeholder="Type your answer here"
              className="border p-2 rounded w-full"
              onChange={(e) => setTextAnswer(e.target.value)}
              value={textAnswer}
              disabled={selectedAnswer !== null}
            />
            {!showCorrectAnswer && (
              <button
                className={`px-4 py-2 rounded w-full mt-2 ${
                  showCorrectAnswer
                    ? textAnswer.trim().toLowerCase() ===
                      quizData[currentQuestion].answer.toLowerCase()
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={handleTextAnswerSubmit}
                disabled={textAnswer.trim() === ""}
              >
                {showCorrectAnswer
                  ? textAnswer.trim().toLowerCase() ===
                    quizData[currentQuestion].answer.toLowerCase()
                    ? "✅ Correct!"
                    : "❌ Wrong Answer"
                  : "Submit"}
              </button>
            )}
          </div>
        )}
      </div>
      <p className="text-lg font-semibold text-gray-700 mb-2">{feedback}</p>
      <button
        className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNextQuestion}
        disabled={!selectedAnswer && !showCorrectAnswer}
      >
        Next
      </button>
    </div>
  );
};

export default Quiz;
