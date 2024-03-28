import {
	getConfirmEviction,
	getEviction,
	getEvictionsByUser,
	searchEvictions,
	searchManageEvictions
} from '../routes/evictions.js';
import { getReasons } from '../routes/reasons.js'
import { getProfile, getUser } from '../routes/users.js';
import { searchFields } from './types.js';

export async function searchLoader(params: searchFields) {
	return {
		searchName: params.searchName,
		searchPhone: params.searchPhone,
		searchEmail: params.searchEmail
	}
}

export async function resultsLoader(params: { request: Request }) {
	const url = new URL(params.request.url);
	const searchParams = url.searchParams
	return await searchEvictions(
		searchParams.get('searchName') || '',
		searchParams.get('searchPhone'),
		searchParams.get('searchEmail')
	)
}

export async function manageLoader() {
	return await getEvictionsByUser()
}

export async function manageResultsLoader(params: { request: Request }) {
	const url = new URL(params.request.url);
	const searchParams = url.searchParams
	return await searchManageEvictions(
		searchParams.get('searchName') || '',
		searchParams.get('searchPhone'),
		searchParams.get('searchEmail')
	)
}

export async function reportLoader() {
	return await getReasons()
}

export async function confirmLoader(params: { confirmId: string; }) {
	return await getConfirmEviction(params.confirmId)
}

export async function profileLoader() {
	return await getProfile()
}

export async function userLoader(params: { userId: string; }) {
	return await getUser(params.userId)
}

export async function evictionLoader(params: { evictionId: string; }) {
	return await getEviction(params.evictionId)
}