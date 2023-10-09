const createFormField = (labelText, labelFor, id, name, type, autoComplete, isRequired, placeholder) => {
  // will return an object with property and value(eg.labelText:'Email address')
  return {
    labelText,
    labelFor,
    id,
    name,
    type,
    autoComplete,
    isRequired,
    placeholder,
  };
};

const loginFields = [
  createFormField("Email address", "email", "email", "email", "email", "email", true, "Email address"),
  createFormField("Password", "password", "password", "password", "password", "current-password", true, "Password"),
];

const signupFields = [
  createFormField("Name", "name", "name", "name", "text", "name", true, "Full Name"),
  createFormField("Email address", "email", "email", "email", "email", "email", true, "Email address"),
  createFormField("Password", "password", "password", "password", "password", "current-password", true, "Password"),
  createFormField("Confirm Password", "confirmPassword", "confirmPassword", "confirmPassword", "password", "confirmPassword", true, "Confirm Password"),
];

export { loginFields, signupFields };


// function createPerson(name, age) {
//   return {
//     name: name,
//     age: age,
//   };
// }
// const person1 = createPerson("Alice", 30);
// console.log(person1); // Output: { name: "Alice", age: 30 }