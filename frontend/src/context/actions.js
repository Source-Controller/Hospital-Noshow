// const ROOT_URL = 'http//127.0.0.1:8000/auth';

// export async function loginUser(dispatch, loginPayload) {
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(loginPayload),
// 	};

// 	try {
// 		dispatch({ type: 'REQUEST_LOGIN' });
// 		let response = await fetch(`${ROOT_URL}/login`, requestOptions);
// 		let data = await response.json();

// 		if (data.user) {
// 			dispatch({ type: 'LOGIN_SUCCESS', payload: data });
// 			localStorage.setItem('currentUser', JSON.stringify(data));
// 			return data;
// 		}

// 		dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
// 		console.log(data.errors[0]);
// 		return;
// 	} catch (error) {
// 		dispatch({ type: 'LOGIN_ERROR', error: error });
// 		console.log(error);
// 	}
// }

// export async function registerUser(dispatch, registerPayload) {
// 	const requestOptions = {
// 		method: 'POST',
// 		headers: { 'Content-Type': 'application/json' },
// 		body: JSON.stringify(registerPayload),
// 	};

// 	try {
// 		dispatch({ type: 'REQUEST_REGISTER' });
// 		let response = await fetch(`http://127.0.0.1:8000/auth/register`, requestOptions);
// 		let data = await response.json();

// 		if (data.user) {
// 			dispatch({ type: 'REGISTER_SUCCESS', payload: data });
// 			localStorage.setItem('currentUser', JSON.stringify(data));
// 			return data;
// 		}

// 		dispatch({ type: 'REGISTER_ERROR', error: data.errors[0] });
// 		console.log(data.errors[0]);
// 		return;
// 	} catch (error) {
// 		dispatch({ type: 'REGISTER_ERROR', error: error });
// 		console.log(error);
// 	}
// }

// export async function logout(dispatch) {
// 	dispatch({ type: 'LOGOUT' });
// 	localStorage.removeItem('currentUser');
// 	localStorage.removeItem('token');
// }
