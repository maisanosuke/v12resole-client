import * as yup from 'yup';

const passwordRule = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d.@$!%*#?&]{8,}$/;
//Regex for Minimum eight characters, at least one letter, one number and one special character

export const registerSchema = yup.object().shape({
    firstName: yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
    lastName: yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    email: yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: yup.string()
        .matches(passwordRule, {message: 'At least 8 characters, contain number and special character'})
        .required('Required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});

export const loginSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: yup.string()
        .required('Required'),
})

export const passwordSchema = yup.object().shape({
    email: yup.string()
        .email('Invalid email address')
        .required('Required')
})

export const contactUsSchema = yup.object().shape({
    name: yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Name is Required'),
    email: yup.string()
    .email('Invalid email address')
    .required('Email is Required'),
    message: yup.string()
    .max(160, 'Must be 160 characters or less')
    .required('Message is Required')
})

export const updateProfileSchema = yup.object().shape({
    email: yup.string()
    .email('Invalid email address')
    .required('Required'),
    oldPassword: yup.string()
    .when('confirmPassword', {
        is: (val) => val !== undefined && val !== '',
        then: (schema) => schema.required('Required')
    }),
    newPassword: yup.string()
    .when('oldPassword', {
        is: (val) => val !== undefined && val !== '',
        then: (schema) => schema.notOneOf([yup.ref('oldPassword')], 'New password must be different from old password')
    })
    .matches(passwordRule, {message: 'At least 8 characters, contain number and special character'}),
    confirmPassword: yup.string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})