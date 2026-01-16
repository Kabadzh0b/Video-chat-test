import { useState } from "react"
import { VideoRoom } from "./components/VideoRoom/VideoRoom";

function App() {
  const [isJoined, setIsJoined] = useState(false);
  return (
    <div className='App'>
      <h1>Virtual call test</h1>

      {!isJoined && <button onClick={() => setIsJoined(true)}>Join Room</button>}

      {isJoined && <VideoRoom />}
    </div>
  )
}

export default App
