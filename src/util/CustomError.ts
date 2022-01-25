function CustomError(message){
    this.message = message;
}

CustomError.prototype = new Error();

export { CustomError }