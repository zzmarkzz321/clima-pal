// Temp file for utils until a better grouping for them forms.

/**
 * Default fields for new Documents in DB
 */
export function generateDefaultDocFields() {
	return {
		createdAt: new Date(),
		updatedAt: new Date(),
	};
}
