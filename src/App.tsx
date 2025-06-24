/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useRef, useState, useEffect } from "react";
import "./App.scss";
import { LiveAPIProvider } from "./contexts/LiveAPIContext";
import SidePanel from "./components/side-panel/SidePanel";
import { Altair } from "./components/altair/Altair";
import MathQuestion from "./components/math-question/MathQuestion";
import ControlTray from "./components/control-tray/ControlTray";
import ScreenPrompt from "./components/screen-prompt/ScreenPrompt";
import cn from "classnames";
import { LiveClientOptions } from "./types";
import { useScreenCapture } from "./hooks/use-screen-capture";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY as string;
if (typeof API_KEY !== "string") {
  throw new Error("set REACT_APP_GEMINI_API_KEY in .env");
}

const apiOptions: LiveClientOptions = {
  apiKey: API_KEY,
};

function App() {
  // this video reference is used for displaying the active stream, whether that is the webcam or screen capture
  // feel free to style as you see fit
  const videoRef = useRef<HTMLVideoElement>(null);
  // either the screen capture, the video or null, if null we hide it
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [screenSharingEnabled, setScreenSharingEnabled] = useState(false);
  const [showScreenPrompt, setShowScreenPrompt] = useState(true);
  const screenCapture = useScreenCapture();

  const enableScreenSharing = async () => {
    try {
      const stream = await screenCapture.start();
      setVideoStream(stream);
      setScreenSharingEnabled(true);
      setShowScreenPrompt(false);
      console.log('Screen sharing enabled for Gemini visibility');
    } catch (error) {
      console.log('Screen sharing cancelled or failed:', error);
      setShowScreenPrompt(true);
    }
  };

  // Auto-prompt for screen sharing when user first connects
  useEffect(() => {
    if (showScreenPrompt && !screenSharingEnabled) {
      // Show prompt immediately when app loads
    }
  }, [showScreenPrompt, screenSharingEnabled]);

  return (
    <div className="App">
      <LiveAPIProvider options={apiOptions}>
        <div className="streaming-console">
          <SidePanel />
          <main>
            <div className="main-app-area">
              {/* Screen sharing status banner */}
              {screenSharingEnabled && (
                <div className="screen-status-banner">
                  <span className="material-symbols-outlined">visibility</span>
                  Gemini can see your screen - Ready to help with math!
                </div>
              )}
              
              {/* Math Question Component */}
              <MathQuestion />
              <Altair />
              <video
                className={cn("stream", {
                  hidden: !videoRef.current || !videoStream,
                })}
                ref={videoRef}
                autoPlay
                playsInline
              />
            </div>

            <ControlTray
              videoRef={videoRef}
              supportsVideo={true}
              onVideoStreamChange={setVideoStream}
              enableEditingSettings={true}
              screenSharingEnabled={screenSharingEnabled}
              screenCapture={screenCapture}
            >
              {/* put your own buttons here */}
            </ControlTray>
          </main>
        </div>
        
        {/* Screen sharing prompt modal */}
        {showScreenPrompt && (
          <ScreenPrompt
            onEnableScreenSharing={enableScreenSharing}
            onSkip={() => setShowScreenPrompt(false)}
          />
        )}
      </LiveAPIProvider>
    </div>
  );
}

export default App;
