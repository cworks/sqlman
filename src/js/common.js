
function _version() {
    return "sqlman version: 1.0.0";
}
exports.version = _version;

function _endsWith(text, suffix) {
    return text.indexOf(suffix, text.length - suffix.length) !== -1;
}
exports.endsWith = _endsWith;

function _replaceText(text, target, replacement) {
    return text.replace(target, replacement);
}
exports.replaceText = _replaceText;
