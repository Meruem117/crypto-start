<template>
  <div>
    <el-row type="flex" justify="center">
      <h2>Crypto</h2>
    </el-row>
    <el-row type="flex" justify="center">
      <div>
        <h4>密钥：{{ key }}</h4>
        <h4>原文：{{ message }}</h4>
        <h4>密文：{{ encryptStr }}</h4>
        <h4>解密结果：{{ decryptStr }}</h4>
      </div>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button round type="primary" @click="handleAESEncrypt">AES加密</el-button>
      <el-button round type="primary" @click="handleAESDecrypt">AES解密</el-button>
    </el-row>
    <el-row type="flex" justify="center">
      <el-button round type="primary" @click="handleSM4Encrypt">SM4加密</el-button>
      <el-button round type="primary" @click="handleSM4Decrypt">SM4解密</el-button>
    </el-row>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import { SM4 } from 'gm-crypto'

export default {
  name: 'home',
  data() {
    return {
      message: 'test',
      key: "35acc44114da249c",
      encryptStr: '',
      decryptStr: '',
    }
  },
  methods: {
    // AES加密
    handleAESEncrypt() {
      this.decryptStr = ''
      this.encryptStr = CryptoJS.AES.encrypt(this.utf8Parse(this.message), this.utf8Parse(this.key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
    },
    // AES解密
    handleAESDecrypt() {
      let bytes = CryptoJS.AES.decrypt(this.encryptStr, this.utf8Parse(this.key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      this.decryptStr = bytes.toString(CryptoJS.enc.Utf8)
    },
    // SM4加密
    handleSM4Encrypt() {
      this.decryptStr = ''
      this.encryptStr = SM4.encrypt(this.message, this.stringToHex(this.key), {
        inputEncoding: 'utf8',
        outputEncoding: 'base64'
      })
    },
    // SM4解密
    handleSM4Decrypt() {
      this.decryptStr = SM4.decrypt(this.encryptStr, this.stringToHex(this.key), {
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

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;
}
</style>
