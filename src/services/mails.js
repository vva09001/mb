import request from '../helpers/request';

const getMails = () => {
    return request({
        url: '/email',
        method: 'GET'
    })
}

const addMails = data => {
    return request({
        url: '/email',
        methot: 'POST',
        data: data
    })
}

const editMails = data => {
    return request({
        url: `/email/${data.id}`,
        method: 'PUT',
        data: data
    })
}

const deleteMails = idMail => {
    return request({
        url: `/email/${idMail}`,
        method: 'DELETE'
    })
}
export { getMails, addMails, editMails, deleteMails }