export class LoginDTO {
    public username: string;
    public password: string;

    public constructor(object: Object) {
        Object.assign(this, object);
    }
}
