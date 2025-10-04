function calculateScore(arr, correctOptions) {

//flattened the ansArr
  const answersMap = arr.reduce((acc, obj) => {
  return { ...acc, ...obj };
}, {});

let correctCount = 0;

for (const { _id, correctOption } of correctOptions) {
  const qid = String(_id); 
  if (answersMap[qid] === correctOption) {
    correctCount++;
  }
}
return correctCount;
}
module.exports = {calculateScore}
