import { expect } from 'chai';
import redisClient from '../../utils/redis';

describe('+ RedisClient utility', () => {
  before(function (done) {
    this.timeout(10000);
    setTimeout(done, 4000);
  });

  it('+ Client is alive', () => {
    expect(redisClient.isAlive()).to.equal(true);
  });

  it('+ Set and Get a value', async function () {
    await redisClient.set('mesy', 222, 10);
    expect(await redisClient.get('mesy')).to.equal('222');
  });

  it('+ Set and Get expired value', async function () {
    await redisClient.set('mesy', 222, 1);
    setTimeout(async () => {
      expect(await redisClient.get('mesy')).to.not.equal('222');
    }, 2000);
  });

  it('+ Set and get deleted value', async function () {
    await redisClient.set('mesy', 333, 10);
    await redisClient.del('mesy');
    setTimeout(async () => {
      console.log('del: mesy ->', await redisClient.get('mesy'));
      expect(await redisClient.get('mesy')).to.be.null;
    }, 2000);
  });
});
