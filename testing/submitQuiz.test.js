// tests/submitQuiz.test.js
const { submitQuiz } = require("../controllers/submit.controller");
const { QuestionModel } = require("../models/question.model");

jest.mock("../models/question.model");

describe("submitQuiz Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        quizId: "quiz123",
        ansArr: [],
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  it("should return score and total when answers are correct", async () => {
    req.body.ansArr = [{ "507f1f77bcf86cd799439011": "2" }];

    QuestionModel.find.mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValueOnce([
          { _id: "507f1f77bcf86cd799439011", correctOption: "2" },
        ]),
    });

    await submitQuiz(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: "Quiz submitted successfully",
        result: { score: 1, total: 1 },
      })
    );
  });

  it("should return 400 if ansArr length does not match questions", async () => {
    req.body.ansArr = [];

    QuestionModel.find.mockReturnValue({
      select: jest
        .fn()
        .mockResolvedValueOnce([
          { _id: "507f1f77bcf86cd799439011", correctOption: "2" },
        ]),
    });

    await submitQuiz(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      msg: "Incorrect input, please try again",
    });
  });

  it("should handle internal server error", async () => {
    QuestionModel.find.mockReturnValue({
      select: jest.fn().mockRejectedValueOnce(new Error("DB failure")),
    });

    await submitQuiz(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      msg: "Internal Server Error",
    });
  });
});
