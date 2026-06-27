const MOCK_USER =  {username:"admin",password:"123456"}
const DELAY_MS = 800

export function mockLogin(username,password){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(
                username === MOCK_USER.username &&
                password === MOCK_USER.password
            ){
                resolve({
                    token:"mock-jwt-"+Date.now(),
                    username,
                })
            } else {
                reject(new Error("用户名或密码错误"))
            }
        },DELAY_MS)
    })
}