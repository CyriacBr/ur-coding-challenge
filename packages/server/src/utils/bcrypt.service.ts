import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BCryptService {
  crypt(clear: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err: null | any, salt) => {
        if (err) {
          return reject(err);
        }
        bcrypt.hash(clear, salt, (err2: null | any, hash) => {
          if (err2) {
            return reject(err2);
          }
          resolve(hash);
        });
      });
    });
  }

  compare(clear: string, hash: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(clear, hash, (err: null | any, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }
}
