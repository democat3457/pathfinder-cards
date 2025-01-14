import { czechKeywords, czechNumericKeywords, keywords, numericKeywords } from '@/data/keyWords'
import { Hr, Paragraph } from '@/styles/commonStyledComponents'
import { actionIcons, createActionIcon } from './createActionIcon'

export default function renderEnrichedText(text: string, cardWidth?: number) {
	const boldRegex = /^\*\*(.+)\*\*$/
	const italicRegex = /^\*(.+)\*$/
	const emphasizeWords = (paragraph: string) => {
		const words = paragraph.split(' ')
		const actionIndex = words.findIndex((word) =>
			Object.keys(actionIcons).includes(word),
		)

		return words.map((word, index) => {
			let bolded = (
				index < actionIndex ||
				keywords.includes(word) || (
					// Numeric keywords should only be emphesized when used
					// together with a number
					// TODO Bulk should be emphasized also when followed by "L"
					numericKeywords.includes(word ) &&
					!isNaN(Number(words[index + 1]))
				) || (
					czechKeywords.includes(word)
				) || (
					czechNumericKeywords.includes(word ) &&
					!isNaN(Number(words[index + 1]))
				)
			)
			let italicized = false;
			if (boldRegex.test(word)) {
				bolded = true
				word = word.replace(boldRegex, '$1')
			}
			if (italicRegex.test(word)) {
				italicized = true
				word = word.replace(italicRegex, '$1')
			}
			const icon = createActionIcon(word, 10, index)
			if (icon) return icon
			let element = word
			if (bolded) element = <b>{element}</b>
			if (italicized) element = <i>{element}</i>
			return (
				<span key={index}>{element} </span>
			)
		})
	}


	const createParagrahps = () => {
		const paragraphs = text.split('\n')

		return paragraphs.map((paragraph, index) => {
			return paragraph === '-' && index < paragraphs.length ? (
				<Hr key={index} />
			) : (
				<Paragraph key={index}>{emphasizeWords(paragraph)}</Paragraph>
			)
		})
	}

	const paragraphs = createParagrahps()

	return <>{paragraphs}</>
}
