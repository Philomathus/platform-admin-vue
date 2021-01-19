import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDA83yzDf+ZEU7fAgOQe2rmyimndA+F8HB36i9rvssQifyBNuhxzYO2Zlmwmg/ihTgVdki2m8Lkb5EfNoc50E2/Jr8RF1+y3s0qUXFsTq6cTx/q0g9OM+PQDB5MCPuQBDc6jAC0UkaSSefDYYKC4ISLoI+wd/hf8NvuXHyW8UigPwIDAQAB'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

