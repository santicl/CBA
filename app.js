export const GetCookie = () => {
    let cookie = document.cookie;
    return cookie;
}


export const GetData = async () => {
    const response = await fetch('data.json');
    const data = await response.json();
    return data;
}

export const Validate = (data) => {
    let cookie = GetCookie();
    const result = JSON.stringify(data.find(c => c.id === cookie));
    if (typeof result === "string") {
        return "undefined";
    } else {
        return cookie;
    }
}

export const SaveData = (data) => {
    if (data === "undefined") {
        return;
    } else {
        let c = [];
        let cookie = {
            id: getID(),
            many: 0
        }
        c.push(cookie);
        fs.writeFileSync('data.json', JSON.stringify(c), 'utf-8');
    }

}