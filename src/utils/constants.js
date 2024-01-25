 export const colors = ["#B38BFA","#FF79F2","#43E6FC","#F19576","#0047FF","#6691FF"]
  export const generateInitials = (name) => {
    const words = name.split(' ');
    let initials = '';

    for (let i = 0; i < words.length; i++) {
      initials += words[i][0].toUpperCase();
    }

    return initials;
  };