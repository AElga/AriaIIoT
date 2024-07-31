import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css';

//The SignUp page currently has no functionality, however the purpose of
//this page is to allow a new user to enter their information to be saved
//in the database

class SignUp extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='SignUp body1'>
				<div class="section1">
					<div class="container">
						<div class="row full-height1 justify-content-center">
							<div class="col-12 text-center align-self-center py-5">
								<div class="section1 pb-5 pt-5 pt-sm-2 text-center">
									<h6 class="h61 mb-0 pb-3 large1-font" style={{ color: "#ffffff" }}><span>Sign Up</span></h6>
									<div class="card1-3d-wrap mx-auto">
										<div class="card1-3d-wrapper">
											<div class="card1-front">
												<div class="center1-wrap">
													<div class="section1 text-center">
														<h4 class="h41 mb-2 pb-2">Sign Up</h4>
														<div class="form1-group">
															<input type="text" name="logname" class="form1-style" placeholder="Company Name" id="logname" autocomplete="off" />
															<i class="input1-icon uil uil-user"></i>
														</div>
														<div class="form1-group mt-2">
															<input type="email" name="logemail" class="form1-style" placeholder="Company Email" id="logemail" autocomplete="off" />
															<i class="input1-icon uil uil-at"></i>
														</div>
														<div class="form1-group mt-2">
															<input type="password" name="logpass" class="form1-style" placeholder="Password" id="logpass" autocomplete="off" />
															<i class="input1-icon uil uil-lock-alt"></i>
														</div>
														<div class="form1-group mt-2">
															<input type="password" name="logpass" class="form1-style" placeholder="Confirm Password" id="logpass" autocomplete="off" />
															<i class="input1-icon uil uil-lock-alt"></i>
														</div>
														<a href="#" class="a1 btn1 mt-2">Submit</a>
														<p class="p1 mb-0 mt-4 text-center"><a href="/" class="link1">Return to Login</a></p>
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

export default SignUp;