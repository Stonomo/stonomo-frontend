import { redirect } from "react-router"
import {
	createConfirmEviction,
	createEviction,
	modifyEviction
} from "../routes/evictions.js"

export async function searchAction({ request }) {
	const formData = await request.formData();
	const searchName = formData.get('searchName')
	const searchPhone = formData.get('searchPhone')
	const searchEmail = formData.get('searchEmail')
	return redirect(`results/${searchName}/${searchPhone}/${searchEmail}`)
}

export async function reportAction({ request }) {
	const formData = await request.formData()
	const confirmDocId = await createConfirmEviction(
		formData.get('tenantName'),
		formData.get('tenantPhone'),
		formData.get('tenantEmail'),
		formData.get('evictedOn'),
		formData.get('reason'),
		formData.get('details'),
		formData.get('user')
	)
	return redirect(`/dashboard/confirm/${confirmDocId}`)
}

export async function confirmAction({ request }) {
	const formData = await request.formData()
	const docId = await createEviction(
		formData.get('tenantName'),
		formData.get('tenantPhone'),
		formData.get('tenantEmail'),
		formData.get('evictedOn'),
		formData.get('reason'),
		formData.get('details'),
		formData.get('user')
	)
	return redirect(`/dashboard/manage/${docId}`)
}

export async function evictionAction({ request }) {
	const formData = await request.formData()
	const id = formData.get('id')
	const details = formData.get('details')
	return await modifyEviction(id, details)
}