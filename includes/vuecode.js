var app = new Vue({
    el: '#app',
    data: {
      fields: {
          firstname:'',
          lastname: '',
          email: '',
          company: '',
          enrollment_range__c: '',
          phone: '',
      },
      options: {
          message: '',
          success: '',
          error: '',
      },
    },
    methods: {
      async sendData (){
          if(this.checkInputs()){
              var self = this;
              const portalId = '2716595';
              const formGuid = '7ce26e6b-c41c-46b1-acf5-879dedf86f87';
              await axios.post(
                  `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
                  {
                  portalId,
                  formGuid,
                  fields: [
                  {
                      name: 'firstname',
                      value: this.fields.firstname,
                  },
                  {
                      name: 'lastname',
                      value: this.fields.lastname,
                  },
                  {
                      name: 'email',
                      value: this.fields.email,
                  },
                  {
                      name: 'company',
                      value: this.fields.company,
                  },
                  {
                      name: 'enrollment_range__c',
                      value: this.fields.enrollment_range__c,
                  },
                  {
                      name: 'phone',
                      value: this.fields.phone,
                  }
                  ],
                  }
              )
              .then(function (response) {
                  console.log(response)
                  if(response.status === 200){
                      console.log("Success")
                      self.options.success = "Form successfully submitted.";
                      self.clearForm();
                  } else {
                      console.log("Something wrong happend!")
                  }
              })
              .catch(function (error) {
                  console.log("Error");
                  self.options.error = "Error while sending form, please try again.";
                  console.log(error);
              })
          }
      },
      checkInputs: function (){
          if(!this.checkValue(this.fields.firstname)){
              this.options.message = "Please enter your First name"
              return false;
          }
          if(!this.checkValue(this.fields.lastname)){
              this.options.message = "Please enter your Lats name"
              return false;
          }
          if(this.validateEmail(this.fields.email)){
              this.options.message = "Please enter a correct email"
              return false;
          }
          if(!this.checkValue(this.fields.company)){
              this.options.message = "Please enter company name"
              return false;
          }
          if(!this.checkSelect(this.fields.enrollment_range__c)){
              this.options.message = "Please choose one Enrollment capacity"
              return false;
          }
          if(!this.checkValue(this.fields.phone)){
              this.options.message = "Please enter your phone number"
              return false;
          }
          return true;
      },
      checkValue: function(str){
          try {
              return str.length > 4
          ?  true
          :  false
          } catch {
              return false
          }
      },
      checkSelect: function(str){
          return str.length != "" ? true : false
      },
      validateEmail(email) {
          if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
              return false;
          } else {
              return true;
          }
      },
      clearMessages: function(){
          this.options.message = "";
          this.options.success = "";
          this.options.error = "";
      },
      clearForm: function(){
          this.fields.firstname = "";
          this.fields.lastname = "";
          this.fields.company = "";
          this.fields.email = "";
          this.fields.enrollment_range__c = "";
          this.fields.phone = "";
      },
      acceptNumber() {
          var x = this.fields.phone.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          this.fields.phone = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      }
    }
  })