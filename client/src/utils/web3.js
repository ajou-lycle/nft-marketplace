const isNonZeroAddress = (address) => {
    if (parseInt(address, 16) === 0) {
        return false;
    }
    return true;
}

module.exports = { isNonZeroAddress };