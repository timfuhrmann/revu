export const rolesMap: Record<Data.Role, string> = {
    "0": "Member",
    "1": "Owner",
};

export const statusMap: Record<Data.ReviewStatus, string> = {
    0: "Pending",
    1: "Approved",
    2: "Warning",
    3: "Denied",
};

export const moveUserToTop = (uid: string, members: string[]): string[] => {
    const index = members.findIndex(member => member === uid);

    if (index !== -1) {
        let arr = [...members];
        const member = arr.splice(index, 1)[0];
        return [member, ...arr];
    } else {
        return members;
    }
};

export const removeFromObjectByKey = (obj: Record<string, any>, key: string) => {
    delete obj[key];
    return obj;
};

export const getPassedTimeByDate = (date: number): string => {
    const diff = Date.now() - date;
    const newDate = new Date(diff);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = newDate.getUTCMinutes();

    if (hours > 0) {
        return `${hours} h ago`;
    } else if (minutes > 0) {
        return `${minutes} min ago`;
    } else {
        return "just now";
    }
};
