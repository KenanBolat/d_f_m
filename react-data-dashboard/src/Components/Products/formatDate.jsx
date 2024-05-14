const formatDate = (dateString) => {
    if (dateString.length !== 14) {
        return "Invalid Date";
    }

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const hour = dateString.slice(8, 10);
    const minute = dateString.slice(10, 12);
    const second = dateString.slice(12, 14);
    
    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
    
    return !isNaN(date.getTime()) ? format(date, 'yyyy-MM-dd HH:mm:ss') : "Invalid Date";
};