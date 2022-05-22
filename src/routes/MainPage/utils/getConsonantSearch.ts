import { escapeRegExp } from 'lodash'
import { IDiseaseItem } from 'types/disease'

const OFFSET = 44032

const con2syl = {
  ㄱ: '가'.charCodeAt(0),
  ㄲ: '까'.charCodeAt(0),
  ㄴ: '나'.charCodeAt(0),
  ㄷ: '다'.charCodeAt(0),
  ㄸ: '따'.charCodeAt(0),
  ㄹ: '라'.charCodeAt(0),
  ㅁ: '마'.charCodeAt(0),
  ㅂ: '바'.charCodeAt(0),
  ㅃ: '빠'.charCodeAt(0),
  ㅅ: '사'.charCodeAt(0),
}

function ch2pattern(ch: string) {
  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - OFFSET

    if (chCode % 28 > 0) {
      return ch
    }

    const begin = Math.floor(chCode / 28) * 28 + OFFSET
    const end = begin + 27

    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }

  if (/[ㄱ-ㅎ]/.test(ch)) {
    const begin = con2syl[ch as keyof typeof con2syl] || (ch.charCodeAt(0) - 12613) * 588 + con2syl['ㅅ']
    const end = begin + 587

    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`
  }
  return escapeRegExp(ch)
}

function createFuzzyMatcher(input: string) {
  const pattern = input
    .split('')
    .map(ch2pattern)
    .map((tempPattern) => `(${tempPattern})`)
    .join('.*?')

  return new RegExp(pattern)
}

const getConsonantSearch = (searchConsonant: string, allDiseaseData: IDiseaseItem[]): IDiseaseItem[] => {
  const regex = createFuzzyMatcher(searchConsonant)

  const filteredData = allDiseaseData
    .filter((row) => {
      return regex.test(row.sickNm)
    })
    .map((row) => {
      let longestDistance = 0

      row.sickNm.replace(regex, (match, ...groups) => {
        const letters = groups.slice(0, searchConsonant.length)
        let lastIndex = 0

        for (let i = 0, l = letters.length; i < l; i += 1) {
          const idx = match.indexOf(letters[i], lastIndex)
          if (lastIndex > 0) {
            longestDistance = Math.max(longestDistance, idx - lastIndex)
          }
          lastIndex = idx + 1
        }

        return row.sickNm
      })

      return { row, longestDistance }
    })
    .sort((a, b) => {
      return a.longestDistance - b.longestDistance
    })
    .slice(1, 10)
    .map((value) => value.row)

  return filteredData
}

export { ch2pattern, getConsonantSearch, createFuzzyMatcher }
