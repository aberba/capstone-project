import React from "react";
import {Redirect} from "react-router-dom";
import ReactDOM from "react-dom";
import Header from "../../components/header.js";
import axios from 'axios';
import Modal from "../../components/modal.js";

export default class SignupPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fname: '',
            lname : '',
            email: '',
            password: '',
            rpassword: '',
            redirect: false,
            message: "Please fill all fields",
            data: '',
        };
        this.onSignUpClicked = this.onSignUpClicked.bind(this);
        this.Change = this.Change.bind(this);

    };


modalOpen(){
    var modal = document.getElementById("myModal");
    // When the user clicks the button, open the modal 
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
modalClose = e => {
    var modal = document.getElementById("myModal");
    var main =  document.getElementById("main");
    if(e.target == modal){
        modal.style.display = "none";
    }
}

//This is a class method which allows changes in the input fields
    Change = e => {
  this.setState({
    [e.target.name]: e.target.value
    });
    
    };

    checkEmail(){
        axios
            .get('http://localhost:5000/user/'+this.state.email)
            .then(res =>{
                const returnData = Object.keys(res.data).length;
                this.setState({
                    data: returnData
                });
                if(returnData!==0){
                    this.setState({
                        message : "There already exists a user with this email!",
                    });
                 this.modalOpen();
                }else{
                    this.addFormData()
                }
            })
    }



  addFormData  () {
        if(this.checkEmail){
            axios
            .post('http://localhost:5000/user-add',{
                'fname': this.state.fname,
                'email': this.state.email,
                'lname': this.state.lname,
                'password': this.state.password,
            })
            .then(response =>{
          this.setState({message:"Account has been successfully formed! redirecting to login page..."});
          this.modalOpen();
         setTimeout(
    function() {
        this.setState({redirect: true});
    }
    .bind(this),
    2000
);
           
               
            })
            .catch(error =>{
                console.log(error);
            })

        }
        
    }

    validation(){
        
        if(this.state.fname== ''||this.state.email== ''||
        this.state.lname== ''||
        this.state.password== ''||
        this.state.rpassword == ''){ 
            this.modalOpen();
            return false;
        }else{
            if(this.state.rpassword!==this.state.password){
                this.setState(
                    {message: "Please repeat your initial password" }
                )
                this.modalOpen();
                return false;
            }else{
                return true;
            }
        }
    }

    onSignUpClicked = e => {
        if(this.validation()){
            this.checkEmail();
        }
    };

        //

    render(){
        return(
   <div className="body signup-page">
         <Header startPage="/"/>

         <div className="flex-center page">
         <form action="" className="signup-form p-5">
            
            <div className="signup-header">
               <h5 className="">Create An Account</h5>
            </div>

            <div className="username">
               <div className="form-label-group mr-2">
                  <label htmlFor="inputUserame">First Name</label><br/>
                  <input name="fname" type="text" id="inputUserame" className="form-control" placeholder="First Name"
                  value={this.state.fname} onChange = {this.Change} required autoFocus/>            
               </div>

               <div className="form-label-group">
                  <label htmlFor="inputSurname">Surname</label><br/>
                  <input name="lname" type="text" id="inputSurname" className="form-control" placeholder="Surname"
                  value={this.state.lname} onChange = {this.Change} required autoFocus/>
               </div>
            </div>

            <div className="form-label-group">
               <label htmlFor="inputEmail">Email address</label><br/>
               <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
               value={this.state.email} onChange = {this.Change} required name="email"/>
               
            </div>

            <hr/>

            <div className="form-label-group">
            <label htmlFor="inputPassword">Password</label> <br/>   
               <input type="password" id="inputPassword" className="form-control" placeholder="Password"
               value={this.state.password} onChange = {this.Change} name="password" required/>
            </div>

            <div className="form-label-group">
            <label htmlFor="inputConfirmPassword">Confirm password</label> <br/>
               <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password"
               value={this.state.rpassword} onChange = {this.Change} name="rpassword" required/>
               
            </div>

            <button className="btn btn-lg btn-success btn-block text-uppercase" type="button" onClick= {this.onSignUpClicked}>Register</button>


            
            

         </form>

         </div>



                {/* <div className="container">
                        <div className="row">
                        <div className="col-lg-10 col-xl-9 mx-auto">
                            <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                          
                            </div>
                            <div className="card-body">
                                
                                <form className="form-signin">
                                <div className="form-label-group">
                                    <input name="fname" type="text" id="inputUserame" className="form-control" placeholder="First Name"
                                    value={this.state.fname} onChange = {this.Change} required autoFocus/>
                                    <label htmlFor="inputUserame">First Name</label>
                                </div>

                                <div className="form-label-group">
                                    <input name="lname" type="text" id="inputSurname" className="form-control" placeholder="Surname"
                                    value={this.state.lname} onChange = {this.Change} required autoFocus/>
                                    <label htmlFor="inputSurname">Surname</label>
                                </div>


                                <div className="form-label-group">
                                    <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                                    value={this.state.email} onChange = {this.Change} required name="email"/>
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>
                                
                                <hr/>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                                    value={this.state.password} onChange = {this.Change} name="password" required/>
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                                
                                <div className="form-label-group">
                                    <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password"
                                    value={this.state.rpassword} onChange = {this.Change} name="rpassword" required/>
                                    <label htmlFor="inputConfirmPassword">Confirm password</label>
                                </div>

                                <button className="btn btn-lg btn-success btn-block text-uppercase" type="button" onClick= {this.onSignUpClicked}>Register</button>

                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div> */}
  <Modal message={this.state.message}/>
            {this.state.redirect?<Redirect to="./login"/>:null}
            </div>
        );
    };
};