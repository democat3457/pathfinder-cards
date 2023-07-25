import { useState } from 'react'
import { FlexRow } from '@/styles/commonStyles'
import { OverlayWrapper } from '@/styles/commonStyledComponents'

import Input from '../Input'
import * as S from './styles'


interface Props {
	onFinished: (newProjectName: string) => void
}


export default function WelcomeScreen({ onFinished }: Props) {
	const [newProjectName, setNewProjectName] = useState<string>('')

	return (
		<OverlayWrapper>
			<S.Message>{welcomeMessage}</S.Message>
			<FlexRow>
				<Input
					label="Project name"
					value={newProjectName}
					buttonText="OK"
					onButtonClick={() => onFinished(newProjectName)}
					onChange={setNewProjectName}
				/>
			</FlexRow>
		</OverlayWrapper>
	)
}

const welcomeMessage = `Welcome to RPG card creator! You can use this page to import or create printable action cards for your spells, abilities, items - or anything else you can imagine.
\n
First you have to choose a name for your new project. Then you can either import cards in supported data format, or create them in this application.

`
