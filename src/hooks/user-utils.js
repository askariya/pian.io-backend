module.exports = {
    // regex code adapted from: https://stackoverflow.com/questions/7331289/javascript-function-valid-username
    username_is_valid: function(username) {
        return /^[0-9a-zA-Z_.-]+$/.test(username);
    },
    
    // regex code adapted from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    email_is_valid: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
    },

    /* function to confirm that a given username and email are unique
    if not will send appropriate Errors to the client */
    confirm_unique_user: function(emails, usernames){

        if (emails === null) {
            var email_taken = false;
            var username_taken = usernames.data.length != 0;
        }
        else if (usernames === null) {
            var username_taken = false;
            var email_taken = emails.data.length != 0;
        }
        else{
            var username_taken = usernames.data.length != 0;
            var email_taken = emails.data.length != 0;
        }

        //check if the user already exists
        if (username_taken && email_taken) {
            throw new Error("Email and Username are already in use");
        }
        else if (email_taken && !username_taken) {
            throw new Error("Email is already in use");
        }
        else if (username_taken && !email_taken) {
            throw new Error("Username is already in use");
        }
        // if the user is indeed unique, return true
        else {
            return true;
        }
    }
};