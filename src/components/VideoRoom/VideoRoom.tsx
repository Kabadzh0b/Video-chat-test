import AgoraRTC from "agora-rtc-sdk-ng"
import { useEffect, useState } from "react";
import { VideoRow } from "../VideoRow/VideoRow";
import "./VideoRoom.css";

const APP_ID = '84a475b5e6264529bce54a13cf38a2cc';
const TOKEN = '007eJxTYJhY9+hCcq+dh+q1yft/hL56fcp4Sl2y8bFuURmud38M8y4oMFiYJJqYmyaZppoZmZmYGlkmJaeamiQaGienGVskGiUnuyc2ZzYEMjKc2dvEzMgAgSA+H4NPZlmqQnFJUWpibmZeOgMDADk4JQM=';
const CHANNEL = 'Live streaming';

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
});

export const VideoRoom = () => {
    const [users, setUsers] = useState<any>([]);

    console.log("users", users);

    const handleUserJoined = async (user: any, mediaType: any) => {
        console.log("user-joined", user, mediaType);
        await client.subscribe(user, mediaType);
        if (mediaType === 'video') {
            setUsers((previousUsers: any) => [...previousUsers, user]);
        }
        if (mediaType === 'audio') {
            user.audioTrack?.play();
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setUsers((previousUsers: any) => [...previousUsers, {
                uid: `DEN DAUN ${Math.floor(Math.random() * 1000)}`,
                audioTrack: null,
                videoTrack: null,
                name: `DEN DAUN ${Math.floor(Math.random() * 1000)}`,
            }])
        }, 10000);

        return () => clearInterval(interval);
    }, [])

    const handleUserLeft = (user: any) => {
        setUsers((previousUsers: any) => previousUsers.filter((u: any) => u.uid !== user.uid));
    }

    const getVideoRows = () => {
        const videoRows = [];

        for (let i = 0; i < users.length; i += 2) {
            videoRows.push(users.slice(i, i + 2));
        }

        return videoRows;
    }

    const videoRows = getVideoRows();

    useEffect(() => {
        client.on('user-published', handleUserJoined);
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
    return (
        <div className="video-room">
            {videoRows.map((row: any) => (
                <VideoRow users={row} />
            ))}
        </div>
    )
}
