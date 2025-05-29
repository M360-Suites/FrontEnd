import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { mainLogo } from "../../assets";

const SocialAuthorization = ({ platform = "X", onAuthorize, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuthorize = () => {
    setIsLoading(true);
    // Simulate authorization process
    setTimeout(() => {
      setIsLoading(false);
      if (onAuthorize) onAuthorize();
    }, 1500);
  };

  // Platform-specific permissions
  const permissions = {
    X: [
      "View posts from your timeline, including protected content, Lists, and collections",
      "Access your X profile information and account settings",
      "See accounts you follow, mute, or block",
      "Follow and unfollow accounts for you",
      "Update your profile and preferences",
      "Create, delete, and interact with posts (like, reply, repost) on your behalf",
      "Manage Lists and collections",
      "Mute, block, and report accounts for you",
      "Send and manage Direct Messages"
    ],
    Instagram: [
      "Access your basic profile information",
      "View your media (photos and videos)",
      "See your followers and accounts you follow",
      "Post content to your feed on your behalf",
      "Access your Instagram insights and metrics"
    ],
    LinkedIn: [
      "Access your profile information",
      "View your connections",
      "Post updates and articles on your behalf",
      "Send messages to your connections",
      "Access your company pages"
    ],
    Facebook: [
      "Access your profile information and timeline",
      "Post content to your timeline on your behalf",
      "Manage your pages and groups",
      "Access your friends list",
      "Send messages on your behalf"
    ]
  };

  // Get the correct permissions list based on platform
  const platformPermissions = permissions[platform] || permissions.X;
  
  // Platform-specific colors and icons
  const platformConfig = {
    X: {
      icon: "mdi:twitter",
      color: "#1DA1F2",
      bgColor: "#E8F5FD"
    },
    Instagram: {
      icon: "mdi:instagram",
      color: "#E1306C",
      bgColor: "#FDEEF6"
    },
    LinkedIn: {
      icon: "mdi:linkedin",
      color: "#0077B5",
      bgColor: "#E8F4FA"
    },
    Facebook: {
      icon: "mdi:facebook",
      color: "#1877F2",
      bgColor: "#E8F0FE"
    }
  };

  const config = platformConfig[platform] || platformConfig.X;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full mx-auto">
      {/* Header */}
      <div 
        className="p-4 flex items-center justify-between border-b"
        style={{ backgroundColor: config.bgColor }}
      >
        <div className="flex items-center">
          <Icon 
            icon={config.icon} 
            className="text-3xl mr-3" 
            style={{ color: config.color }}
          />
          <h2 className="text-lg font-semibold">Authorize {platform} Account</h2>
        </div>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <Icon icon="mdi:close" className="text-xl" />
          </button>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center mb-6">
          <img src={mainLogo} alt="M360 Suite Logo" className="h-10 mr-3" />
          <div>
            <h3 className="font-medium">m360suite</h3>
            <p className="text-sm text-gray-600">wants to access your {platform} account</p>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">
          m360 suites helps you schedule and manage posts, analyze performance, and grow your
          presence on {platform}. To provide these services, m360suite needs permission to:
        </p>
        
        <ul className="space-y-2 mb-6">
          {platformPermissions.map((permission, index) => (
            <li key={index} className="flex items-start">
              <Icon 
                icon="mdi:check-circle" 
                className="text-green-500 mt-0.5 mr-2 flex-shrink-0" 
              />
              <span className="text-sm text-gray-700">{permission}</span>
            </li>
          ))}
        </ul>
        
        <div className="text-sm text-gray-500 mb-6">
          <p>
            By authorizing access, you agree to m360suite's{" "}
            <a href="#" className="text-primary-orange hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-primary-orange hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 p-4 flex justify-end gap-3 border-t">
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleAuthorize}
          disabled={isLoading}
          className="px-4 py-2 bg-primary-orange text-white rounded-md hover:bg-primary-orange/90 transition-colors flex items-center"
          style={{ backgroundColor: isLoading ? undefined : config.color }}
        >
          {isLoading ? (
            <>
              <Icon icon="mdi:loading" className="animate-spin mr-2" />
              Authorizing...
            </>
          ) : (
            <>
              Authorize {platform}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SocialAuthorization;
