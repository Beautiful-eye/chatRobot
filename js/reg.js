/**
 * 输入：验证的文本框ID，以及验证规则
 * @param {string} val 文本框的值
 * 输出：err
 */
 const result_id = new FileValidate('txtLoginId',async function(val){
    if(!val){
    //  如果val是空的，返回
      return '请填写账号'
    }
    else{
    // 不是空的需要验证该账号是否已经存在
      const resp = await API.verify(val);
      if(resp.data){
        return '该账号已被占用，请重新输入'
      }
    }
})

const result_nickname = new FileValidate('txtNickname',async function(val){
    if(!val){
        //  如果val是空的，返回
          return '请填写昵称'
        }
})

const result_Pwd = new FileValidate('txtLoginPwd',async function(val){
    if(!val){
        //  如果val是空的，返回
          return '请填写密码'
        }
})

const result_confirmPwd = new FileValidate('txtLoginPwdConfirm',async function(val){
    if(!val){
        //  如果val是空的，返回
          return '请填写确认密码'
        }
    if(val !== result_Pwd.input.value){
        return '两次密码不一致'
    }
})

const form =document.querySelector('form');
form.onsubmit =async function(e){
  e.preventDefault();
 const resu = await FileValidate.validate([result_id,result_nickname,result_Pwd,result_confirmPwd ])
 if(!resu){
    return;
 }
 const formdata = new FormData(form);
 const data = Object.fromEntries(formdata.entries());
 const resp = await API.register(data);
if(resp.code === 0){
    // alert('注册成功，跳转到登录页')
    location.href = './login.html'
}
}

