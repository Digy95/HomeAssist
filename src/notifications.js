import PushNotification from 'react-native-push-notification'

export default class Notification {
	constructor(onNotification) {
	this.configure(onNotification);
	this.state = {
	  db: require("../dbIp.json"),
	  data: []
	}
 }

	configure(onNotification) {
		PushNotification.configure({
		  onNotification: onNotification,
		  popInitialNotification: true,
		});
 }

	sendNotif(localEvent) {
		if (localEvent == "On") {
			this.localNotif();
		} else {
			fetch("http://" + this.state.db.ip + "/_db/HomeAssist/CRUD_d/device", {
				method: "GET",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
			})
			.then((response) => response.json())
			.then((data) => {
				var counter = 0;
				for (var i = 0; i < Object.keys(data).length; i++) {
					if (data[i].buttonColor == "green") {
						counter++;
						if (counter == Object.keys(data).length) {
							this.localNotif();
						}
					}
				}
			})
		}
	}

	localNotif() {
		PushNotification.localNotification({
			id: "1",
		  title: "ELIAS",
		  autoCancel: true,
		  largeIcon: "ic_launcher",
		  smallIcon: "ic_notification",
		  color: "red",
		  vibrate: true,
		  vibration: 300,
		  ongoing: false,
		  message: "All devices are currently on, consider turning some off to conserve electricity",
		  playSound: true,
		  soundName: 'default',
		  actions: '',
 	})
 }
}
