#!/usr/bin/node

const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    this.Url = `mongodb://${this.host}:${this.port}/${this.database}`;
    this.connected = false;
    this.client = new MongoClient(this.Url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((err) => console.log(err));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    await this.client.connect();
    const users = await this.client.db(this.database).collection('users').countDocuments();
    return users;
  }

  async nbFiles() {
    await this.client.connect();
    const users = await this.client.db(this.database).collection('files').countDocuments();
    return users;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
