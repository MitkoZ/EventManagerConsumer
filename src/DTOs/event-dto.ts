export class EventDTO {
    public id: Number;
    public name: string;
    public location: string;
    public startDateTime: string;
    public endDateTime: string;

    constructor(object: Object) {
        Object.assign(this, object);
        let that = this;
        that.startDateTime = new Date(that.startDateTime[0]).toUTCString();
        that.endDateTime = new Date(that.endDateTime[0]).toUTCString();
    }
}
