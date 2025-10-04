// tests/calculateScore.test.js
const { calculateScore } = require("../services/calculateScore");
const { ObjectId } = require("mongodb");

describe("calculateScore", () => {
  it("should return correct count when all answers match", () => {
    const qid1 = new ObjectId();
    const qid2 = new ObjectId();

    const ansArr = [
      { [qid1.toString()]: "2" },
      { [qid2.toString()]: "3" }
    ];

    const correctOptions = [
      { _id: qid1, correctOption: "2" },
      { _id: qid2, correctOption: "3" }
    ];

    const score = calculateScore(ansArr, correctOptions);
    expect(score).toBe(2);
  });

  it("should return 0 when no answers match", () => {
    const qid1 = new ObjectId();

    const ansArr = [
      { [qid1.toString()]: "1" }
    ];

    const correctOptions = [
      { _id: qid1, correctOption: "2" }
    ];

    const score = calculateScore(ansArr, correctOptions);
    expect(score).toBe(0);
  });

  it("should handle partial correctness", () => {
    const qid1 = new ObjectId();
    const qid2 = new ObjectId();

    const ansArr = [
      { [qid1.toString()]: "2" },
      { [qid2.toString()]: "5" } // wrong
    ];

    const correctOptions = [
      { _id: qid1, correctOption: "2" },
      { _id: qid2, correctOption: "3" }
    ];

    const score = calculateScore(ansArr, correctOptions);
    expect(score).toBe(1);
  });
});


const score = () => {}