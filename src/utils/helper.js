export const validateEmail=(email)=>{
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);

};

export const getInitials=(name)=>{
  if((!name)) return "";

  const words=name.split(" ");
  let initials = "";

  for (let i=0; i<Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase() ;
}

/*function isValidEmail(email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  }
  
  // Example usage
  const email1 = "john.doe@example.com";
  const email2 = "invalid_email";
  
  console.log(isValidEmail(email1)); // true
  console.log(isValidEmail(email2)); // false
}*/