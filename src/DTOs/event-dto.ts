export class EventDTO {
    public id: Number;
    public name: string;
    public location: string;
    public startDateTime: Date;
    public endDateTime: Date;

    constructor(object: Object) {
        Object.assign(this, object);
    }
}
