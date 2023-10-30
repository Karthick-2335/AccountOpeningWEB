class Response {
    constructor(success,message ,results){
        this.message = message;
        this.results = results;
        this.success = success
    }
}

class ArrayResponse extends Response {
    constructor(success,message,results,pageSize,totalRecords,currentRecords){
        super(message,results,success)
        this.page = pageSize;
        this.totalRecords = totalRecords;
        this.currentRecords = currentRecords;
    }
}

module.exports = {
    Response,
    ArrayResponse
}