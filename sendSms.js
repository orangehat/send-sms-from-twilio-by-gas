function sendSms(e) {
  var itemResponses = e.response.getItemResponses();
  var message = '';
  // Parse resopnse
  for (var i = 0; i < itemResponses.length; i++) {
    var itemResponse = itemResponses[i];
    var question = itemResponse.getItem().getTitle();
    var answer = itemResponse.getResponse();
    
    // form name
    if(question=="<Ex. name>"){
      var name=answer;
    }else if(question=="<Ex. phone number>"){
      var tel=answer;
    }else if(question=="<Ex. mail>"){
      var mail=answer;
    }
  }
  var accountSid = "<AccountSID>";
  var authToken = "<AuthToken>";
  var url = "https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/SMS/Messages.json";
  var options = {
    method: "post",
    headers: {
      Authorization: "Basic " + Utilities.base64Encode(accountSid + ":" + authToken)
    },
    payload: {
      // From is one of your Twilio phone numbers
      From: "<from phone number>",
      To: tel,
      Body: "Test from Google Apps Script " + name + ": " + mail
    }
  };
  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log(response);
  } catch(e){
    var error = e;
    Logger.log("message:" + error.message + "\nfileName:" + error.fileName + "\nlineNumber:" + error.lineNumber + "\nstack:" + error.stack);
  }
}
