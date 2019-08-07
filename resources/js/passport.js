const cookies = require('vue-cookies');
const passport = {};

passport.install = function(vue, options){
    const $passport = {};

    $passport.getAccessToken = () => {
        return cookies.get('access_token')
    };

    $passport.accessToken = (user) => {
        const defaultData = {
            grant_type: 'password',
            client_id: '2',
            client_secret: 'opyj3l1gP1ocWbU0GeEn85eMbvebYqRZIBPYQqQ9',
            scope: ''
        };        
        const data = Object.assign(defaultData, user);
        console.log(data)
        
        axios.post('http://127.0.0.1:8000/oauth/token', data).then((res) => {
            console.log(res.data)
            cookies.set('access_token', res.data.access_token);
            cookies.set('refresh_token', res.data.refresh_token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.access_token;
        })        
    };

    const token = $passport.getAccessToken();

    if( token ){
        console.log(token)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    vue.prototype.$passport = $passport;
};

export default passport;

