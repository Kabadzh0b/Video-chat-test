import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import "./VideoRow.css";

interface VideoRowProps {
    users: any[];
}

export const VideoRow = ({ users }: VideoRowProps) => {
    return (
        <div className="video-room-row">
            {users.map((user: any) => (
                <VideoPlayer user={user} key={user.uid} />
            ))}
        </div>
    )
}
