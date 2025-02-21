import PropTypes from "prop-types";
const Result = ({ handleRestartQuiz, score, quizData, quizHistory }) => {
  const getPerformanceMessage = () => {
    if (score >= 8) return "Excellent! 🌟";
    if (score === 7) return "Good! 👍";
    if (score === 6) return "Average! 😐";
    return "Needs Improvement! 📚";
  };
  // const lastScore =
  //   quizHistory.length > 0 ? quizHistory[quizHistory.length - 1].score : "N/A";
  const lastThreeScores = [
    quizHistory.length > 2 ? quizHistory[quizHistory.length - 3].score : "N/A",
    quizHistory.length > 1 ? quizHistory[quizHistory.length - 2].score : "N/A",
    quizHistory.length > 0 ? quizHistory[quizHistory.length - 1].score : "N/A",
  ];
  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Quiz Completed!
        </h2>
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700">
            Your Score:{" "}
            <span className="text-blue-600 text-xl font-bold">{score}</span> /{" "}
            {quizData.length}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Last 3 Scores</h3>
          <div className="flex justify-center gap-3 mt-2">
            {lastThreeScores.map((s, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-white font-bold ${
                  s === "N/A" ? "bg-gray-400" : "bg-blue-600"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
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
