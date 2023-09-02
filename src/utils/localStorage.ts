export const projectPrefix = 'rpgCards_project_'
const currentProjectNameKey = 'rpgCards_currentProject'

export function saveProjectToLs(projectName: string, cards: CardData[]): void {
	const project: Project = {
		projectName: projectName,
		cards: cards,
	}

	try {
		const serializedData = JSON.stringify(project)
		localStorage.setItem(projectPrefix + projectName, serializedData)
		saveCurrentProjectNameToLs(projectName)
	} catch (error) {
		console.error('Error saving cards to local storage:', error)
	}
}

export function loadProjectFromLs(projectName: string): Project | undefined {
	const loadedProject = localStorage.getItem(projectPrefix + projectName)
	if (loadedProject) {
		saveCurrentProjectNameToLs(projectName)

		return JSON.parse(loadedProject)
	}

	console.error(`Project could not have been loaded from local storage with ${projectName}.`)
}

export function loadCurrentProjectNameFromLs(): string | null {
	return localStorage.getItem(currentProjectNameKey)
}

export function loadCurrentProjectFromLs(): Project | undefined {
	const currentProjectName = localStorage.getItem(currentProjectNameKey)

	if (!currentProjectName) {
		console.error('Current project name could not be retreived.')
	}

	const project = localStorage.getItem(projectPrefix + currentProjectName)

	if (project) {
		return JSON.parse(project)
	}
}

export function saveCurrentProjectNameToLs(currentProjectName: string): void {
	try {
		localStorage.setItem(currentProjectNameKey, currentProjectName)
	} catch (error) {
		console.error('Error saving current project name:', error)
	}
}
