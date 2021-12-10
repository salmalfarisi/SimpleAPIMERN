import { useNavigate, useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from 'axios';

const Tambah = (props) => {
	const navigate = useNavigate();
	const [result, setresult] = useState({ success:false });
	const [idForm, setId] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDesc] = useState('');
	
	useEffect(async () => {
		var url = 'http://localhost:666/id/latest';
		const resultapi = await axios.get(url);
		try {
			//console.log(resultapi.data.data[0].title)
			setresult(resultapi.data.success);
			setId(resultapi.data.message);
			//console.log(resultapi.data.data[0].id)
		} 
		catch (e)
		{
			alert('error while load data')
			props.ChangeRoute('/')
			navigate(-1);
		}
	}, []);
	
	async function submitform(e) {
		e.preventDefault();
		if(e.target.value === "/store")
		{
			const inputform = { title, description };
			//alert(inputform);
			var url = 'http://localhost:666/store/';
			const response = await axios({
				method: 'post',
				url: url,
				headers: {}, 
				data: inputform
			});
			console.log(response);
			var getsuccess = response.data.success;
			var getresult = response.data.message;
			if(getsuccess === true)
			{
				alert(getresult)
				props.ChangeRoute("/store");
				props.ChangeRoute("/");
				navigate(-1);
			}
		}
	}
	
	const ChangeRouteChild = (event) => {
		props.ChangeRoute(event.target.value);
		navigate(-1);
	}
	
	return (
		<div>
			<p className="text-center text-2xl text-green-500 mt-4">Create new Data</p>
			<form onSubmit={submitform}>
				<div className="py-4 px-4">
					<div className="flex flex-col mb-4">
						<label className="font-bold text-lg">Title</label>
						<input className="border border-1 border-gray-400 rounded-lg py-2 px-2" type="text" value={title} onChange={ (e) => setTitle(e.target.value) } placeholder="Input title of data" required />
					</div>
					<div className="flex flex-col mb-4">
						<label className="font-bold text-lg">Description</label>
						<textarea className="border border-1 border-gray-400 rounded-lg py-2 px-2" type="text" value={description} onChange={ (e) => setDesc(e.target.value) } placeholder="Input description of data" rows="4" required></textarea>
					</div>
					<div className="w-full grid grid-cols-2 gap-4 mb-4">
						<div>
							<button className="float-left bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" value="/" onClick={ ChangeRouteChild }>Back</button>
						</div>
						<div>
							<button className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="/store" onClick={ submitform }>Save</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	)		
}
export default Tambah;