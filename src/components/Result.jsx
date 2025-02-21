import PropTypes from "prop-types";
const Result = ({ handleRestartQuiz, score, quizData, quizHistory }) => {
  const getPerformanceMessage = () => {
    if (score >= 8) return "Excellent! 🌟";
    if (score === 7) return "Good! 👍";
    if (score === 6) return "Average! 😐";
    return "Needs Improvement! 📚";
  };
  const lastScore =
    quizHistory.length > 0 ? quizHistory[quizHistory.length - 2].score : "N/A";
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Quiz Completed!
        </h2>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Your Score: {score} / {quizData.length}
        </p>
        <p className="text-lg font-semibold text-gray-700 mb-2">
          Previous Score: {lastScore} / {quizData.length}
        </p>
        <p className="text-xl font-bold text-gray-900 mb-4">
          {getPerformanceMessage()}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 cursor-pointer"
          onClick={handleRestartQuiz}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  );
};
Result.propTypes = {
  handleRestartQuiz: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  quizData: PropTypes.array.isRequired,
  quizHistory: PropTypes.arrayOf(
    PropTypes.shape({
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Result;
