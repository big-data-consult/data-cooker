
// in src/authProvider.js
//import decodeJwt from 'jwt-decode';

const authProvider = {

    // called when the user attempts to log in
    login: ({ username, password }) => {
        const request = new Request('http://localhost:5000/api/login', {
            method: 'POST',
            headers: new Headers({ 
			'Content-Type': 'application/json', 
			//'token': JSON.stringify({ username, password }) 
			}),
            body: JSON.stringify({ username, password }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(token => {
                //localStorage.setItem('token', JSON.stringify(token['users']));
                localStorage.setItem('token', JSON.stringify(token));
                localStorage.setItem('permissions', token.roleId);
                // const decodedToken = decodeJwt(token);
                // localStorage.setItem('token', token);
                // localStorage.setItem('permissions', decodedToken.permissions);
            });

        //localStorage.setItem('username', username);
        // accept all username/password combinations
        //return Promise.resolve();
    },

    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },

    // called when the API returns an error
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('permissions');
            return Promise.reject();
        }
        return Promise.resolve();
    },

    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject();
            //: Promise.reject({ redirectTo: '/no-access' });
    },

    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
		// Promise.resolve()
	},

    //getIdentity: () => Promise.resolve(),
    getIdentity: () => {
        const { id, firstName, lastName, avatar } = JSON.parse(localStorage.getItem('token'));
        return { 
            "id":id ? id : 1, 
            "fullName":firstName ? firstName : ' '+ ' ' + lastName ? lastName : '', 
            "avatar": "/favicon.ico" 
        };
        //return { "id": 1, "fullName": "Joe Smith", "avatar": "" };
        //Promise.resolve()
    }
};

export default authProvider;
