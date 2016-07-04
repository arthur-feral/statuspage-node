'use strict';

const statusPageFactory = require('../index');
let statusPage;
const APP_ID = 'catsarefunny';

describe('statusPage', () => {
  describe('missing id', () => {
    it('throw error if id missing', () => {
      assert.throws(() => {
        statusPageFactory();
      }, 'Your statuspage ID is required.');
    });

    describe('params has object', () => {
      it('throw error if id missing', () => {
        assert.throws(() => {
          statusPageFactory({
            format: 'dog',
            apiversion: 'helloKitty'
          });
        }, 'Your statuspage ID is required.');
      });
    });
  });
  describe('correct params', () => {
    before(() => {
      statusPage = statusPageFactory(APP_ID);
      sinon.spy(statusPage, 'getReport');
    });

    after(() => {
      statusPage.getReport.restore();
    });

    describe('#getReport', () => {
      describe('user didnt provide a report name', () => {
        it('uses the default report (status)', () => {
          statusPage.getReport();
          console.log(lastRequest())
          assert.isTrue(statusPage.getReport.lastCall.calledWith('status'));
        });
      });

      describe('user provide a report name', () => {

      });
    });
  });
});
