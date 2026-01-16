import AgoraRTC from "agora-rtc-sdk-ng"
import { useEffect, useState } from "react";

const APP_ID = '84a475b5e6264529bce54a13cf38a2cc';
const TOKEN = '007eJxTYPAzUJBeX5GyZWpm0J0F0w9+kBLY1DtlzgTG+80XWRYfL/JSYLAwSTQxN00yTTUzMjMxNbJMSk41NUk0NE5OM7ZINEpOviuRldkQyMhw95MWAyMUgvh8DD6ZZakKxSVFqYm5mXnpDAwAlAEjhQ==';
const CHANNEL = 'Live streaming';

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});

export const VideoRoom = () => {
    const [users, setUsers] = useState<any>([]);

    const handleUserJoined = (user: any, mediaType: any) => {
        console.log('user-joined', user, mediaType);
    }
    const handleUserLeft = (user: any) => {
        console.log('user-left', user);
    }
    useEffect(() => {
        client.on('user-joined', handleUserJoined)
        client.on('user-left', handleUserLeft);

        client
            .join(APP_ID, CHANNEL, TOKEN, null)
            .then((uid) => {
                return Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid]);
            })
            .then(([tracks, uid]) => {
                const [audioTrack, videoTrack] = tracks;
                setUsers((previousUsers: any) => [...previousUsers, { uid, audioTrack, videoTrack }]);
                client.publish(tracks);
            })
    }, [])
    return <div><h2>Video Room</h2>
        {users.map((user: any) => (
            <div key={user.uid}>
                {user.uid}
            </div>
        ))}
    </div>
}
