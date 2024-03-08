import {
	getConfirmEviction,
	getEvictionsByUser,
	searchEvictions
} from './evictions';
import { getReasons } from './reasons'
import { getProfile } from './users';

export async function searchLoader({ params }) {
	return {
		searchName: params.searchName,
		searchPhone: params.searchPhone,
		searchEmail: params.searchEmail
	}
}

export async function resultsLoader({ params }) {
	return await searchEvictions(
		params.searchName,
		params.searchPhone,
		params.searchEmail
	)
}

export async function manageLoader() {
	return await getEvictionsByUser()
}

export async function reportLoader() {
	return await getReasons()
}

export async function confirmLoader({ params }) {
	return await getConfirmEviction(params.confirmId)
}

export async function profileLoader() {
	return await getProfile()
}

export async function userLoader({ params }) {
	return await getUser(params.username)
}