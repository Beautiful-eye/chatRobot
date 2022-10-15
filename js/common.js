/**
 * 登陆和注册通用验证代码
 */

class FileValidate{
    /**
     * 构造器：
     * @param{String} txtId 文本框的ID
     * @param{fn} validatorFun 验证规则：需要输入文本框的值
     */
    constructor(txtId,validatorFun){
        this.input = document.querySelector('#'+txtId);//获取输入的文本框
        this.p = this.input.nextElementSibling; //获取对应的p元素
        this.validatorFun = validatorFun;   
        this.input.onblur = ()=>{   //文本框失去焦点
            this.validate();
        }    
    }

    /**
     * 验证，成功返回TRUE，失败FALSE
     */
    async validate(){
        const err = await this.validatorFun(this.input.value);
        if(err){
            this.p.innerHTML = err;
            return false;
        } else{
            // 说明没有错误信息
            this.p.innerHTML = '';
            return true;
        }
    }

    static async validate(validators){
       const proms =  validators.map(r => r.validate())
       const res =await  Promise.all(proms);
       return res.every(y=>y);
    }
}

