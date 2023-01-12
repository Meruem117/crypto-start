<template>
  <div class="home">
    <h4>AES密钥:{{ aeskey }}</h4>
    <h4>原文:{{ message }}</h4>
    <h4>密文:{{ encryptStr }}</h4>
    <h4>解密结果:{{ decryptStr }}</h4>
    <div>
      <h2>对称加解密</h2>
      <el-button round type="primary" @click="handleAESEncrypt()"> AES加密 </el-button>
      <el-button round type="primary" @click="handleAESDecrypt()"> AES解密 </el-button>
    </div>
    <div>
      <h2>对称加解密</h2>
      <el-button round type="primary" @click="handleSM4Encrypt()"> SM4加密 </el-button>
      <el-button round type="primary" @click="handleSM4Decrypt()"> SM4解密 </el-button>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { SM4 } from 'gm-crypto'

export default {
  name: 'home',
  data() {
    return {
      message: "测试源代码abcd",
      aeskey: "35acc44114da249c",//密钥
      sm4key: '0123456789abcdeffedcba9876543210',
      encryptStr: "",//加密
      decryptStr: "", //解密
    }
  },
  created() {
    // this.aeskey = CryptoJS.AES.getKey();
  },
  methods: {
    // AES加密
    handleAESEncrypt() {
      // debugger
      console.log(CryptoJS.mode, 'CryptoJS99999');
      console.log(CryptoJS.pad, 'CryptoJS6666');
      this.decryptStr = '';
      this.encryptStr = CryptoJS.AES.encrypt(this.utf8Parse(this.message), this.utf8Parse(this.aeskey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
    },
    // AES解密
    handleAESDecrypt() {
      let bytes = CryptoJS.AES.decrypt(this.encryptStr, this.utf8Parse(this.aeskey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      this.decryptStr = bytes.toString(CryptoJS.enc.Utf8);
    },
    // SM4加密
    handleSM4Encrypt() {
      this.decryptStr = '';
      this.encryptStr = SM4.encrypt(this.message, this.stringToHex(this.aeskey), {
        inputEncoding: 'utf8',
        outputEncoding: 'base64'
      })
    },
    // SM4解密
    handleSM4Decrypt() {
      this.decryptStr = SM4.decrypt(this.encryptStr, this.stringToHex(this.aeskey), {
        inputEncoding: 'base64',
        outputEncoding: 'utf8'
      })
    },
    utf8Parse(str) {
      if (!str) return
      return CryptoJS.enc.Utf8.parse(str)
    },
    stringToHex(str) {
      let val = ''
      for (let i = 0; i < str.length; i++) {
        val += str.charCodeAt(i).toString(16)
      }
      return val
    }
  },
}
</script>
