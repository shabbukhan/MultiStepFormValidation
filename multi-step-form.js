'use strict';
const ALPHANUMERIC_REGEX = /^[a-zA-Z ]+$/;
const setInvalid = (errmsg, message) => {
    errmsg.className = "show-error";
    errmsg.innerHTML = message;
}

document.addEventListener("DOMContentLoaded", e => {

    {

        /* event bindings of tab one */
        // section one button click
        const validateUser = e => {
            const username = document.forms.userForm.username.value;
            const usererr = document.getElementById("error-msg-user");

            if (!username) {
                setInvalid(usererr, "User name must not be empty");
                return false;
            } else if (!ALPHANUMERIC_REGEX.test(username)) {
                setInvalid(usererr, "User name must contains only letters");
                return false;
            } else {
                setInvalid(usererr, "");
                return true;
            }
        };

        const validatePasswords = (fldVal, errFld, fldLabel, compFldVal) => {
            if (!fldVal) {
                setInvalid(errFld, `${fldLabel} must not be empty`);
                return false;
            } else if (password.length < 4 || password.length > 10) {
                setInvalid(errFld, `${fldLabel} should be 4 to 10 characters long`);
                return false;
            } else if (fldVal !== compFldVal) {
                setInvalid(errFld, `Password and Confirm password should match`);
                return false;
            } else {
                setInvalid(errFld, "");
                return true;
            }
        };

        const validatePassword = e => {
            const password = document.forms.userForm.password.value;
            const passerr = document.getElementById("error-msg-pass");
            const confirmPassword = document.forms.userForm.confirmpassword.value;

            return validatePasswords(password, passerr, "Password", confirmPassword);
        };

        const validateConfirmPassword = e => {
            const confirmPassword = document.forms.userForm.confirmpassword.value;
            const passerr = document.getElementById("error-msg-conpass");
            const password = document.forms.userForm.password.value;

            return validatePasswords(
                confirmPassword,
                passerr,
                "Confirm password",
                password
            );
        };

        const validateSectionOne = () => {
            if (validateUser()) {
                if (validatePassword()) {
                    if (validateConfirmPassword()) {
                        document.getElementById("sectionOne").classList.add("hide");
                        document.getElementById("sectionTwo").classList.remove("hide");
                    }
                }
            }
        };

        document
            .getElementById("sectionOneBtn")
            .addEventListener("click", validateSectionOne);
        // validate username
        document
            .getElementById("username")
            .addEventListener("focusout", validateUser);
        // validate password
        document
            .getElementById("password")
            .addEventListener("focusout", validatePassword);
        // validate confirm password
        document
            .getElementById("confirmpassword")
            .addEventListener("focusout", validateConfirmPassword);
    }

    {
        /* event binding of section two */
        const gotoSectionOne = e => {
            document.getElementById("sectionTwo").classList.add("hide");
            document.getElementById("sectionOne").classList.remove("hide");
        };
        const gotoSectionTwo = e => {
            document.getElementById("sectionThree").classList.add("hide");
            document.getElementById("sectionTwo").classList.remove("hide");
        };

        const validateSectionTwo = e => {
            if (validateGender()) {
                if (validateExperience()) {
                    // goto section two
                    document.getElementById("sectionTwo").classList.add("hide");
                    document.getElementById("sectionThree").classList.remove("hide");
                }
            }
        };

        const validateGenders = (fldVal, errFld, fldLabel) => {
            if (!fldVal.length > 0) {
                setInvalid(errFld, `must be selected`);
                return false;
            } else {
                setInvalid(errFld, "");
                return true;
            }
        };

        const validateGender = e => {
            const genders = document.getElementsByName("gender");
            const genderChecked = Array.prototype.slice.call(genders).filter(item => item.checked);
            const generr = document.getElementById("error-msg-gender");

            return validateGenders(genderChecked, generr, 'Gender')
        };


        const validateExperiences = (fldVal, errFld, fldLabel) => {
            if (fldVal.value == 0) {
                setInvalid(errFld, `${fldLabel} must be selected`);
                return false;
            } else {
                setInvalid(errFld, "");
                return true;
            }
        };

        const validateExperience = e => {
            const experience = document.getElementById("experience");
            const experr = document.getElementById("error-msg-exp");

            return validateExperiences(experience, experr, 'Experience')
        };


        const validateskills = (fldVal, errFld, fldLabel) => {
            if (fldVal.length < 2) {
                setInvalid(errFld, `${fldLabel} must be selected atleast 2`);
                return false;
            } else {
                setInvalid(errFld, "");
                return true;
            }
        };

        const validateskill = e => {
            const skillSet = document.getElementsByName("skill");
            const skillerr = document.getElementById("error-msg-skill");
            const skillChecked = Array.prototype.slice.call(skillSet).filter(item => item.checked);
            console.log(skillChecked.length)

            return validateskills(skillChecked, skillerr, 'Skill')
        };


        document
            .getElementById("gender")
            .addEventListener("focusout", validateGender);

        document
            .getElementById("experience")
            .addEventListener("focusout", validateExperience);


        // const validateSectionThree = e => {
        // };

        document
            .getElementById("sectionThree")
            .addEventListener("focusout", validateskill);

        const submit = e => {
            if (validateskill()) {
                document.getElementById("success").innerHTML =
                    "form has been successfully submitted!";
                document.getElementById("sectionThree").classList.add("hide");
                console.log("submitted");
            }
        }

        // go to section one
        document
            .getElementById("sectionThreePreBtn")
            .addEventListener("click", gotoSectionTwo);
        document
            .getElementById("sectionTwoPreBtn")
            .addEventListener("click", gotoSectionOne);
        // next button binding
        document
            .getElementById("sectionTwoBtn")
            .addEventListener("click", validateSectionTwo);
        document
            .getElementById("submit")
            .addEventListener("click", submit);
    }
});