export class RegisterDTO {
    public username: string;
    public password: string;
    public confirmPassword: string;

    public constructor(object: Object) {
        Object.assign(this, object);
    }
}
