let blackListedToken = [];

const blackListtoken = (token) => {
    console.log("Blacklisting token:", token);
    blackListedToken.push(token);
};

const isTokenBlackList = (token) => {
    return blackListedToken.includes(token);
};

module.exports = { blackListtoken, isTokenBlackList };
