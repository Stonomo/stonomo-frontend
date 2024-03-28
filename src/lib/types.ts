export interface searchFields {
	searchName: string;
	searchPhone: string;
	searchEmail: string;
}

export interface evictionCardFields {
	_id: string;
	tenantName: string;
	user: {
		_id: string;
		facilityName: string;
		facilityAddress: {
			city: string;
			state: string;
		}
	}
	reason: {
		desc: string
	}
}

export interface evictionPageFields {
	_id: string;
	tenantName: string;
	tenantPhone: string;
	tenantEmail: string;
	user: {
		_id: string;
		facilityName: string;
		facilityAddress: {
			city: string;
			state: string;
		}
	}
	reason: {
		desc: string
	}
	details: [{
		_id: string;
		content: string;
	}]
}