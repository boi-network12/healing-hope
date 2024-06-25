// utils.js

export const getPlaceholderImage = (name) => {
    if (!name) return null;
    const initial = name.charAt(0).toUpperCase();
    return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff&size=128`;
  };
  