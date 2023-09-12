import * as Notifications from 'expo-notifications';

// First, set the handler that will cause the notification
// to show the alert

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

// Second, call the method

export async function playNotification(title: string) {
    Notifications.scheduleNotificationAsync({
        content: {
            title,
            body: `Clique para acessar o Player.`,
            priority: "HIGH",
        },
        trigger: { seconds: 2 },
    });
}
