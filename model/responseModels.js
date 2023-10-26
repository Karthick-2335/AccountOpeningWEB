class Response {
    constructor(message ,results){
        this.message = message;
        this.results = results;
    }
}

class ArrayResponse extends Response {
    constructor(message,results,pageSize,totalRecords,currentRecords){
        super(message,results)
        this.page = pageSize;
        this.totalRecords = totalRecords;
        this.currentRecords = currentRecords;
    }
}

module.exports = {
    Response,
    ArrayResponse
}