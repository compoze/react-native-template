export default class NotificationObject {
  public readonly title: string = '';
  public readonly message: string = '';
  public readonly topic: string = '';
  public readonly pushIconUrl: string = '';
  public readonly sound: string | false = false;
  public readonly androidImageUrl: string = '';
  public readonly androidColor: string = '';
  public readonly androidNotificationChannel: string = '';
  public readonly tokens: string[] = [];
  public constructor(params: Partial<NotificationObject> = {}) {
    const {
      title,
      message,
      topic = '',
      pushIconUrl = '',
      sound = false,
      androidColor = '',
      androidImageUrl = '',
      androidNotificationChannel = '',
      tokens = [],
    } = params;
    this.title = title!;
    this.message = message!;
    this.topic = topic;
    this.pushIconUrl = pushIconUrl;
    this.sound = sound;
    this.androidColor = androidColor;
    this.androidImageUrl = androidImageUrl;
    this.androidNotificationChannel = androidNotificationChannel;
    this.tokens = tokens;
  }
}
