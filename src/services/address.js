import request from '../utils/request';

function add(params) {
  console.log(params)
  delete params._type;
  delete params.id;
  return request(`/api/add/address/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}

function edit(params) {
  console.log(params)
  const { user_id, id} = params;
  delete params._type;
  delete params.user_id;
  delete params.id;
  return request(`/api/put/address/${id}/user/${user_id}/`, { 
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

function query_all({user_id}) {
  return request(`/api/get/address/${user_id}/`, {headers: {"Content-Type": 'application/json'}})
}

function del({id, user_id}) {
  return request(`/api/del/address/${id}/user/${user_id}/`, {headers: {"Content-Type": 'application/json'}});
}





export default {
  add,
  query_all,
  del,
  edit
}