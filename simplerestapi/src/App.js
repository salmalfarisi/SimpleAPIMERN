import { Route, Routes, Link, BrowserRouter as Router, useNavigate ,useLocation } from 'react-router-dom';
import Tambah from './Tambah';
import { useState, useEffect } from 'react';
import {Table, Column, Cell} from 'fixed-data-table';

function App() {
	
	const [currentURL, setCurrent] = useState(window.location.pathname);
	
	// masih belum ngerti cara mainnya
	useEffect(() => {
		// Update the document title using the browser API
		console.log('masuk sini');
		//setCurrent = window.location.pathname
	}, [currentURL]);
	
	var dummydata = [];
	for (var i = 1; i <= 5; i++) {
		var colortext = '';
		if(i % 2 == 0){
			colortext = 'bg-gray-300';
		}
		else{
			colortext = 'bg-white';
		}
		dummydata.push(
			<tr className={colortext}>
				<td className="border border-2 border-black py-2 px-2">Data {i}</td>
				<td className="border border-2 border-black py-2 px-2">Data {i}</td>
				<td className="border border-2 border-black py-2 px-2 space-x-3 text-center">
					<button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
						</svg>
					</button>
					<button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
						</svg>
					</button>
				</td>
			</tr>
		);
	}
	
	function Tampilanutama(props) {
		return (
			<div>
				<div className="flex justify-center py-6">
					<Link to="/tambah">
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Tambah</button>
					</Link>
				</div>
				<table className="border border-2 border-black w-full">
					<tr className="bg-blue-200 font-bold text-xl">
						<th className="border border-2 border-black w-2/5 py-2">Title</th>
						<th className="border border-2 border-black w-2/5 py-2">Description</th>
						<th className="border border-2 border-black w-1/5 py-2">Action</th>
					</tr>
					{dummydata}
				</table>
			</div>
		);
	}
	
	function Cekhome() {
		const isLoggedIn = window.location.pathname;
		if (isLoggedIn == '/') {
			return <Tampilanutama />;
		}
	}
	
	return (
		<Router>  
			<div className="p-6 container">
			  <p className="text-3xl text-center text-yellow-700">
				Simple RestAPI with MERN and Tailwindcss
			  </p>
			  <Routes>
				  <Route exact path="/" element={<Cekhome />} />
				  <Route path="/tambah" element={<Tambah />} />  
			  </Routes>
			</div>  
		</Router>
	);
}

export default App;
