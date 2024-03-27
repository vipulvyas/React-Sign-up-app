import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

const SignUp = () =>{

    const succesResponse = {
        "status": "success",
        "code": 200,
        "message": "user created successfully"
    }

    const validationErrorResponse = {
        "status": "failed",
        "code": 429,
        "message": "validation error in email"
    }

    const errorResponse = { 
        "status": "failed",
        "code": 500,
        "message": "something went wrong"
    }

    const rendomResponse = () => {
        const random = Math.floor(Math.random() * 3);
        if(random === 0) return succesResponse;
        else if(random === 1) return validationErrorResponse;
        else return errorResponse;
    }

    const reTryApiCall = (timeToRetry = 100, retryCount = 0, maxRetry = 4) => {
        const response = rendomResponse();
        if (response.code == 429) {
            setTimeout(() => {
                console.log(response)
                if (retryCount < maxRetry) {
                    return reTryApiCall(timeToRetry * 2, retryCount + 1, maxRetry);
                }
            }, timeToRetry)
        }
        return response;
    }

    return (
        <>
            <Formik
                initialValues={{ email: "", password: "", cpassword: "" }}
                validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = "Required";
                    } else if (!values.password) {
                        errors.password = "Required";
                    } else if (!values.cpassword) {
                        errors.cpassword = "Required";
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            values.email
                        )
                    ) {
                        errors.email = "Invalid email address";
                    } else if (values.password  && 
                        values.cpassword && 
                        (values.password !== values.cpassword)) {
                        errors.cpassword = "Password and confirm password should be same.";
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     setSubmitting(false);
                    // }, 400);
                    setTimeout(() => {
                        setSubmitting(false);
                        let response = rendomResponse();
                        const { code } = response;
                        alert(JSON.stringify(response, null, 2));
                        if (code == 429) {
                            response = reTryApiCall(100, 0, 4)
                        }
                        alert(JSON.stringify(response, null, 2));
                    }, 400)
                    
                }}
            >
                {({ isSubmitting }) => (
                    <Form style={{marginLeft: "35%"}}>
                        Email: <Field
                            type="email"
                            name="email"
                            style={{width: "25%"}}
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                        /><br></br>
                        Password: <Field
                            type="password"
                            name="password"
                        />
                        <ErrorMessage
                            name="password"
                            component="div"
                        /><br></br>
                        Confirm Password: <Field
                            type="password"
                            name="cpassword"
                        />
                        <ErrorMessage
                            name="cpassword"
                            component="div"
                        /><br></br>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default SignUp;
