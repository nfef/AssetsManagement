
import { Notifications } from "../../../components/notifications";
import {
  UserDto,
  UserForCreationDto,
  UserForUpdateDto,
  userValidationSchema,
  useAddUser,
  useUpdateUser,
} from "..";

import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import FormFieldInput from "../../../components/Forms/FormFieldInput";
import { FiSave } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";



interface UserFormProps {
  userId?: string | undefined;
  userData?: UserDto;
}

function UserForm({ userId, userData }: UserFormProps) {

  const navigate = useNavigate();

  const [user, setUser] = useState({
  // userId:userData?.userId??0,
username:userData?.username??"",
password:userData?.password??"",
role:userData?.role??"",

  } as UserDto);


  useEffect(()=>{
    if(userData && userData.id) setUser(userData as UserDto);
  },[userData]);

  const onSubmit = (data:UserDto, formikHelpers: FormikHelpers<UserDto>) => {
    (userId == null || userId == undefined) ?  createUser(data as UserForCreationDto,formikHelpers) : updateUser(data as UserForUpdateDto,formikHelpers);
  };

  const createUserApi = useAddUser();
  function createUser(data: UserForCreationDto, formikHelpers: FormikHelpers<UserDto>) {
    createUserApi
      .mutateAsync(data)
      .then(() => {
        Notifications.success("User created successfully");
      })
      .then(() => {
        navigate("/users")
      })
      .catch((e) => {
        Notifications.error("There was an error creating the user");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  const updateUserApi = useUpdateUser();
  function updateUser(data: UserForUpdateDto, formikHelpers: FormikHelpers<UserDto>) {
    const id = userId;
    if (id === null || id === undefined) return;

    updateUserApi
      .mutateAsync({ id, data })
      .then(() => {
        Notifications.success("User updated successfully");
      })
      .then(() => {
        navigate("/users");
      })
      .catch((e) => {
        Notifications.error("There was an error updating the User");
        console.error(e);
        formikHelpers.setSubmitting(false);
      });
  }

  return (
    <>
      <Formik
         initialValues={ user as UserDto}
        validationSchema={userValidationSchema}
        onSubmit={(values,formikHelpers) => {
          onSubmit(values, formikHelpers);
        }}
        // validateOnChange={false}
        validateOnMount={false}
        // initialStatus={true}
        enableReinitialize={true} // Réinitialise les valeurs et désactive la validation lors du premier rendu
      >
        {({ errors,isSubmitting,values,setFieldValue}) => {
          return (
            <Form>
              <div >
                {isSubmitting && <div className="lds-roller"></div>}
                <div className="d-flex flex-column">
                  <div className="row mb-4">
                       

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="userId"  label="UserId" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="username"  label="Username" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="password"  label="Password" required/>
                    </div>

                    <div className="col-12 col-md-6  mt-4">
                      <FormFieldInput name="role"  label="Role" required/>
                    </div>       
                    </div>
                  </div>    
                </div> 
              <div className="invf-form-submit d-flex">        
                <Button 
                  type='button' 
                  className=" mr-2 " 
                  onClick={() =>  navigate("/list/users")} 
                  startIcon={<FaTimes/> } 
                  children="Annuler" 
                  variant="outlined"
                />
                
                <LoadingButton 
                  type='submit' 
                  variant="contained"
                  className="annuler  ml-auto" 
                  startIcon={<FiSave/> } 
                  children={"Enregister"}
                  loading={isSubmitting}
                  
                />        
              </div>

            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export { UserForm };