import request from '../utils/request';

function submit(params) {
  return request(`/api/alipay/`, { 
    method: 'POST',
    body: JSON.stringify(params),
  });
}



export default {
  submit,
}