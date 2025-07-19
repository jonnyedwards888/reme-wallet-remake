export const clearLocalStorage = function (navigate: any) {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('encToken')
    localStorage.removeItem('allowed')
    localStorage.removeItem('refferal')

    navigate('/')
}