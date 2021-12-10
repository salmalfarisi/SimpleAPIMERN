import { Route, Routes, Link, BrowserRouter as Router, useNavigate ,useLocation } from 'react-router-dom';
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Tambah from './Tambah';
import Edit from './Edit';

function App() {
	//Dictionary
	const [isLoggedIn, setCurrentURL] = useState(window.location.pathname);
	const [loadData, setData] = useState({ data:[] });
	const [LoadDetail, setDetail] = useState({ data:[] });
	const [result, setresult] = useState({ success:false });
	const [showmessage, setmessage] = useState({ message:"" });
	
	//Function
	const ChangeRoute = (urlroute) => {
		setCurrentURL(urlroute)
	}
	
	useEffect(async () => {
		const resultapi = await axios(
			'http://localhost:666',
		);
		try {
			
			setData(resultapi.data);
			setresult(resultapi.success);
		} 
		catch (e)
		{
			setresult(resultapi.success);
			setmessage(resultapi.message);
		}
	}, [isLoggedIn]);
	
	function Tampilanutama(props) 
	{
		if(result === false && showmessage !== '')
		{
			return(
				<div>
					<div className="text-3xl text-center py-6 border-2 border-red-500">
						Try Again { showmessage.message }
					</div>
				</div>
			);
		}
		
		var notification;
		if(result === true && showmessage !== '')
		{
			notification = <div className="flex justify-center py-6">
								<div className="rounded-lg border-2 border-green-500 py-4 px-4 bg-green-500 text-black">
									{ showmessage.message }
								</div>
							</div>;
		}
			
		return (
			<div>
				<div className="flex justify-center py-6">
					<Link to="/tambah">
						<button onClick={ (e) => ChangeRoute('/tambah') } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Create new Data</button>
					</Link>	
				</div>
				{notification}
				<table className="border border-2 border-black w-full">
					<thead>
						<tr className="bg-blue-200 font-bold text-xl">
							<th className="border border-2 border-black w-2/5 py-2">Title</th>
							<th className="border border-2 border-black w-2/5 py-2">Description</th>
							<th className="border border-2 border-black w-1/5 py-2">Action</th>
						</tr>
					</thead>
					<tbody>
					{
						loadData.data.map((item, i) => ( 
							<tr className={i % 2 === 0 ? 'bg-gray-300' : 'bg-white'} key={i}>
								<td className="border border-2 border-black py-2 px-2">{item.title}</td>
								<td className="border border-2 border-black py-2 px-2">{item.description}</td>
								<td className="border border-2 border-black py-2 px-2 space-x-3 text-center">
									<Link to={`/edit/${item.id}`}>
										<button onClick={ () => ChangeRoute('/edit/') } className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
												<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
											</svg>
										</button>
									</Link>
									<button onClick={ () => DeleteData(item.id) } className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
										</svg>
									</button>
								</td>
							</tr>
						))
					}
					</tbody>
				</table>
			</div>
		);
	}
	
	//Check if url same like url in App.js
	function Cekhome(props) {
		var cekurl = window.location.pathname;
		if (cekurl === '/') 
		{
			return <Tampilanutama />;
		}
	}
	
	// Delete data function
	async function DeleteData(id) {
		if(id !== null)
		{
			var url = 'http://localhost:666/delete/' + id;
			const response = await axios.delete(url);
			var getsuccess = response.data.success;
			var getresult = response.data.message;
			if(getsuccess === true)
			{
				alert(getresult)
				setCurrentURL("/delete");
				setCurrentURL("/");					
			}
		}
	}
	
	return (
		<Router>  
			<div className="p-6">
			  <p className="text-3xl text-center text-yellow-700">
				Simple RestAPI with MERN and Tailwindcss
			  </p>
			  <p className="hidden text-xl text-center text-black border-2 border-black">
				{isLoggedIn}
			  </p>
			  <Routes>
				  <Route exact path="/" element={<Cekhome />} />
				  <Route path="/edit/:id" element={<Edit ChangeRoute={ChangeRoute} />} />
				  <Route path="/tambah" element={<Tambah data1={isLoggedIn} ChangeRoute={ChangeRoute}/>} />
			  </Routes>
			</div>  
		</Router>
	);
}

export default App;
