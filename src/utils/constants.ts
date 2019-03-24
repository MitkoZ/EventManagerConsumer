
export class Constants {
    private static port: number = 49799;
    private static domain: string = 'http://localhost:' + Constants.port + '/api/'

    public static readonly GENERATE_TOKEN_ENDPOINT: string = Constants.domain + 'Auth/GenerateToken';
    public static readonly CREATE_EVENT_ENDPOINT: string = Constants.domain + 'Event/Create';
    public static readonly UPDATE_EVENT_ENDPOINT: string = Constants.domain + 'Event/Edit';
    public static readonly GET_MY_EVENTS_ENDPOINT: string = Constants.domain + 'Event/GetMyEvents';
    public static readonly GET_EVENT_ENDPOINT: string = Constants.domain + 'Event/Get/';
    public static readonly DELETE_EVENT_ENDPOINT: string = Constants.domain + 'Event/Delete/';
    public static readonly REGISTER_ENDPOINT: string = Constants.domain + 'Auth/Register';
}
