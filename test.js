async function getAccessUsingRefresh (refreshToken) {
    return fetch('http://127.0.0.1:8000/jwt/refresh/', {
      method: 'POST',
  
      headers: {
        'Content-Type': 'application/json'
      },
      body: {"refresh":JSON.stringify(ke)}
    }).then(res => res.json()).then((e)=>console.log(e))
  }


  getAccessUsingRefresh("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4MTI4Mjk3NCwiaWF0IjoxNjgxMTk2NTc0LCJqdGkiOiIxZGE5M2U5OGEwODA0MmU5YjBiYWZkMDhhMTdkYzhlZSIsInVzZXJfaWQiOjl9.1eVH5zclCqtLeKevTDBSl48pDZATWRBfQ5QFmJDYIC8")