const fileValidator = (value) => {
    if(value.length !== 0) {
        return (value[0].size / (1024 * 1024)) > 10;
    }
}

export {fileValidator}