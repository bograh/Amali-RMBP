const ChatResponses = {
    getResponse: () => {
      const responses = [
        "Could you please provide more details?",
        "I'm not sure about that, but here's my best guess:",
        "This is a much longer response to test how the chat handles messages of different lengths. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };
  
  export default ChatResponses;