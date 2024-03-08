export function maskPhoneInput(e) {
	const m = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/)
	e.target.value = !m[2] ? m[1] : '(' + m[1] + ')' + m[2] + (m[3] ? '-' + m[3] : '')
}