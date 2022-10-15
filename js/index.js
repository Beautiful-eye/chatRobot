// 判断账号是否登陆
(async function(){
    const resp = await API.profile();
    if(resp.code!==0){
     // 登陆失败
        alert('未登录或者登陆已过期')
        location.href = './login.html'
        return 
    }
    // 登陆成功
    // 显示昵称和名字
        const nick = document.querySelector('.aside #nickname');
        const id = document.querySelector('.aside #loginId');
        // console.log(nick,id)
        nick.innerText = resp.data.nickname;
        id.innerText = resp.data.loginId;
    // 点×退出到登陆界面
        const close = document.querySelector('.close');
        close.onclick = function(){
          API.quit()
          location.href = './login.html'
        }
    // 填充历史记录
    const chathis = await API.getHistory();
    for (const iterator of chathis.data) {
        sendMessage(iterator)
    }
    // 发送消息
    const msg = document.querySelector('.msg-container')
    msg.onsubmit = function(e){
        e.preventDefault();
        send()
    };

   async function send(){
    const txtMsg = document.querySelector('#txtMsg');
    const value = txtMsg.value;
        if(!value){
            // 没有值
            return
        }
        sendMessage({
            from :resp.data.loginId ,
            content:value,
            createdAt:Date.now(),
            to:null
        })
        txtMsg.value='';
        const get = await API.sendChat(value);
        sendMessage({
            from :null,
            content:get.data.content,
            createdAt:Date.now(),
            to:resp.data.loginId 
        })

   }
    

    function sendMessage(obj){
        const chat = document.querySelector('.chat-container');
        const inner=document.createElement('div');
        inner.classList.add('chat-item')
        const img=document.createElement('img');
        img.classList.add('chat-avatar')
        if(obj.from){
            inner.classList.add('me')
            img.src = './asset/avatar.png'
        }else{
            img.src = './asset/robot-avatar.jpg'
        }
        const content=document.createElement('div');
        content.classList.add('chat-content')
        content.innerText = obj.content
        const data=document.createElement('div');
        data.classList.add('chat-date')
        data.innerText = setDta(obj.createdAt)
        inner.appendChild(img)
        inner.appendChild(content)
        inner.appendChild(data)
        chat.appendChild(inner)
        chat.scrollTop = chat.scrollHeight;
    }




    function setDta(timer){
        const time = new Date(timer)
        const year = time.getFullYear()
        const month = (time.getMonth()+1).toString().padStart(2,'0');
        const day = time.getDay().toString().padStart(2,'0');
        const hour = time.getHours().toString().padStart(2,'0');
        const minu = time.getMinutes().toString().padStart(2,'0');
        const sec = time.getSeconds().toString().padStart(2,'0');
        return `${year}-${month}-${day} ${hour}:${minu}:${sec}`
    }
})()