import request from '../utils/request';

function add(params) {
  return request(`/api/add/address/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}

function query_all({user_id}) {
  return request(`/api/get/address/${user_id}/`, {headers: {"Content-Type": 'application/json'}})
}



export default {
  add,
  query_all,
}