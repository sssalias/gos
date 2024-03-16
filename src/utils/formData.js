export const getFile = (event) => {
    return event.target.files[0]
}

export const getFormData = (file) => {
    const formData = new FormData()
    formData.append('photo', file)
    return formData
}