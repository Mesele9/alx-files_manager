#!/usr/bin/node

const sha1 = require('sha1');

export const pwdHashed = (pwd) => sha1(pwd);
