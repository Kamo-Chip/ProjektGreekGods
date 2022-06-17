const formatDate = (date) => {
    const dateTokens = date.toString().split(" ");

    const day = dateTokens[2];
    const month = dateTokens[1];
    
    return `${day} ${month}`;
}

export default formatDate;