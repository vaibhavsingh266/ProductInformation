import axios from "axios";

class SecureCallService {
    constructor() {
        this.url = 'http://localhost:4000';
        this.token = '';
    }
    
    componentDidMount() {
        let tk = sessionStorage.getItem('token');
        if(tk !== null)    {
            this.token = tk;
        }
        else{
            this.props.history.push('/login');
        }}

    checkForUniqueId(username)  {
        console.log(username);
        let response = axios.post(`${this.url}/uniqueadmin`,
            username, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    getProductsById(id , token){
        let response = axios.get(`${this.url}/getproducts/${id}`, {
            headers: {
                'AUTHORIZATION': `Bearer ${token}`
            }
        });
        return response;
    }

    // register users
    register(user) {
        let response = axios.post(`${this.url}/user/register`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    // admin register
    adregister(user) {
        let response = axios.post(`${this.url}/admin/register`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }
    // login users
    login(user) {
        let response = axios.post(`${this.url}/user/authorize`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    //admin login
    adlogin(user) {
        let response = axios.post(`${this.url}/admin/authorize`,
            user, {
                headers: {
                    'Content-type': 'application/json'
                }
            });
        return response;
    }

    

    postProduct(products) {
        let response = axios.post(`${this.url}/create-product`, products, {
            headers: {
                'Content-type': 'application/json',
                'AUTHORIZATION': `Bearer ${this.token}`
            }
        });
        console.log(this.token);
        return response;
    }

    
}

export default SecureCallService;