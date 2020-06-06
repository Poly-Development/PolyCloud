var page = {};

page.do = function(dest){

	var user = document.getElementById('user').value;
	var pass = document.getElementById('pass').value;

	if(user === undefined || user === null || user === '')
		return swal('Error', 'You need to specify a username', 'error');
	if(pass === undefined || pass === null || pass === '')
		return swal('Error', 'You need to specify a username', 'error');
	var button = document.getElementById("submit");
	button.disabled = true;
	button.innerHTML = '<style>.loading {position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);}</style><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRoPSI5OTFweCIgaGVpZ2h0PSI5MXB4IiB2aWV3Qm94PSIwIDAgNTEyIDQ3IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c2NyaXB0IHR5cGU9InRleHQvZWNtYXNjcmlwdCIgeGxpbms6aHJlZj0iLy9mYXZpY29uZXIubmV0L2pzY3JpcHRzL3NtaWwudXNlci5qcyIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNGRkZGRkYiIC8+PGc+PGNpcmNsZSBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIGN4PSItMTQuNzgxIiBjeT0iMjIuMzI4IiByPSIxMi44MTMiLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgdmFsdWVzPSI4OCAwOzE4MiAwOzI1MSAwOzI5OCAwOzMyMSAwOzMyMy4zMyAwOzMyNS42NiAwOzMyNy45OSAwOzMzMC4zMiAwOzMzMi42NSAwOzMzNC45OCAwOzMzNy4zMSAwOzMzOS42NCAwOzM0MS45NyAwOzM0NC4zIDA7MzQ2LjYzIDA7MzQ4Ljk2IDA7MzUxLjI5IDA7MzUzLjYyIDA7MzU2IDA7Mzc5IDA7NDI2IDA7NDk0IDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDA7NTQyIDAiIGR1cj0iMzMzMG1zIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPjwvZz48Zz48Y2lyY2xlIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMSIgY3g9Ii01MC4zMjgiIGN5PSIyMi4zMjgiIHI9IjEyLjc5NyIvPjxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0idHJhbnNsYXRlIiB2YWx1ZXM9IjAgMDswIDA7MCAwOzAgMDswIDA7ODggMDsxODIgMDsyNTEgMDsyOTggMDszMjEgMDszMjMuMzMgMDszMjUuNjYgMDszMjcuOTkgMDszMzAuMzIgMDszMzIuNjUgMDszMzQuOTggMDszMzcuMzEgMDszMzkuNjQgMDszNDEuOTcgMDszNDQuMyAwOzM0Ni42MyAwOzM0OC45NiAwOzM1MS4yOSAwOzM1My42MiAwOzM1NiAwOzQwNiAwOzQ1MiAwOzUyMiAwOzU3NyAwOzU3NyAwOzU3NyAwOzU3NyAwOzU3NyAwOzU3NyAwOzU3NyAwOzU3NyAwOzU3NyAwOzU3NyAwIiBkdXI9IjMzMzBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2c+PGc+PGNpcmNsZSBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIGN4PSItODcuMjAzIiBjeT0iMjIuMzI4IiByPSIxMi43OTciLz48YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InRyYW5zbGF0ZSIgdmFsdWVzPSIwIDA7MCAwOzAgMDswIDA7MCAwOzAgMDswIDA7MCAwOzAgMDswIDA7ODggMDsxODIgMDsyNTEgMDsyOTggMDszMjEgMDszMjMuMzMgMDszMjUuNjYgMDszMjcuOTkgMDszMzAuMzIgMDszMzIuNjUgMDszMzQuOTggMDszMzcuMzEgMDszMzkuNjQgMDszNDEuOTcgMDszNDQuMyAwOzM0Ni42MyAwOzM0OC45NiAwOzM1MS4yOSAwOzM1My42MiAwOzM1NiAwOzQwMyAwOzQ1MCAwOzUyMCAwOzYxNCAwOzYxNCAwOzYxNCAwOzYxNCAwOzYxNCAwOzYxNCAwIiBkdXI9IjMzMzBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2c+PGc+PGNpcmNsZSBmaWxsPSIjMDAwMDAwIiBmaWxsLW9wYWNpdHk9IjEiIGN4PSItMTI1LjIzNCIgY3k9IjIyLjMyOCIgcj0iMTIuNzk3Ii8+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cmlidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIHZhbHVlcz0iMCAwOzAgMDswIDA7MCAwOzAgMDswIDA7MCAwOzAgMDswIDA7MCAwOzAgMDswIDA7MCAwOzAgMDswIDA7ODggMDsxODIgMDsyNTEgMDsyOTggMDszMjEgMDszMjMuMzMgMDszMjUuNjYgMDszMjcuOTkgMDszMzAuMzIgMDszMzIuNjUgMDszMzQuOTggMDszMzcuMzEgMDszMzkuNjQgMDszNDEuOTcgMDszNDQuMyAwOzM0Ni42MyAwOzM0OC45NiAwOzM1MS4yOSAwOzM1My42MiAwOzM1NiAwOzQwMiAwOzQ0OCAwOzUxOCAwOzYxMSAwIiBkdXI9IjMzMzBtcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz48L2c+PC9zdmc+Cg=="></img>';
	axios.post('/api/' + dest, {
		username: user,
		password: pass
	})
	.then(function (response) {

		if(response.data.success === false)
			return swal('Error', response.data.description, 'error');
		
		localStorage.token = response.data.token;
		window.location = '/dashboard';

	})
	.catch(function (error) {
		return swal('An error ocurred', 'There was an error with the request, please check the console for more information.', 'error');
		console.log(error);
	});
};

page.verify = function(){
	page.token = localStorage.token;
	if(page.token === undefined) return;

	axios.post('/api/tokens/verify', {
		token: page.token
	})
	.then(function (response) {

		if(response.data.success === false)
			return swal('Error', response.data.description, 'error');
		
		window.location = '/dashboard';

	})
	.catch(function (error) {
		return swal('An error ocurred', 'There was an error with the request, please check the console for more information.', 'error');
		console.log(error);
	});

};

window.onload = function () {
	page.verify();
};
