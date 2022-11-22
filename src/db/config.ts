
export class Config {

    config: object;

    constructor() {
        this.config = {
            port: 3000,
            host: 'api.meltlabs.tech',
            mongo: {
                host: '127.0.0.1',
                port: 27017,
                db: 'meltlabs',
            },
            mandatory_fields: {page: 1, limit: 10},
            // key value
            api_providers: {
                "magiceden": 'magiceden',
                "opensea": 'opensea',
                "smb": 'smb'
            }
        }
    }

    get(key: string) {
        return this.config[key];
    }
}