const sinon = require("sinon");
// require = require("esm")(module);
const chai = require("chai");
const { assert } = require("chai");

const jwt = require("jsonwebtoken");
const { UserModel } = require("../src/users/users.model");
const { authorize } = require("../src/helpers/authorize");
const { Unauthorized } = require("../src/helpers/errors/Unauthorized.error");

describe("Authorize unit tests suite", () => {
  describe("#authorize", () => {
    let sandbox;
    let findByIdStub;
    let nextStub;

    before(() => {
      sandbox = sinon.createSandbox();
      findByIdStub = sandbox.stub(UserModel, "findById");
      nextStub = sandbox.stub();
    });
    after(() => {
      sandbox.restore();
    });

    context("when token verification fails", () => {
      const req = { headers: { authorization: "" } };
      before(async () => {
        await authorize(req, null, nextStub);
      });
      after(() => {
        sandbox.reset();
      });
      it("should not call findById", () => {
        sinon.assert.notCalled(findByIdStub);
      });
      it("should not write to req.user", () => {
        assert.strictEqual(req.user, undefined);
      });
      it("should call next once", () => {
        sinon.assert.calledOnce(nextStub);
        sinon.assert.calledWithExactly(
          nextStub,
          sinon.match.instanceOf(Unauthorized)
        );
      });
    });

    context("when corresponding user found", () => {
      const req = {
        cookies: { token: "test_token" },
      };
      const user = { id: "user_id" };

      before(async () => {
        findByIdStub.resolves(user);

        await authorize(req, null, nextStub);
      });

      after(() => {
        sandbox.reset();
      });

      it("should call findById once", () => {
        sinon.assert.calledOnce(findByIdStub);
        sinon.assert.calledWithExactly(findByIdStub, req.cookies.token);
      });

      // it("should write to req.user", () => {
      //   assert.strictEqual(req.user, user);
      // });

      // it("should call next once", () => {
      //   sinon.assert.calledOnce(nextStub);
      //   sinon.assert.calledWithExactly(nextStub);
      // });
    });
  });
});
