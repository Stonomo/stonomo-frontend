import { LoaderFunctionArgs } from 'react-router';
import {
	getConfirmEviction,
	getEviction,
	searchEvictions,
	searchManageEvictions
} from '../routes/evictions.js';
import { getReasons } from '../routes/reasons.js'
import { getProfile, getSettings, getUser } from '../routes/users.js';
import { searchFields } from './types.js';

export async function searchLoader({ params }: { params: searchFields }) {
	return {
		searchName: params.searchName,
		searchPhone: params.searchPhone,
		searchEmail: params.searchEmail
	}
}

export async function resultsLoader({ request }: { request: Request }) {
	const url = new URL(request.url);
	const searchParams = url.searchParams
	return await searchEvictions(
		searchParams.get('searchName') || '',
		searchParams.get('searchPhone'),
		searchParams.get('searchEmail')
	)
}

export async function manageResultsLoader({ request }: { request: Request }) {
	const url = new URL(request.url);
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

export async function confirmLoader({ params }: { params: LoaderFunctionArgs & { confirmId: string } }) {
	return await getConfirmEviction(params.confirmId)
}

export async function profileLoader() {
	return await getProfile()
}

export async function userLoader({ params }: { params: { userId: string } }) {
	return await getUser(params.userId)
}

export async function evictionLoader({ params }: { params: { evictionId: string } }) {
	return await getEviction(params.evictionId)
}

export async function settingsLoader() {
	return await getSettings()
}