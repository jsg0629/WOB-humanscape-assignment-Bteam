function getConsonant(str: string) {
  const consonant = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ]

  let result = ''

  for (let i = 0; i < str.length; i += 1) {
    const code = str.charCodeAt(i) - 44032
    if (code > -1 && code < 11172) result += consonant[Math.floor(code / 588)]
  }

  return result
}

export { getConsonant }
