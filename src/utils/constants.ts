
export class Constants {
    private static port: number = 49799;
    private static domain: string = 'http://localhost:' + Constants.port + '/api/'

    public static readonly GENERATE_TOKEN_ENDPOINT: string = Constants.domain + 'Auth/GenerateToken';
}
