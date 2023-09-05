import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis Error: ${error}`);
    });
  }

  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  async get(key) {
    const keyGet = promisify(this.client.get).bind(this.client);
    const value = await keyGet(key);
    return value;
  }

  async set(key, value, duration) {
    const keySet = promisify(this.client.set).bind(this.client);
    await keySet(key, value, 'EX', duration);
  }

  async del(key) {
    const keyDel = promisify(this.client.del).bind(this.client);
    await keyDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
