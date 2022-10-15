
 const result_id = new FileValidate('txtLoginId',async function(val){
    if(!val){
    //  如果val是空的，返回
      return '请填写账号'
    }
})

const result_Pwd = new FileValidate('txtLoginPwd',async function(val){
    if(!val){
        //  如果val是空的，返回
          return '请填写密码'
        }
})


const form =document.querySelector('form');
form.onsubmit =async function(e){
  e.preventDefault();
 const resu = await FileValidate.validate([result_id,result_Pwd ])
 if(!resu){
    return;
 }
 const formdata = new FormData(form);
 const data = Object.fromEntries(formdata.entries());
 const resp = await API.login(data);
if(resp.code === 0){
    // alert('登陆成功，')
    location.href = './index.html'
}else{
    alert('登陆失败，请检查')
}
}