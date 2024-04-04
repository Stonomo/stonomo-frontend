import { redirect } from "react-router"
import {
	createConfirmEviction,
	createEviction,
	modifyEviction
} from "../routes/evictions"
import { URLSearchParamsInit, createSearchParams } from "react-router-dom";

export async function searchAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const params: URLSearchParamsInit = {
		searchName: formData.get('searchName') as string,
		searchPhone: formData.get('searchPhone') as string,
		searchEmail: formData.get('searchEmail') as string
	}
	return redirect(`results?${createSearchParams(params)}`)
}

export async function searchManageAction({ request }: { request: Request }) {
	const formData = await request.formData();
	const params = new URLSearchParams({
		searchName: formData.get('searchName') as string,
		searchPhone: formData.get('searchPhone') as string,
		searchEmail: formData.get('searchEmail') as string
	})
	return redirect(`results?${createSearchParams(params)}`)
}

export async function reportAction({ request }: { request: Request }) {
	const formData = await request.formData()
	const confirmDocId = await createConfirmEviction(
		formData.get('tenantName') as string,
		formData.get('tenantPhone') as string,
		formData.get('tenantEmail') as string,
		formData.get('evictedOn') as string,
		formData.get('reason') as string,
		formData.get('details') as string
	)
	return redirect(`/dashboard/confirm/${confirmDocId}`)
}

export async function confirmAction({ request }: { request: Request }) {
	const formData = await request.formData()
	const confirmId = formData.get('confirmId')?.toString() || ''
	const docId = await createEviction(confirmId)
	return redirect(`/dashboard/eviction/${docId}?m=edit`)
}

export async function evictionAction({ request }: { request: Request }) {
	const formData = await request.formData()
	const id = formData.get('id') as string
	const details = formData.get('details') as string
	return await modifyEviction(id, details)
}