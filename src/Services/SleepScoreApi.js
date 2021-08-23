// SleepScoreApi

function saveScore(score) {
  return new Promise(
    (resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: score
        })
      }, 499)
    }
  )
};

export default saveScore;