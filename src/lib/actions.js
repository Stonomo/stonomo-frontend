import { redirect } from "react-router"
import {
	createConfirmEviction,
	createEviction,
	modifyEviction
} from "../routes/evictions"
import { createSearchParams } from "react-router-dom";

export async function searchAction({ request }) {
	const formData = await request.formData();
	const params = {
		searchName: formData.get('searchName'),
		searchPhone: formData.get('searchPhone'),
		searchEmail: formData.get('searchEmail')
	}
	return redirect(`results?${createSearchParams(params)}`)
}

export async function searchManageAction({ request }) {
	const formData = await request.formData();
	const params = {
		searchName: formData.get('searchName'),
		searchPhone: formData.get('searchPhone'),
		searchEmail: formData.get('searchEmail')
	}
	return redirect(`results?${createSearchParams(params)}`)
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