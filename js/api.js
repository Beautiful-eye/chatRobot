var API = (function (){
    const BASE_URL = 'http://study.duyiedu.com'
    const TOKEN_key = 'token'
    
    function get(path){
        // 判断本地是否有token
       const headers = {}; 
       const t =  localStorage.getItem(TOKEN_key);
       if(t){
        headers.authorization = `Bearer ${t}`;
       }
        //只需要将authorization放入请求体中
       return fetch(BASE_URL+path,{ headers})
    }
    
    function post(path,userInfo){
        const headers = {'Content-Type':'application/json'}; 
        const t =  localStorage.getItem(TOKEN_key);
        if(t){
            headers.authorization = `Bearer ${t}`;
        }
        return fetch(BASE_URL+path,{
            method:'POST',
            headers,
            body:JSON.stringify(userInfo)
      })
    }
    //注册
    async function register(user){
        const resp = await post('/api/user/reg',user)
        return resp.json()
    }
    // 登陆
    async function login(loginInfo){
        const resp = await post('/api/user/login',loginInfo)
        const getBody = await resp.json()
        // 如果code=0，需要将响应头中的token（authorization）保存到本地(localStorage)
        if(getBody.code === 0){
           const token = resp.headers.get('authorization');
           localStorage.setItem('token',token);
        }
        return getBody;
        
    }
    // 验证
    async function verify(loginId){
        const resp = await get('/api/user/exists?loginId='+loginId);
        return await resp.json()
    }
    // 当前登陆信息
    async function profile(){
        const resp = await get('/api/user/profile');
         return await resp.json()
    }
    // 发送聊天消息
    async function sendChat(content){
        const resp = await  post('/api/chat',{content})
        return await resp.json()
    }
    // 获取聊天记录
    async function getHistory(){
        const resp1 = await get('/api/chat/history')
        return await resp1.json()
    }
    // 退出登陆:把本地的token删除
    function quit(){
      localStorage.removeItem('token')
    }

    return {
        register,
        login,
        verify,
        profile,
        getHistory,
        sendChat,
        quit
    }
})()
