class GlobalAppModal{
    accessToken='';
    refreshToken='';
    mobileNo='';
    avatar='';
    name='';
    email='';
    constructor(){}
    setaccessToken(data){
        this.accessToken=data.accessToken;
    }
    setrefreshToken(data){
        this.refreshToken = data.refreshToken;
    }
    setmobileNo(data){
        this.mobileNo = data.mobileNo;
    }
    setavatar(data){
        this.avatar = data.avatar;
    }
    setname(data){
        this.name = data.name;
    }
    setemail(data){
        this.email = data.email;
    }

}
export default new GlobalAppModal();