import { ApiService } from './ApiService';
import NotificationObject from '../model/NotificationObject';

export default class NotificationService {
  private apiService = new ApiService();

  public async sendNotification(
    notificationObject: NotificationObject
  ): Promise<boolean> {
    const query: string = `
        mutation { 
           sendPushNotifications(
              tokens:${notificationObject.tokens}
              title:${notificationObject.title}
              message:${notificationObject.message}
              topic:${notificationObject.topic}
              pushIconUrl:${notificationObject.pushIconUrl}
              sound:${notificationObject.sound}
              androidNotificationChannel:${notificationObject.androidNotificationChannel}
              androidNotificationColor:${notificationObject.androidColor}
              androidImageUrl:${notificationObject.androidImageUrl}
           ) {
                response
                errors {
                    message
                }
            }
        }
      `;

    const response = await this.apiService.authenticatedGqlQuery(query);

    if (
      response.sendPushNotifications.response === null ||
      response.sendPushNotifications.errors.length > 0
    ) {
      throw response.sendPushNotifications.errors;
    }

    const result: boolean = response.sendPushNotifications.response;

    return result;
  }
}
