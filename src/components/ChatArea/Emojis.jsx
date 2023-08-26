import React from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";

export const Emojis = () => {
  return (
    <div className="emojiPicker">
      <EmojiPicker
        theme={Theme.AUTO}
        lazyLoadEmojis={true}
        height={400}
        width={300}
      />
    </div>
  );
};
