const sinon = require("sinon");
// require = require("esm")(module);
const chai = require("chai");
const { assert } = require("chai");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const jwt = require("jsonwebtoken");
const { UserModel } = require("../src/users/users.model");
const { authorize } = require("../src/helpers/authorize");
const { Unauthorized } = require("../src/helpers/errors/Unauthorized.error");

describe("Authorize unit tests suite", () => {
  context("when no auth header provided", () => {
    let sandbox;
    let findByIdStub;
    let res, next;
    const req = { headers: {} };

    before(async () => {
      sandbox = sinon.createSandbox();
      res = { status: sandbox.stub(), send: sandbox.stub() };
      res.status.returns(res);
      next = sandbox.stub();
      findByIdStub = sandbox.stub(UserModel, "findById");
      await authorize(req, res, next);
    });
    after(() => {
      sandbox.restore();
    });
    it("should call res.status once", () => {
      sinon.assert.calledOnce(res.status);
      sinon.assert.calledWithExactly(res.status, 401);
    });
    it("should call res.send once", () => {
      sinon.assert.calledOnce(res.send);
    });
    it("should not call UserModel.findById", () => {
      sinon.assert.notCalled(UserModel.findById);
    });

    it("should not call next", () => {
      sinon.assert.notCalled(next);
    });
  });
  //});
  // context("when token verification fails", () => {
  //   const req = { headers: {} };
  //   before(async () => {
  //     await authorize(req, null, nextStub);
  //   });
  //   after(() => {
  //     sandbox.reset();
  //   });
  //   it("should not call findById", () => {
  //     sinon.assert.notCalled(findByIdStub);
  //   });
  //   it("should not write to req.user", () => {
  //     assert.strictEqual(req.user, undefined);
  //   });
  //   it("should call next once", () => {
  //     sinon.assert.calledOnce(nextStub);
  //     sinon.assert.calledWithExactly(
  //       nextStub,
  //       sinon.match.instanceOf(Unauthorized)
  //     );
  //   });
});
//////////======================
//   context("when jwt token is invalid", () => {
//     const req = { headers: { authorization: "" } };
//     let token = "";
//     let res, sandbox, next;

//     before(async () => {
//       sandbox = sinon.createSandbox();
//       res = { status: sandbox.stub(), send: sandbox.stub() };
//       res.status.returns(res);
//       next = sandbox.stub();
//       findByIdStub = sandbox.stub(UserModel, "findById");
//       await authorize(req, res, next);
//     });
//     after(() => {
//       sandbox.restore();
//     });
//     it("should call res.status once", () => {
//       sinon.assert.calledOnce(res.status);
//       sinon.assert.calledWithExactly(res.status, 401);
//     });

//     it("should call res.send once", () => {
//       sinon.assert.calledOnce(res.send);
//     });

//     it("should not call UserModel.findById", () => {
//       sinon.assert.notCalled(UserModel.findById);
//     });

//     it("should not call next", () => {
//       sinon.assert.notCalled(next);
//     });
//   });
//   context("when everything is ok", () => {
//     let sandbox, res, next, findByIdStub;
//     const userId = "user_id";
//     const user = { id: "user_id_from_db" };
//     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
//     const req = { headers: { authorization: `Bearer ${token}` } };

//     before(async () => {
//       sandbox = sinon.createSandbox();
//       res = { status: sandbox.stub(), send: sandbox.stub() };
//       res.status.returns(res);
//       next = sandbox.stub();
//       findByIdStub = sandbox.stub(UserModel, "findById");
//       findByIdStub.resolves(user);
//       await authorize(req, res, next);
//     });

//     after(() => {
//       sandbox.restore();
//     });

//     it("should not call res.status", () => {
//       sinon.assert.notCalled(res.status);
//     });

//     it("should not call res.send", () => {
//       sinon.assert.notCalled(res.send);
//     });

//     it("should call findById once", () => {
//       sinon.assert.calledOnce(UserModel.findById);
//       sinon.assert.calledWithExactly(UserModel.findById, userId);
//     });

//     it("should pass user to req object", () => {
//       chai.assert.equal(req.user, user);
//     });

//     it("should call next once", () => {
//       sinon.assert.calledOnce(next);
//       sinon.assert.calledWithExactly(next);
//     });
//   });
// });
//============================!!!!!!!!!
// context("when corresponding user found", () => {
//   const req = {
//     cookies: { token: "test_token" },
//   };
//   const user = { id: "user_id" };

//   before(async () => {
//     findByIdStub.resolves(user);

//     await authorize(req, null, nextStub);
//   });

//   after(() => {
//     sandbox.reset();
//   });

//   it("should call findById once", () => {
//     sinon.assert.calledOnce(findByIdStub);
//     sinon.assert.calledWithExactly(findByIdStub, req.cookies.token);
//   });

// it("should write to req.user", () => {
//   assert.strictEqual(req.user, user);
// });

// it("should call next once", () => {
//   sinon.assert.calledOnce(nextStub);
//   sinon.assert.calledWithExactly(nextStub);
// });
//     });
//   });
// });
// exports.authorize = async (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     const payload = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await UserModel.findById(payload.userId);
//     if (!user) throw new Unauthorized();
//     req.user = user;
//     next();
//   } catch (err) {
//     next(new Unauthorized("Token is not valid"));
//   }
// };
