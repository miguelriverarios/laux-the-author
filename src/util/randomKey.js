const randomKey = function (obj) {
    var keys = Object.keys(obj);

    return keys[keys.length * Math.random() << 0];
}

module.exports = randomKey;