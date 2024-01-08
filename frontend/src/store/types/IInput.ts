export interface IInput {
	label: string
	type: string
	placeholder: string
	name: string
	value?: string
	required: boolean
	touched?: boolean
	rows?: number
}