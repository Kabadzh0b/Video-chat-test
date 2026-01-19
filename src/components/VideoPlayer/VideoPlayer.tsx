import { useEffect, useRef } from "react"

export const VideoPlayer = ({ user }: { user: any }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        user.videoTrack?.play(ref.current);
    }, []);
    return (
        <div className="video-room-player">
            <h2>Video Player</h2>
            <p>User ID: {user.uid}</p>
            <div ref={ref} style={{ width: '200px', height: '200px'}}></div>
        </div>
    )
}
