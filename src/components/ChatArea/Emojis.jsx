import React from "react";
import EmojiPicker, { Emoji, EmojiStyle, Theme } from "emoji-picker-react";

export const Emojis = () => {
  return (
    <div className="emojiPicker">
      <EmojiPicker
        theme={Theme.DARK}
        lazyLoadEmojis={true}
        height={400}
        width={300}
      />
      <Emoji
        emojiStyle={EmojiStyle.APPLE}
        size={25}
      />
    </div>
  );
};
