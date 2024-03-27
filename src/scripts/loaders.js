import { useSearchParams } from 'react-router-dom';
import {
	getConfirmEviction,
	getEviction,
	getEvictionsByUser,
	searchEvictions,
	searchManageEvictions
} from '../routes/evictions.js';
import { getReasons } from '../routes/reasons.js'
import { getProfile, getUser } from '../routes/users.js';

export async function searchLoader({ params }) {
	return {
		searchName: params.searchName,
		searchPhone: params.searchPhone,
		searchEmail: params.searchEmail
	}
}

export async function resultsLoader({ request }) {
	const url = new URL(request.url);
	const params = url.searchParams
	return await searchEvictions(
		params.get('searchName'),
		params.get('searchPhone'),
		params.get('searchEmail')
	)
}

export async function manageLoader() {
	return await getEvictionsByUser()
}

export async function manageResultsLoader({ request }) {
	const url = new URL(request.url);
	const params = url.searchParams
	return await searchManageEvictions(
		params.get('searchName'),
		params.get('searchPhone'),
		params.get('searchEmail')
	)
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
	return await getUser(params.userId)
}

export async function evictionLoader({ params }) {
	return await getEviction(params.evictionId)
}