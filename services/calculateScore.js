function calculateScore(arr, correctOptions) {

//flattened the ansArr
  const answersMap = arr.reduce((acc, obj) => {
  return { ...acc, ...obj };
}, {});

let correctCount = 0;
console.log("correctOptions", correctOptions )
for (const { _id, correctAnswer } of correctOptions) {
  const qid = String(_id); 
  console.log("answersMap[qid] correctOption" , answersMap[qid], correctAnswer )
  if (answersMap[qid] === correctAnswer[0]) {
    correctCount++;

  }
}
return correctCount;
}
module.exports = {calculateScore}
