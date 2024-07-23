import React, { Component } from 'react';
import { Backdrop, Box, Typography, } from "@mui/material";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './style.css';


class Login extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        return(
<div className='Login body1'>
	                <div class="section1">
		<div class="container">
			<div class="row full-height1 justify-content-center">
				<div class="col-12 text-center align-self-center py-5">
					<div class="section1 pb-5 pt-5 pt-sm-2 text-center">
						<h6 class="h61 mb-0 pb-3 large1-font" style={{color: "#ffffff"}}><span>Log In</span></h6>
						<div class="card1-3d-wrap mx-auto">
							<div class="card1-3d-wrapper">
								<div class="card1-front">
									<div class="center1-wrap">
										<div class="section1 text-center">
											<h4 class="h41 mb-4 pb-3">Log In</h4>
											<div>
									       </div>
											<div class="form1-group">
												<input type="email" name="logemail" class="form1-style" placeholder="Email" id="logemail" autocomplete="off"/>
												<i class="input1-icon uil uil-at"></i>
											</div>	
											<div class="form1-group mt-2">
												<input type="password" name="logpass" class="form1-style" placeholder="Password" id="logpass" autocomplete="off"/>
												<i class="input1-icon uil uil-lock-alt"></i>
											</div>
											<a href="/Home" class="a1 btn1 mt-4">submit</a>
                            				<p class="p1 mb-0 mt-4 text-center"><a href="#0" class="link1">Forgot Password?</a></p>
											<p class="p1 mb-0 mt-4 text-center"><a href="/SignUp" class="link1">Create New Account</a></p>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>

            </div>
        );
      }

      
}

export default Login;