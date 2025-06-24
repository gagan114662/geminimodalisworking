import React from 'react';
import './screen-prompt.scss';

interface ScreenPromptProps {
  onEnableScreenSharing: () => void;
  onSkip: () => void;
}

const ScreenPrompt: React.FC<ScreenPromptProps> = ({ onEnableScreenSharing, onSkip }) => {
  return (
    <div className="screen-prompt-overlay">
      <div className="screen-prompt-modal">
        <div className="screen-prompt-header">
          <h2>🎓 Enable Screen Sharing for Better Learning</h2>
        </div>
        
        <div className="screen-prompt-content">
          <div className="screen-prompt-icon">
            <span className="material-symbols-outlined">present_to_all</span>
          </div>
          
          <p className="screen-prompt-description">
            <strong>Let Gemini see your screen to help you with math problems!</strong>
          </p>
          
          <ul className="screen-prompt-benefits">
            <li>✅ Gemini can see the math questions</li>
            <li>✅ Get real-time help with your work</li>
            <li>✅ Better explanations and guidance</li>
            <li>✅ Interactive learning experience</li>
          </ul>
          
          <div className="screen-prompt-note">
            <p><small>🔒 Your screen will only be shared with Gemini to help with learning. You can disable this anytime.</small></p>
          </div>
        </div>
        
        <div className="screen-prompt-actions">
          <button onClick={onEnableScreenSharing} className="enable-btn">
            <span className="material-symbols-outlined">screen_share</span>
            Enable Screen Sharing
          </button>
          <button onClick={onSkip} className="skip-btn">
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenPrompt;