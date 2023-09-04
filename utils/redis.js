#!usr/bin/node

const { createClient } = require('redis');
const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log('Redis Error:', err);
    });
    this.connected = false;
    this.client.on('connect', () => {
      this.connected = true;
    });
  }

  isAlive() {
    return this.connected;
  }

  async get(key) {
    const gasync = promisify(this.client.get).bind(this.client);
    const value = await gasync(key);
    return value;
  }

  async set(key, value, duration) {
    const sasync = promisify(this.client.set).bind(this.client);
    await sasync(key, value, 'EX', duration);
  }

  async del(key) {
    const dasync = promisify(this.client.del).bind(this.client);
    await dasync(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
