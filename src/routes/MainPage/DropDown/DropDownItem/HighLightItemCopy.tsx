import { getConsonant } from '../../utils/getConsonant'

interface IHighLightItemProps {
  text: string
  searchWord: string
}

const HighLightItem = ({ text, searchWord }: IHighLightItemProps) => {
  if (searchWord === '' || text === '') return text

  const searchWordPart = searchWord.split('')
  const parts = text.split('')
  // console.log('parts: ', parts)

  const markedText: (string | JSX.Element)[] = [...parts]
  searchWordPart.forEach((tempsearchWord) => {
    // console.log('초성: ', tempsearchWord)
    if (/[가-힣]/.test(tempsearchWord)) {
      parts.forEach((part, index) => {
        // console.log('음절: ', tempsearchWord, part)
        if (tempsearchWord === part) markedText[index] = <mark key={`part-${index + 1}`}>{part}</mark>
      })
    } else {
      parts.forEach((part, index) => {
        const tempPart = getConsonant(part)
        // console.log('초성: ', tempsearchWord, tempPart)
        if (tempsearchWord === tempPart) markedText[index] = <mark key={`part-${index + 1}`}>{part}</mark>
      })
    }
  })

  return markedText
}

export default HighLightItem
