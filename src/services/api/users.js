import api from './api'

export function fetchUserList() {
  return api.get('users')
}

export function fetchUser (userId) {
  return api.get(`users/${userId}`)
}

export function createUser (userDara) {
  return api.post('users', userDara)
}

export function updateUser (userDara) {
  return api.put(`users/${userDara.id}`, userDara)
}

export function deleteUser (userId) {
  return api.delete(`users/${userId}`)
}
