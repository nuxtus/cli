export class Directus {
	private login(): string {
		const directusURL = process.env.DIRECTUS_URL
		return ""
	}

	public getCollections() {
		const token = this.login()
	}
}
