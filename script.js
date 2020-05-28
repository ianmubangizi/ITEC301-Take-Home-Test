
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

const validiteContactForm = ({name, email, country, message}) => {
    validation.errors = []
    validation.values = []
    fields = [name, email, country, message]
    validateFields(fields, fields.length - 1)
    noErrors = validation.errors.length <= 0 
    if(noErrors) {
        text = `
        You've entered the following details:
        Full name: ${getValue(name)}
        Email Address: ${getValue(email)}
        Country: ${getValue(country)}
        Message: ${getValue(message)}
        `
        alert(text)
    }
    return noErrors
}

const validateFields = (fields, index) => {
    if(index >= 0) {
        let field = fields[index]
        const {name, value} = field
        const {empty, match} = validation[name]
        if(match){
            const { regex, regEx } = match
            let valid = regex.check(value, regEx)
            regex.error(`The ${name} ${value} is not a valid ${name}`, !valid, (error) => {
                validation.errors.push(error)
            })
        }
        empty.error(`The ${name} cannot be empty`, empty.check(value), (error) => {
            validation.errors.push(error)
        })
        validation.values.push(value)
        validateFields(fields, --index)
    }
    return validation.errors.length <= 0 ? validation.values : validation.errors
}