type AppNotificationType = 'error' | 'info' | 'warn';

export interface IAppNotification {
  type: AppNotificationType;
  message: string;
}
