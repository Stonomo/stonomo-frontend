export interface searchFields {
	searchName: string;
	searchPhone: string;
	searchEmail: string;
}

export interface evictionCardFields {
	_id: string;
	evictedOn: string;
	user: {
		facilityAddress: {
			city: string;
			state: string;
		}
	}
	nameMatches: boolean;
	phoneMatches: boolean;
	emailMatches: boolean;
}

export interface evictionPageFields {
	_id: string;
	tenantName: string;
	tenantPhone: string;
	tenantEmail: string;
	evictedOn: string;
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
		createdAt: string;
	}]
}

export interface profileFields {
	facilityName: string;
	facilityPhone: string;
	facilityEmail: string;
	facilityAddress: {
		street1: string;
		street2: string;
		street3: string;
		city: string;
		state: string;
		zip: string;
	}
}

export interface settingsFields {
	username: string;
}

export interface reasonFields {
	label: string;
	desc: string;
}