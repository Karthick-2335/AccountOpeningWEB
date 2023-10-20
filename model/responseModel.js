class responseObject 
{
    success;
    successMessage;
    errorCode;
    errorMessage;
    errors;
    results;
    statusCode;
    token;
    referenceNumber;
    NoOfMonths = [6,12,24,46,60];
    selectMonth = 12;
}

module.exports = responseObject;