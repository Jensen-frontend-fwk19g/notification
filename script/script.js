// Kan köras direkt eftersom den inte använder DOM
if( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('sw.js')
    .then(reg => {
        console.log('Service worker registered.');
    })
}

// Kod som använder DOM måste vänta
window.addEventListener('load', () => {
    let notificationPermission = false;

    const askPermissionButton = document.querySelector('#askPermissionButton');
    askPermissionButton.addEventListener('click', async () => {
        const answer = await Notification.requestPermission();
        if( answer == 'granted' ) {
            notificationPermission = true;
            console.log('Notification: permission GRANTED, user allowed notifications');
        } else if( answer == 'denied' ) {
            console.log('Notification: user denied notifications');
        } else {  // answer == 'default'
            console.log('Notification: user declined to answer');
        }
    })


    showNotificationButton.addEventListener('click', () => {
        if( !notificationPermission ) {
            console.log('We do not have permission to show notification');
            return;
        }

        const options = {
            body: "It's time to study!",
            icon: '../img/icon-512.png'
        }
        let notif = new Notification('Reminder', options);
        navigator.serviceWorker.ready.then(reg => reg.showNotification('Reminder 2', options));
        notif.addEventListener('show', () => {
            console.log('Showing notification');
        })
        notif.addEventListener('click', () => {
            console.log('User clicked on notification');
        })
    })


    const alarmButton = document.querySelector('#alarmButton');
    alarmButton.addEventListener('click', () => {
        const p = document.querySelector('.alarm-status');
        p.innerHTML = `The alarm is ON!!`;
        p.classList.add('alarm');
        // p.className = 'alarm';  // ingen skillnad så länge vi bara har en CSS-klass
        const options = {
            body: "It's time! Touch to stop alarm.",
            icon: '../img/alarm.jpg'
        }
        let notif = new Notification('Alarm', options);
        notif.addEventListener('show', event => {
            console.log('Notification should be showing now');
        })
        notif.addEventListener('click', event => {
            p.innerHTML = `The alarm is off.`
            p.classList.remove('alarm');
        })
        notif.addEventListener('close', event => {
            console.log('User closed notification without stopping the alarm.');
        })
    })

    /*
    2a Lägg till en button med texten "Turn on the alarm". När användaren klickar på knappen ska du visa en text som säger att alarmet är igång. Appen ska också visa en notifiering om att alarmet är igång. När man klickar/touchar notifieringen ska alarmet stängas av.
    2b Knappen ska byta text till "Turn off the alarm". Om man klickar igen ska alarmet stängas av.

    */
})
