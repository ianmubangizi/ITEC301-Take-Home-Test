
const getValue = (html) => html.value
const getById = (id) => document.getElementById(id)

const isEmpty = (value) => value === ""
const isMatch = (value, regex = /.../) => regex.test(value)
const isError = (error = "", b = false, cb)=> b ? cb(error) : null 

const empty = {
    check: isEmpty,
    error: isError
}

const regex = {
    check: isMatch,
    error: isError
}

const validation = {
    name: {empty},
    email: {empty, match: {regex, ex: /^\S+@\S+\.\S+$/}},
    country: {empty},
    message: {empty},
    errors: [],
    values: [] 
}

const validiteContactForm = (form) => {
    fields = [form.name, form.email, form.country, form.message]
    validation.errors = []
    validation.values = []
    result = validateFields(fields, fields.length - 1)
    onErrors = validation.errors.length <= 0 
    if(onErrors) {
        message = `
        You've entered the following details:
        Full name: ${getValue(form.name)}
        Email Address: ${getValue(form.email)}
        Country: ${getValue(form.country)}
        Message: ${getValue(form.message)}
        `
        alert(message)
    }
    console.log(result)
    return onErrors
}

const validateFields = (fields, index) => {
    if(index >= 0) {
        let field = fields[index]
        let {name, value} = field
        // let value = getValue(field)
        const {empty, match} = validation[name]
        if(match){
            const { regex, regEx } = match
            let vaild = regex.check(value, regEx)
            regex.error(`The ${name} ${value} is not a vaild ${name}`, !vaild, (error) => {
                validation.errors.push(error)
            })
        }
        empty.error(`The ${name} cannot be empty`, empty.check(value), (error) => {
            validation.errors.push(error)
        })
        validation.values.push(value)
        validateFields(fields, --index)
    }
    result = validation.errors.length <= 0 ? validation.values : validation.errors
    return result
}