function makeID() {
    let base = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";

    for(let i = 0; i < 15; i++ ) {
        code += base.charAt(Math.floor(Math.random() * base.length));
    }

    return code + Date.now().toString().slice(5, -1) + code;
}

function formatDate(propDate) {
    const date = new Date(propDate);
    const getDate = date.getDate() < 10 ? `0` + date.getDate() : date.getDate();
    const getMonth = (date.getMonth() + 1) < 10 ? `0` + (date.getMonth() + 1) : date.getMonth() + 1;
    const getMinutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const srt = `${getDate} / ${getMonth} / ${date.getFullYear()} ${date.getHours()}:${getMinutes}`;

    return String(date) === 'Invalid Date' ? '' : srt;
}

export { makeID, formatDate };