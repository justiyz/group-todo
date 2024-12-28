const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Crypto = require('crypto');
const CryptoJS = require('crypto-js');

const {TODO_ACCESS_TOKEN_SECRET, TODO_BCRYPT_SALT_ROUND, } = process.env;

module.exports = {

  generateAuthToken: (user) => {
    try {
      const { id, email } = user;
      return jwt.sign({ id, email }, TODO_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    } catch (error) {
      return error;
    }
  },

    encrypt: async (data) => {
        try {
            return CryptoJS.AES.encrypt(JSON.stringify(data), TODO_ACCESS_TOKEN_SECRET).toString();
        } catch (error) {
            return error;
        }
    },

    decrypt: async (ciphertext) => {
        try {
            const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), TODO_ACCESS_TOKEN_SECRET);
            return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        } catch (error) {
            return error;
        }
    },

    generateRandomString: (size) => {
        try {
          return Crypto.randomBytes(size).toString('hex');
        } catch (error) {
          return error;
        }
    },
    
    hashData: async (data) => {
        const salt = bcrypt.genSaltSync(parseFloat(TODO_BCRYPT_SALT_ROUND));
        const hash = bcrypt.hashSync(data, salt);
        if (hash) {
          return hash;
        }
        return false;
    },
    
    compareData: (data, hash) => bcrypt.compareSync(data, hash),

    decodeToken: (token) => {
        try {
          return jwt.verify(token, TODO_ACCESS_TOKEN_SECRET);
        } catch (error) {
          return error;
        }
    },
    
    generateAdminResetPasswordToken: (admin) => {
        try {
          const { email } = admin;
          return jwt.sign({ email }, TODO_ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
        } catch (error) {
          return error;
        }
    },
    
    generateAdminAuthToken: (admin, permissions) => {
        try {
          const { admin_id, role_type } = admin;
          return jwt.sign({ admin_id, role_type, ...permissions }, TODO_ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        } catch (error) {
          return error;
        }
  },
    
  generateResetToken: (user) => {
    try {
      const { email } = user;
      return jwt.sign({ email }, TODO_ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    } catch (error) {
      return error;
    }
  },

  verifyToken: (token, secret) => {
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      return error;
    }

  },



}
