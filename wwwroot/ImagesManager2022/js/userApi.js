

const accountBaseURL = "http://localhost:5000";

function REGISTER(data, successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseURL + "/accounts/register",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: (data) => { successCallBack(data) },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });

}

//GET : /accounts/verify?id=...&code=.....
function VERIFY(userToBeVerify, successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseURL + "/accounts/verify?id=" + userToBeVerify.Id + "&code=" + userToBeVerify.Code,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(userToBeVerify) }
    });
}


//GET : /accounts/logout/id
function LOGOUT(id, successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseURL + "/accounts/logout/" + id,
        type: 'GET',
        success: data => { successCallBack(data); clearSessionStorage()},
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

 // POST: /token body payload[{"Email": "...", "Password": "..."}]
function LOGIN(credentials, successCallBack, errorCallBack) {

    storeCredentialsInLocalStorage(credentials)

    $.ajax({
        url: accountBaseURL + "/token",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(credentials),
        success: (TokenInfo) => { GET_USER_BY_ID_STORE_SESSION(TokenInfo, successCallBack, error)},
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function GET_USER_BY_ID(id, successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseURL + "/accounts/index/" + id,
        type: 'GET',
        success: data => { successCallBack(data); },
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function GET_USER_BY_ID_STORE_SESSION(TokenInfo, successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseURL + "/accounts/index/" + TokenInfo.UserId,
        type: 'GET',
        success: (data) => {storeUserInSessionStorage(data, TokenInfo); successCallBack(data)},
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}
// PUT:accounts/modify body payload[{"Id": 0, "Name": "...", "Email": "...", "Password": "..."}]
function MODIFY(user, successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseURL + '/accounts/modify',
        type: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + getAccessTokenFromSession() // to do getAccessTokenFromSession
        },
        contentType: 'application/json',
        data: JSON.stringify(user),

        success: () => {successCallBack(user)},
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}


  // GET:accounts/remove/id
  function DELETE_USER(user, successCallBack, errorCallBack) {
    $.ajax({
        url: accountBaseURL + "/accounts/remove/" + user.Id,
        type: 'GET',
        headers: {
            'Authorization': 'Bearer ' + getAccessTokenFromSession()// to do getAccessTokenFromSession
        },
        success: ()=>{ clearSessionStorage(); successCallBack;},
        error: function (jqXHR) { errorCallBack(jqXHR.status) }
    });
}

function storeUserInSessionStorage(UserInfo, TokenInfo)
{ 
   
    
        sessionStorage.setItem('accesstoken', JSON.stringify(TokenInfo.Access_token));
    
    sessionStorage.setItem('user', JSON.stringify(UserInfo));
    
}


function clearSessionStorage()
{
    window.sessionStorage.clear();
}

function getAccessTokenFromSession()
{
    return JSON.parse(sessionStorage.getItem('accesstoken'));
}

function storeCredentialsInLocalStorage(credentials)
{
    if(credentials.Remember)
    {
        localStorage.setItem( 'credentials' , JSON.stringify(credentials));
    }
    else
    {
        localStorage.clear();
    }
       
}


    
