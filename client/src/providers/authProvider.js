// in src/authProvider.js
//import decodeJwt from 'jwt-decode';

const authProvider = {

    // called when the user attempts to log in
    login: ({ username, password }) => {
        const request = new Request('http://localhost:5000/userapi/login', {
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
            .then(pass => {
                // localStorage.setItem('token', JSON.stringify(pass.token));
                localStorage.setItem('user', JSON.stringify(pass.user));
                localStorage.setItem('token', pass.token);
                // localStorage.setItem('user', pass.user);
                localStorage.setItem('id', pass.user.email);
                localStorage.setItem('fullName', pass.user.firstName + ' ' + pass.user.lastName);
                localStorage.setItem('avatar',  pass.user.avatar.avatarData);
                localStorage.setItem('roleId', pass.user.roleId);
                // localStorage.setItem('permissions', pass.user.permissionId);
            });
    },

    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        localStorage.removeItem('fullName');
        localStorage.removeItem('avatar');
        localStorage.removeItem('roleId');
        // localStorage.removeItem('permissions');
        return Promise.resolve();
    },

    // called when the API returns an error
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
			localStorage.removeItem('user');
            localStorage.removeItem('id');
            localStorage.removeItem('fullName');
            localStorage.removeItem('avatar');
            localStorage.removeItem('roleId');
            // localStorage.removeItem('permissions');
            return Promise.reject();
        }
        return Promise.resolve(status);
    },

    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('token')
            ? Promise.resolve()
            : Promise.reject(); //: Promise.reject({ redirectTo: '/no-access' });
    },

    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        //const role = localStorage.getItem('role');
        //return role ? Promise.resolve(role) : Promise.reject();
        const permissions = localStorage.getItem('permissions');
        return Promise.resolve(permissions);
    },

    //getIdentity: () => Promise.resolve(),
    getIdentity: () => {
        return {
            id: localStorage.getItem('id'),
            fullName: localStorage.getItem('fullName'),
            avatar: localStorage.getItem('avatar'),
        };
    }
};

export default authProvider;
