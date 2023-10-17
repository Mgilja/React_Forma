

class Form {
  constructor(
    public firstName?: string,
    public lastName?: string,
    public address?: string,
    public phone?: string,
    public email?: string,
    public checkbox?: boolean
  ) {}
  
    
  validate(): string | undefined {


   
    
    if (!this.firstName) return 'Required First Name';
    if (!this.lastName) return 'Required Last Name';
    if (!this.address) return 'Required Adress';
    if (!this.phone) return 'Required Phone num';
    if (!this.email) return 'Required Email';
    if (!this.checkbox) return 'Required chekbox confirm';

    
    if (!this.phone.match(/^\+\d{10,20}$/)) return 'Bad phone number format';
    if (!this.email.match(/^\S+@\S+\.\S+$/)) return 'Bad email address format';

   
    return undefined;

  
 }


}

export default Form

