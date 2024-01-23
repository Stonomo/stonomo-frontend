import { useAuth } from '../hooks/useAuth';

export function Eviction({ params }) {

	return (
		<>
			<p>{params.tenantName}</p>
			<p>{params.tenantPhone}</p>
			<p>{params.evictedOn}</p>
			<p>{params.reason.label}</p>
			<p>{params.reason.desc}</p>
			<p>{params.details}</p>

		</>);
}