import crypto from 'crypto'

const generateLicenseKey = async (length: number, pairs: number = 4) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const charactersLength = characters.length

  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(crypto.randomInt(0, charactersLength))
  }
  return (result.match(new RegExp(`.{1,${pairs}}`, 'g')) || []).join('-')
}

export default generateLicenseKey
